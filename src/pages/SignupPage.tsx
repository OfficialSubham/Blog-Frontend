import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSchema } from "@codersubham/validuser";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "@/redux/User/loggedInSlice";
import { setLoading } from "@/redux/loading";
const SignupPage = () => {
  interface IData {
    message: string;
    token: string;
  }
  interface IResponse {
    data: IData;
    status: number;
  }

  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleSignup = async () => {
    try {
      const { success } = userSchema.safeParse(user);
      if (!success) return alert("Enter Valid Credentials");
      dispatch(setLoading(true));
      const res: IResponse = await axios.post(
        `${BACKEND_URL}/user/createuser`,
        {
          ...user,
        }
      );
      if (res.status === 200) {
        dispatch(setLoggedIn(true));
        const token = res.data.token;
        localStorage.setItem("token", token);
        dispatch(setLoading(false));
        return navigate("/");
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        dispatch(setLoading(false));
        return alert("Username Already Taken");
      }
    }
  };

  return (
    <div className="max-w-screen items-center h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="w-full flex justify-center items-center mb-5 md:mb-0 px-10">
        <div className="w-100 flex justify-center items-center flex-col">
          <div className="flex flex-col items-center mb-3">
            <h3 className="text-2xl font-bold">Create an account</h3>
            <span className="text-sm text-gray-400">
              New here?{" "}
              <Link className="hover:underline cursor-pointer" to="/login">
                Login
              </Link>
            </span>
          </div>
          <div className="mb-3 w-full pr-7">
            <span>First Name</span>
            <input
              type="text"
              className="w-full border-black border rounded-md px-2 py-1"
              value={user.firstName}
              onChange={handleOnchange}
              name="firstName"
            />
          </div>
          <div className="mb-3 w-full pr-7">
            <span>Last Name</span>
            <input
              type="text"
              className="w-full border-black border rounded-md px-2 py-1"
              value={user.lastName}
              onChange={handleOnchange}
              name="lastName"
            />
          </div>
          <div className="mb-3 w-full">
            <span>Username</span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="w-full border-black border rounded-md px-2 py-1"
                value={user.username}
                onChange={handleOnchange}
                name="username"
              />
              <button className="relative group">
                <span>
                  <img
                    src={`./icons/info-icon.svg`}
                    className="cursor-pointer"
                    alt=""
                  />
                </span>
                <span className="absolute w-35 md:w-50 break-words bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
                  Enter Valid Username
                </span>
              </button>
            </div>
          </div>
          <div className="mb-5 w-full flex flex-col">
            <span>Password</span>
            <div className="flex items-center gap-2">
              <input
                type="password"
                className="w-full border-black border rounded-md px-2 py-1"
                value={user.password}
                onChange={handleOnchange}
                name="password"
              />
              <button className="relative group">
                <span>
                  <img
                    src="./icons/info-icon.svg"
                    className="cursor-pointer"
                    alt=""
                  />
                </span>
                <span className="absolute w-35 md:w-50 break-words bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
                  Minimum Length of Password must be 6
                </span>
              </button>
            </div>
          </div>
          <button
            onClick={handleSignup}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 cursor-pointer"
          >
            Signup
          </button>
        </div>
      </div>
      <div className="w-full px-10 h-full flex flex-col justify-center items-center bg-gray-100">
        <div className="w-auto flex justify-center flex-col mt-10 md:mt-0 lg:w-125">
          <span className="break-words text-xl font-bold">
            "The Customer Servicec I recieved was EXCEPTIONAL. The support team
            went above and beyond to address my concerns."
          </span>
          <br />
          <span className="font-bold text-md">Subam Mondal</span>
          <br />
          <span className="text-sm text-gray-400">CEO, Acme Inc</span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
