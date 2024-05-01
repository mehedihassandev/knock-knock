import {useEffect, useState} from "react";
import {useEditConversationMutation} from "../../../redux/conversations/conversationsApi";
import {useSelector} from "react-redux";
import {BsSend} from "react-icons/bs";
import {motion} from "framer-motion";

export default function Options({info}) {
  const [message, setMessage] = useState("");
  const [editConversation, {isSuccess}] = useEditConversationMutation();

  useEffect(() => {
    if (isSuccess) {
      setMessage("");
    }
  }, [isSuccess]);
  const {user: loggedInUser} = useSelector((state) => state.auth);

  const participantUser =
    info.receiver.email !== loggedInUser.email
      ? info.receiver
      : info.sender;

  const handleSubmit = (e) => {
    e.preventDefault();
    // add conversation
    editConversation({
      id: info?.conversationId,
      sender: loggedInUser?.email,
      data: {
        participants: `${loggedInUser.email}-${participantUser.email}`,
        users: [loggedInUser, participantUser],
        message,
        timestamp: new Date().getTime(),
      },
    });
  };

  return (
    <form className="flex items-center justify-between w-full p-3 border-t border-gray-300" onSubmit={handleSubmit}>
      <motion.input
        type="text"
        placeholder="Message"
        className="block w-full py-2 pl-4 mx-3 bg-gray-100 focus:ring-violet-500 rounded-full outline-none focus:text-gray-700"
        name="message"
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        whileFocus={{scale: 1.02}}
      />
      <motion.button type="submit" className='rounded-full bg-violet-800 p-4 text-white' whileHover={{
        scale: 1.1,
        transition: {duration: 0.1},
      }} whileTap={{scale: 0.9
      }}>
        <BsSend className='w-4 h-4 '/>
      </motion.button>
    </form>
  );
}
