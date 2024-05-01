import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {FiEye, FiEyeOff} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../redux/auth/authApi";
import Error from "../components/ui/Error";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const MotionLink = motion(Link);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [register, {data, isLoading, error: responseError}] =
    useRegisterMutation();

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

    if (confirmPassword !== password) {
      setError("Passwords do not match");
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };
  return (
    <div className="flex flex-col-1 h-screen bg-[#F9FAFB] items-center justify-center">
      <div className="w-full space-y-6 flex flex-col justify-center items-center">
        <motion.h1
          className="text-center text-[3rem] font-extrabold uppercase text-violet-500"
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
          Create your account
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
              id="name"
              name="Name"
              type="Name"
              autoComplete="Name"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              whileFocus={{scale: 1.05}}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <motion.input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm focus:z-10"
                placeholder="Password"
                whileFocus={{scale: 1.05}}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <motion.button
                type="button"
                className="absolute inset-y-0 right-0 px-2 py-2 flex items-center z-20"
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

            <motion.div className="relative">
              <motion.input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                whileFocus={{scale: 1.05}}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <motion.button
                type="button"
                className="absolute inset-y-0 right-0 px-2 py-2 flex items-center z-20"
                onClick={toggleConfirmPasswordVisibility}
                whileHover={{scale: 1.2}}
                whileTap={{scale: 0.9}}
              >
                {showConfirmPassword ? (
                  <FiEyeOff className="text-violet-800 text-2xl"/>
                ) : (
                  <FiEye className="text-violet-800 text-2xl"/>
                )}
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center justify-start"
            initial={{x: 50, opacity: 0}}
            whileInView={{
              x: [0, -20, 0],
              opacity: 1,
              transition: {duration: 0.4, delay: 0.2},
            }}
          >
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
              required
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label
              htmlFor="accept-terms"
              className="ml-2 block text-sm text-gray-900"
            >
              Agreed with the terms and condition
            </label>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.1,
            }}
            whileInView={{
              y: [0, 10, 0],
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.4,
              },
            }}
          >
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              disabled={isLoading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Sign up
            </button>
          </motion.div>
        </motion.form>
        <motion.div className="absolute bottom-0 text-center pb-10" whileInView={{
          y: 0,
          opacity: 1,
          transition: {duration: 0.5, delay: 0.3},
        }} initial={{y: 30, opacity: 0}} transition={{duration: 0.5}}>
          <Link
            to="/"
            className="font-semibold"
          >
            Already have an account? <span className='text-violet-600'>Sign in!</span>
          </Link>
        </motion.div>
        {error !== "" && (
          <motion.div>
            <Error message={error}/>
          </motion.div>
        )}
      </div>
      <div className='w-full bg-custom bg-no-repeat bg-cover h-screen '/>
    </div>
  );
}
