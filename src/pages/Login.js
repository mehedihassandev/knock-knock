import Error from "../components/ui/Error";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const MotionLink = motion(Link);
  return (
    <div className="grid place-items-center h-screen bg-[#F9FAFB] items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <motion.h1
          className="mb-8 text-center text-[3rem] font-extrabold uppercase text-violet-500"
          whileInView={{
            y: [0, -20, 0],
            opacity: 1,
            transition: { duration: 0.4, delay: 0.2 },
          }}
        >
          knock-knock
        </motion.h1>
        <motion.h2
          className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          whileInView={{
            y: [0, 10, 0],
            opacity: 1,
            transition: { duration: 0.4, delay: 0.5 },
          }}
        >
          Sign in to your account
        </motion.h2>
        <motion.form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <motion.input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              whileFocus={{ scale: 1.05 }}
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <motion.div className="relative">
              <motion.input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                placeholder="Password"
                whileFocus={{ scale: 1.05 }}
              />
              <motion.button
                type="button"
                className="absolute inset-y-0 right-0 px-2 py-2 flex items-center"
                onClick={togglePasswordVisibility}
                initial={{ x: -200, opacity: 0 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.5 },
                }}
              >
                {showPassword ? (
                  <FiEyeOff className="text-violet-800 text-2xl" />
                ) : (
                  <FiEye className="text-violet-800 text-2xl" />
                )}
              </motion.button>
            </motion.div>
          </div>

          <motion.div className="flex items-center justify-between text-sm">
            <MotionLink
              to=""
              className="font-medium text-violet-600 hover:text-violet-500"
              initial={{ x: 150, opacity: 0 }}
              whileHover={{
                scale: 1.1,
                x: "20px",
              }}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: { duration: 0.5, delay: 0.2 },
              }}
            >
              Forget password?
            </MotionLink>
            <MotionLink
              to="/register"
              className="font-medium text-violet-600 hover:text-violet-500"
              initial={{ x: -150, opacity: 0 }}
              whileHover={{
                scale: 1.1,
                x: "-20px",
              }}
              whileInView={{
                x: 0,
                opacity: 1,
                transition: { duration: 0.5, delay: 0.2 },
              }}
            >
              Register
            </MotionLink>
          </motion.div>

          <motion.button
            type="submit"
            className="w-full flex relative justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            initial={{ scale: 0.5, opacity: 0 }}
            whileHover={{
              scale: 1.1,
            }}
            whileInView={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.5 },
            }}
          >
            Sign in
          </motion.button>

          <Error message="There was an error" className="py-3" />
        </motion.form>
      </div>
    </div>
  );
}
