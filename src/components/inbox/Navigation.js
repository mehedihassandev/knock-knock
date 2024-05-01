import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {userLoggedOut} from "../../redux/auth/authSlice";
import {IoIosLogOut} from "react-icons/io";
import {motion} from "framer-motion";

export default function Navigation() {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(userLoggedOut());
    localStorage.clear();
  };
  return (
    <nav className="border-general sticky top-0 z-40 border-b bg-violet-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16 items-center">
          <Link to="/">
            <motion.h1 className="text-white text-xl font-bold uppercase" whileHover={{
              scale: 1.1,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20,
                duration: 0.5
              }
            }}>
              knock-knock
            </motion.h1>
          </Link>
          <ul>
            <li className="text-white">
              <motion.span className="cursor-pointer font-bold flex justify-between gap-2 items-center" onClick={logOut}
                           whileHover={{
                             scale: 1.1,
                             transition: {
                               type: 'spring',
                               stiffness: 260,
                               damping: 20,
                               duration: 0.5
                             }
                           }}>
                Logout <IoIosLogOut className='text-xl'/>
              </motion.span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
