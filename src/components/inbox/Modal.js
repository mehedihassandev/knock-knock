import {useEffect, useState} from 'react';
import isValidEmail from '../../utils/isValidEmail';
import {useGetUserQuery} from '../../redux/users/usersApi';
import Error from '../ui/Error';
import {useDispatch, useSelector} from 'react-redux';
import {
  conversationsApi,
  useAddConversationMutation,
  useEditConversationMutation
} from '../../redux/conversations/conversationsApi';
import { BsSend } from "react-icons/bs";

export default function Modal({open, control}) {
  const [to, setTo] = useState('');
  const [message, setMessage] = useState('');
  const [userCheck, setUserCheck] = useState(false);
  const [responseError, setResponseError] = useState('');
  const [conversation, setConversation] = useState(undefined);
  const dispatch = useDispatch();

  const {user: loggedinUser} = useSelector((state) => state.auth) || {};
  const {email: myEmail} = loggedinUser || {};

  const {data: participant, error} = useGetUserQuery(to, {
    skip: !userCheck
  });

  const [addConversation, {isSuccess: isAddConversationSuccess}] = useAddConversationMutation();
  const [editConversation, {isSuccess: isEditConversationSuccess}] = useEditConversationMutation();


  useEffect(() => {
    if (isAddConversationSuccess || isEditConversationSuccess) {
      control();
    }
  }, [isAddConversationSuccess, isEditConversationSuccess]);

  useEffect(() => {
    if (participant?.length > 0 && participant[0].email !== myEmail) {
      dispatch(conversationsApi.endpoints.getConversation.initiate({
        userEmail: myEmail, participantEmail: to
      }))
        .unwrap()
        .then((data) => {
          setConversation(data);
        })
        .catch((err) => {
          setResponseError('There was a problem!');
        });
    }
  }, [participant, dispatch, myEmail, to]);

  const handleDebounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const doSearch = (value) => {
    if (isValidEmail(value)) {
      setUserCheck(true);
      setTo(value);
    }
  };


  const handleSearch = handleDebounce(doSearch, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (conversation?.length > 0) {
      editConversation({
        id: conversation[0].id, sender: myEmail, data: {
          participant: `${myEmail}-${participant[0].email}`,
          users: [loggedinUser, participant[0]],
          message,
          timestamp: new Date().getTime()
        }
      });
    } else if (conversation?.length === 0) {
      addConversation({
        sender: myEmail,
        data: {
          participants: `${myEmail}-${participant[0].email}`,
          users: [loggedinUser, participant[0]],
          message,
          timestamp: new Date().getTime()
        }
      });
    }
  };


  return (open && (<>
    <div
      onClick={control}
      className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
    ></div>
    <div
      className="rounded w-[300px] lg:w-[500px] space-y-8 bg-white py-5 px-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      <form className='mb-6' onSubmit={handleSubmit}>
        <h2 className="mb-6 mt-1 text-center text-3xl font-extrabold text-gray-900">
          Send message
        </h2>
        <div className='space-y-3'>
          <input
            id="to"
            name="to"
            type="email"
            required
            className="appearance-none rounded-3xl relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm h-12"
            placeholder="Send to"
            onChange={(e) => handleSearch(e.target.value)}
          />

          <div className='flex justify-between gap-5'>
          <textarea
            id="message"
            name="message"
            type="text"
            required
            className="appearance-none rounded-3xl relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm h-12"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
            <button
              type="submit"
              className="group relative p-4 border border-transparent rounded-full text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-50"
              disabled={conversation === undefined || (participant?.length > 0 && participant[0].email === myEmail)}
            >
              <BsSend className='w-4 h-4 '/>
            </button>
          </div>
        </div>


        {participant?.length === 0 && (<Error message="This user does not exist!"/>)}

        {participant?.length > 0 && participant[0].email === myEmail && (
          <Error message="You can not send message to yourself!"/>)}

        {responseError && (<Error message={responseError}/>)}
      </form>
    </div>
  </>));
}
