import {useState} from "react";
import ChatItems from "./ChatIItems";
import Modal from "./Modal";
import {useSelector} from "react-redux";
import gravatarUrl from "gravatar-url";
import {IoAddOutline} from "react-icons/io5";
import {motion} from "framer-motion";


export default function Sidebar() {
  const [opened, setOpened] = useState(false);
  const {user} = useSelector((state) => state.auth) || {};
  const {email, name} = user || {};


  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  return (
    <div className="w-[100px] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
      <div
        className="h-[65px] text-grey-500 p-3 border-b border-gray-300 flex justify-between">
        <img
          className="object-cover w-10 h-10 rounded-full"
          src={gravatarUrl(email)}
          alt={name}
        />
        <motion.input type="text" placeholder='Search'
                      className='bg-transparent border-violet-700 rounded-full text-white pl-5 focus:border-violet-700'
                      whileFocus={{
                        scale: 1.1,
                      }}/>
        <motion.div whileTap={{
          scale: 1.1,
        }}>
          <IoAddOutline onClick={controlModal} style={{
            cursor: 'pointer',
            color: 'white',
            marginTop: '3px',
            borderRadius: '50%',
            width: '35px',
            height: '35px',
          }} className='bg-violet-800'/>
        </motion.div>
      </div>
      <div className="overflow-auto h-[calc(100vh_-_129px)]">
        <ChatItems/>
      </div>
      <Modal open={opened} control={controlModal}/>
    </div>
  );
}
