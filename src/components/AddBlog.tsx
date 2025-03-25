import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const AddBlog = () => {
  const location = useLocation();
  const hiddenRoute = [
    "/createblog",
    "/yourprofile",
    "/yourblogs",
    "/edityourblog",
  ];
  const loggedIn = useSelector((state: RootState) => state.loggedIn.loggedIn);
  if (hiddenRoute.includes(location.pathname)) {
    return null;
  }
  return (
    <Link
      className="fixed bg-black text-white py-1 px-4 cursor-pointer rounded-full bottom-10 text-5xl right-5 md:right-20"
      to="/createblog"
      style={{ visibility: loggedIn ? "initial" : "hidden" }}
    >
      +
    </Link>
  );
};

export default AddBlog;
