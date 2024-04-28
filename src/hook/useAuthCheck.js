import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {userLoggedIn} from "../redux/auth/authSlice";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authCheck, setAuthCheck] = useState(false);
  useEffect(() => {
    const token = localStorage?.getItem("auth");

    if (token) {
      const auth = JSON.parse(token);

      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
    setAuthCheck(true);
  }, [dispatch, setAuthCheck]);

  return authCheck;
};

export default useAuthCheck;
