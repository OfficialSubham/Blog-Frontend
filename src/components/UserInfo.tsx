import { Link } from "react-router-dom";

interface visibility {
  visible: boolean;
}
const UserInfo = ({ visible }: visibility) => {
  return (
    <div
      className="absolute top-12 w-30 p-2 rounded-xl right-0 bg-gray-900"
      style={{ visibility: `${visible ? "visible" : "hidden"}` }}
    >
      <div className="flex flex-col">
        <button className="cursor-pointer">
          <Link to="/yourblogs">Your Blogs</Link>
        </button>
        <button className="cursor-pointer">
          <Link to="/yourprofile">Your Profile</Link>
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
