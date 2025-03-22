import { IBlog, removeBlog } from "@/redux/Blog/blogSlice";
import Tag from "./Tag";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/loading";
import { AppDispatch } from "@/redux/store";

const Blog = ({ id, description, tag, title, user }: IBlog) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const handleBlog = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e.currentTarget.id)
  };
  const dispatch = useDispatch<AppDispatch>()
  const handleDeleteBlog = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = Number(e.currentTarget.closest(".blog-container")?.id);
    dispatch(setLoading(true))
    try {
      const deleted = await axios.delete(`${BACKEND_URL}/blog/deleteblog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      console.log(deleted)
      dispatch(removeBlog(id))
      dispatch(setLoading(false))
      if(deleted.status === 200) {
        return alert("Successfully deleted")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const location = useLocation();
  const visibleRoute = "/yourblogs";

  return (
    <>
      <div
        className="w-full blog-container flex gap-5 cursor-pointer flex-col xl:grid md:grid-cols-12 px-5"
        onClick={handleBlog}
        id={`${id}`}
      >
        <div className="flex flex-col col-span-8">
          <div className="w-full">
            <h1 className="text-2xl break-words font-bold">{title}</h1>

            <h6 className="text-gray-500 text-sm my-3">@{user.username}</h6>
          </div>
          <p>{description}</p>
          <div className="flex gap-3 mt-2 flex-wrap">
            {tag.map((tag) => {
              return <Tag key={crypto.randomUUID()} tag={tag} />;
            })}
          </div>
        </div>

        <div className="col-span-4">
          <span className="font-bold">Author</span>
          <div className="flex items-center gap-3 my-3">
            <div className="w-4 h-4 bg-gray-700  rounded-full"></div>
            <div className="w-full flex justify-between break-words">
              {user.firstName + " " + user.lastName}
              {location.pathname === visibleRoute && (
                <button
                  className="bg-red-500 text-white px-1 rounded-sm"
                  onClick={handleDeleteBlog}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-screen h-0.5 bg-gray-500" />
      </div>
    </>
  );
};

export default Blog;
