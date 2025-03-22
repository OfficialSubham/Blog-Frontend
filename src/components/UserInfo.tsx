import { Link } from "react-router-dom";

interface visibility {
  setVisibility: Function;
  visible: boolean;
}
const UserInfo = ({ visible, setVisibility }: visibility) => {
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
      </div>
    </div>
  );
};

export default UserInfo;
