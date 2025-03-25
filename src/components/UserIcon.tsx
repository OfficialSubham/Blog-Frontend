import { useState } from "react";
import UserInfo from "./UserInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const UserIcon = () => {
  const [showInfo, setShowInfo] = useState(false);
  const userData = useSelector((state: RootState) => state.userState)
  const handleProfileIcon = () => {
    setShowInfo(!showInfo)
  }
  return (
    <>
      <div className="flex h-10 items-center justify-center w-10 text-center bg-gray-500 rounded-full border border-white cursor-pointer" onClick={handleProfileIcon}>
        {
          userData.user?.firstName[0].toLocaleUpperCase() || "X"
        }
      </div>
      <UserInfo visible={showInfo} setVisibility={setShowInfo}/>
    </>
  );
};

export default UserIcon;
