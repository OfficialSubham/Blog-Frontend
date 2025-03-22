import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Loading = () => {
  const { loading } = useSelector((state: RootState) => state.loadingState);
  if(!loading) return null 
  return (
    <div className="w-full h-full absolute z-20 flex justify-center items-center">
      <span className="loading loading-spinner loading-xl text-neutral"></span>

      <div className="w-full absolute h-full bg-white z-10 opacity-50  backdrop-blur-3xl"></div>
    </div>
  );
};

export default Loading;
