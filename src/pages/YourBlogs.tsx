import Blog from "@/components/Blog";
import { IAllBlog, setAllBlogs } from "@/redux/Blog/blogSlice";
import { setLoading } from "@/redux/loading";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const YourBlogs = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch<AppDispatch>();
  const yourBlogs = useSelector((state: RootState) => state.blog.blogs);

  const getYourBlogs = async () => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    const res: IAllBlog = await axios.get(`${BACKEND_URL}/blog/getyourblogs`, {
      headers: {
        Authorization: token,
      },
    });
    const newestFirstBlog = res.data.blogs.reverse();
    if (res.status === 200 && res.data.blogs) {
      dispatch(setAllBlogs(newestFirstBlog));
    }

    dispatch(setLoading(false));
  };

  useEffect(() => {
    getYourBlogs();
  }, []);

  return (
    <>
      {yourBlogs[0] && (
        <div
          className="max-w-screen h-screen md:px-50 px-10 flex LOGS
        justify-center pt-15"
        >
          <div className="h-screen w-full flex-col flex justify-center gap-5 pt-5 ">
            <div className="w-full flex flex-col items-center">
              <div className="font-bold text-2xl">Your Blogs</div>
              <span className="absolute bg-black h-1 w-31 top-28"></span>

              <span className="w-full h-0.5 bg-gray-300"></span>
            </div>
            <div className="w-full h-full [&::-webkit-scrollbar]:hidden overflow-y-scroll scrollbar-hidden scroll-smooth ">
              {yourBlogs.map((blog) => {
                if (!blog.deleted) {
                  return (
                    <Blog
                      key={blog.id}
                      id={blog.id}
                      tag={blog.tag}
                      deleted={blog.deleted}
                      title={blog.title}
                      userId={blog.userId}
                      description={blog.description}
                      user={blog.user}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default YourBlogs;
