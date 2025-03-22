import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import UserIcon from "./UserIcon";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/loading";
import { IAllBlog, setAllBlogs } from "@/redux/Blog/blogSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const loggedIn = useSelector((state: RootState) => state.loggedIn.loggedIn);
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const location = useLocation();
  const hiddenRoute = "/yourblogs";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    dispatch(setLoading(true));
 
    try {
      const res: IAllBlog = await axios.get(
        `${BACKEND_URL}/blog/searchblogs?search=${query}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.status === 200 && res.data.blogs[0]) {
        //reversing in order of newest first
        const searchedBlog = res.data.blogs.reverse();

        dispatch(setAllBlogs(searchedBlog));
      }
      dispatch(setLoading(false));
      setQuery("");
    } catch (error) {
      if (error) {
        dispatch(setLoading(false));
        // console.log(error)
        alert("No Blog Found");
        return navigate("/")
      }
    }
  };

  return (
    loggedIn && (
      <div className="w-screen z-50 bg-slate-500 top-0 h-15 flex items-center justify-center px-5 fixed md:px-40 py-2">
        <div className="w-full bg-black text-white flex h-full rounded-2xl items-center backdrop-blur-3xl justify-between px-4">
          <div>
            {location.pathname !== hiddenRoute ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  className="bg-white text-black pl-2 rounded-2xl"
                  value={query}
                  placeholder="Search blog"
                  onChange={handleChange}
                />
                <button className="cursor-pointer" onClick={handleSearch}>
                  <img src="./icons/search-icon.svg" alt="" />
                </button>
              </div>
            ) : (
              <button className="cursor-pointer" onClick={() => {
                navigate("/")
              }}> &#x219e; Back</button>
            )}
          </div>

          <UserIcon />
        </div>
      </div>
    )
  );
};

export default Navbar;
