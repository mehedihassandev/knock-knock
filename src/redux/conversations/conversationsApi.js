import {apiSlice} from '../api/apiSlice';
import {messagesApi} from '../messages/messagesApi';

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
      transformResponse(apiResponse, meta) {
        const totalCount = meta.response.headers.get("X-Total-Count");
        return {
          data: apiResponse,
          totalCount,
        };
      },
    }),
    getMoreConversations: builder.query({
      query: ({email, page}) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=${page}&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
      async onQueryStarted({email}, {queryFulfilled, dispatch}) {
        try {
          const conversations = await queryFulfilled;
          if (conversations?.data?.length > 0) {
            // update conversation cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData(
                "getConversations",
                email,
                (draft) => {
                  return {
                    data: [
                      ...draft.data,
                      ...conversations.data,
                    ],
                    totalCount: Number(draft.totalCount),
                  };
                }
              )
            );
            // update messages cache pessimistically end
          }
        } catch (err) {
        }
      },
    }),
    getConversation: builder.query({
      query: ({userEmail, participantEmail}) =>
        `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`
    }),
    addConversation: builder.mutation({
      query: ({sender, data}) => ({
        url: '/conversations',
        method: 'POST',
        body: data
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {


        const conversation = await queryFulfilled;
        if (conversation?.data?.id) {
          const users = arg.data.users;
          const senderUser = users.find(
            (user) => user.email === arg.sender
          );
          const receiverUser = users.find(
            (user) => user.email !== arg.sender
          );

          dispatch(
            messagesApi.endpoints.addMessage.initiate({
              conversationId: conversation?.data?.id,
              sender: senderUser,
              receiver: receiverUser,
              message: arg.data.message,
              timestamp: arg.data.timestamp
            })
          );
        }
      }
    }),
    editConversation: builder.mutation({
      query: ({id, data, sender}) => ({
        url: `/conversations/${id}`,
        method: 'PATCH',
        body: data
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {

        // Optimistically update the conversation data
        const editConversationPatchResult = dispatch(apiSlice.util.updateQueryData('getConversations', arg.sender, (draft) => {
          const draftConversation = draft.find(c => c.id == arg.id);
          draftConversation.message = arg.data.message;
          draftConversation.timestamp = arg.data.timestamp;
        }));

        try {
          const conversation = await queryFulfilled;
          if (conversation?.data?.id) {
            const users = arg.data.users;
            const senderUser = users.find(
              (user) => user.email === arg.sender
            );
            const receiverUser = users.find(
              (user) => user.email !== arg.sender
            );

            const res = await dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?.data?.id,
                sender: senderUser,
                receiver: receiverUser,
                message: arg.data.message,
                timestamp: arg.data.timestamp,
              })
            ).unwrap();

            // update messages cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                res.conversationId.toString(),
                (draft) => {
                  draft.push(res);
                }
              )
            );

          }
        } catch (error) {
          editConversationPatchResult.undo();
        }
      }
    })
  })
});

export const {
  useGetConversationsQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation
} = conversationsApi;
