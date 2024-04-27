import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLoggedOut } from "../../redux/auth/authSlice";

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
            <h1 className="text-white text-xl font-bold uppercase">
              knock-knock
            </h1>
          </Link>
          <ul>
            <li className="text-white">
              <span className="cursor-pointer font-bold" onClick={logOut}>
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
