import { IBlog } from "@/redux/Blog/blogSlice";
import { setLoading } from "@/redux/loading";
import { RootState } from "@/redux/store";
import { blogSchema } from "@codersubham/validuser";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

interface blog {
  blog: IBlog;
}

interface IRes {
  status: number;
  data: blog;
}

const EditYourBlog = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const blog = useSelector((state: RootState) => state.editBlogState.editBlog);
  const [blogId, setBlogId] = useState<number>()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({
    title: blog.title,
    description: blog.description,
    tag: [""],
  });

  const [tag, setTag] = useState("");

  const handleOninput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditBlog = async () => {
    dispatch(setLoading(true));

    const tagWithFilter = tag
      .split(",")
      .filter((tag) => tag.trim() !== "")
      .map((tag) => tag.trim());

    const updatedBlog = {
      ...newBlog,
      tag: tagWithFilter,
    };

    setNewBlog(updatedBlog);
    const { success } = blogSchema.safeParse(updatedBlog);
    if (!success) {
      dispatch(setLoading(false));
      return alert("Follow minimum criteria");
    }
    const res: IRes = await axios.put(
      `${BACKEND_URL}/blog/updateblog/${blogId}`,
      updatedBlog,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    if (res.status === 200) {
      dispatch(setLoading(false));
      navigate("/");
    }
  };

  const handleOninputTag = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTag(e.target.value);
  };

  useEffect(() => {
    const tag = blog.tag;
    setBlogId(blog.id)
    const tagWithComma = tag.join(",");
    setTag(tagWithComma);
  }, []);

  return blog.title ? (
    <div className="w-screen h-screen pt-20">
      <div className="flex md:px-30 pl-4 items-center gap-4 mb-5">
        <button
          className="text-2xl px-2 border text-gray-500 border-black rounded-full cursor-pointer"
          onClick={handleEditBlog}
        >
          +
        </button>
        <textarea
          value={newBlog.title}
          className="w-full h-10 bg-white border-l border-black outline-0 px-2 text-3xl"
          placeholder="Title"
          onChange={handleOninput}
          name="title"
        />
      </div>
      <div className="md:px-45 pl-20 pr-5 w-full h-50">
        <textarea
          className="md:w-full outline-0 w-full text-lg h-full"
          placeholder="Tell your story..."
          value={newBlog.description}
          onInput={handleOninput}
          name="description"
        />
        <div className="flex items-center gap-2">
          <textarea
            className="w-full text-md rounded-md outline-0 px-2 py-1"
            name="tag"
            placeholder="Enter your tags"
            value={tag}
            onInput={handleOninputTag}
          />
          <button className="relative group">
            <span>
              <img
                src="./icons/info-icon.svg"
                className="cursor-pointer"
                alt=""
              />
            </span>
            <span className="absolute right-0 w-35 md:w-50 break-words bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
              Seperate Tag using ","
            </span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default EditYourBlog;
