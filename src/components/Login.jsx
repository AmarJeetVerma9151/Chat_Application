import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("https://chatapp-qlz2.onrender.com/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
          localStorage.setItem("ChatApp", JSON.stringify(response.data));
          setAuthUser(response.data);
        }
      })
      .catch((error) => {
        if (error.response) {
          
          toast.error("Error: " + error.response.data.error);
        }
        console.log(error)
      });

    reset(); // clears the form
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/10  border border-white/40  bg-gradient-to-r from-indigo-600 shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login Page</h2>

        {/* ✅ Make sure onSubmit is connected properly */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
            className="w-full px-4 py-2 bg-white/20 placeholder-white/80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.email && <p className="text-red-300 text-sm">Email is required</p>}

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 bg-white/20 placeholder-white/80 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          {errors.password && <p className="text-red-300 text-sm">Password is required</p>}

          <button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-white mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="underline text-blue-900 text-lg text-white/90 hover:text-lime-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
