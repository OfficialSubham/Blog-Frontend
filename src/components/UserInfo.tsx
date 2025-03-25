import { setLoggedIn } from "@/redux/User/loggedInSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

interface visibility {
  setVisibility: Function;
  visible: boolean;
}
const UserInfo = ({ visible, setVisibility }: visibility) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleLogout = () => {
    setVisibility(false);
    dispatch(setLoggedIn(false))
    localStorage.removeItem("token");
    return navigate("/signup");
  };

  return (
    <div
      className="absolute top-12 w-30 p-2 rounded-xl right-0 bg-gray-900"
      style={{ visibility: `${visible ? "visible" : "hidden"}` }}
    >
      <div className="flex flex-col">
        <button
          className="cursor-pointer"
          onClick={() => {
            setVisibility(false);
          }}
        >
          <Link to="/yourblogs">Your Blogs</Link>
        </button>
        <button
          className="cursor-pointer"
          onClick={() => {
            setVisibility(false);
          }}
        >
          <Link to="/yourprofile">Your Profile</Link>
        </button>
        <button
          className="bg-red-500 rounded-xl cursor-pointer"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
