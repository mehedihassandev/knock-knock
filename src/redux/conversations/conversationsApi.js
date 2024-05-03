import {apiSlice} from '../api/apiSlice';
import {messagesApi} from '../messages/messagesApi';

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_CONVERSATIONS_PER_PAGE}`,
      async onCacheEntryAdded(
        arg,
        {updateCachedData, cacheDataLoaded, cacheEntryRemoved}
      ) {
        // create socket
        const socket = io("http://localhost:9000", {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttemps: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });

        try {
          await cacheDataLoaded;
          socket.on("conversation", (data) => {
            updateCachedData((draft) => {
              if (draft.data) {
                const conversation = draft.data.find(
                  (c) => c.id == data?.data?.id
                );

                if (conversation?.id) {
                  conversation.message = data?.data?.message;
                  conversation.timestamp = data?.data?.timestamp;
                } else {
                  // do something else
                  draft.data.push(data?.data);
                }
              }
            });
          });
        } catch (err) {
          console.error(err);
        }

        await cacheEntryRemoved;
        socket.close();
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
