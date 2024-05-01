import Error from "../components/ui/Error";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";
import {useLoginMutation} from "../redux/auth/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [login, {data, isLoading, error: responseError}] = useLoginMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (responseError?.data) {
      setError(responseError.data);
    }
    if (data?.accessToken && data?.user) {
      navigate("/inbox");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    login({
      email,
      password,
    });
  };

  const MotionLink = motion(Link);
  return (
    <div className="flex flex-col-1 h-screen bg-[#F9FAFB] items-center justify-center">
      <div className='w-full bg-custom bg-no-repeat bg-cover h-screen '/>
      <div className="w-full p-16 flex items-center justify-center flex-col">
        <motion.h1
          className="mb-6 text-center text-[3rem] font-extrabold uppercase text-violet-500"
          whileInView={{
            y: [0, -20, 0],
            opacity: 1,
            transition: {duration: 0.4, delay: 0.2},
          }}
        >
          knock-knock
        </motion.h1>
        <motion.h2
          className="text-center text-3xl font-extrabold text-gray-900"
          whileInView={{
            y: [0, 10, 0],
            opacity: 1,
            transition: {duration: 0.4, delay: 0.5},
          }}
        >
          Sign in to your account
        </motion.h2>
        <motion.form
          className="mt-8 space-y-6 w-6/12"
          initial={{y: -30, opacity: 0}}
          whileInView={{y: 0, opacity: 1}}
          transition={{duration: 0.5}}
          onSubmit={handleSubmit}
        >
          <div className="rounded-md shadow-sm -space-y-px">

            <motion.input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              whileFocus={{scale: 1.05}}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            <motion.div className="relative">
              <motion.input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                placeholder="Password"
                whileFocus={{scale: 1.05}}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <motion.button
                type="button"
                className="absolute inset-y-0 right-0 px-2 py-2 flex items-center"
                onClick={togglePasswordVisibility}
                initial={{x: -200, opacity: 0}}
                whileHover={{scale: 1.2}}
                whileTap={{scale: 0.9}}
                whileInView={{
                  x: 0,
                  opacity: 1,
                  transition: {duration: 0.5},
                }}
              >
                {showPassword ? (
                  <FiEyeOff className="text-violet-800 text-2xl"/>
                ) : (
                  <FiEye className="text-violet-800 text-2xl"/>
                )}
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center justify-end text-sm"
            initial={{x: 150, opacity: 0}}
            whileInView={{
              x: 0,
              opacity: 1,
              transition: {duration: 0.5, delay: 0.2},
            }}
          >
            <MotionLink
              to=""
              className="font-medium text-violet-600 hover:text-violet-500"
            >
              Forget password?
            </MotionLink>

          </motion.div>

          <motion.button
            type="submit"
            className="w-full flex relative justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            initial={{scale: 0.5, opacity: 0}}
            whileHover={{
              scale: 1.1,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
              transition: {duration: 0.5},
            }}
            disabled={isLoading}
          >
            Sign in
          </motion.button>

          {error !== "" && <Error message={error}/>}
        </motion.form>
        <motion.div className="absolute bottom-0 text-center pb-10" whileInView={{
          y: 0,
          opacity: 1,
          transition: {duration: 0.5, delay: 0.3},
        }} initial={{y: 30, opacity: 0}} transition={{duration: 0.5}}>
          <Link
            to="/register"
            className="font-semibold"
          >
            Don't have an account? <span className="text-violet-600">Register</span>
          </Link>
        </motion.div>
      </div>

    </div>
  );
}
