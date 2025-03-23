import { setLoading } from "@/redux/loading";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface User {
  firstName?: string;
  lastName?: string;
  password?: string;
}

interface IData {
    message: string;
    token: string;
}

interface IRes {
    data: IData;
    status: number
}

const passwordSchema = z.string().min(5);

const YourProfile = () => {
 
    const userState = useSelector((state: RootState) => state.userState.user);
  const dispatch = useDispatch()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState<User>({
    firstName: userState?.firstName || "",
    lastName: userState?.lastName || "",
    password: "",
  });

  const navigate = useNavigate()

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async () => {
   
    const filteredData: User = Object.fromEntries(
      Object.entries(user).filter(([_, value]) => value !== "")
    );
    if (filteredData.password) {
      const { success } = passwordSchema.safeParse(filteredData.password);
      if (!success) {
        return alert("Enter Valid Passowrd");
    }
    }
    console.log(filteredData)
    dispatch(setLoading(true))
    const res:IRes = await axios.put(
      `${BACKEND_URL}/user/updateuser`,
      filteredData,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(res)
    if(res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token)
    }
    else {
        dispatch(setLoading(false))
        return alert("An Error Occured")
    }
    navigate("/")
    dispatch(setLoading(false))
    return alert("User Updated Successfully")
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border pl-4 pr-2 py-4 flex flex-col rounded-xl border-black">
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
        <div className="mb-5 w-full flex flex-col">
          <span>New Password</span>
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
                Minimum Length of Password must be 6 (Opitonal)
              </span>
            </button>
          </div>
        </div>
        <button
          className="bg-black text-white font-bold rounded-xl py-2"
          onClick={handleUpdateUser}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default YourProfile;
