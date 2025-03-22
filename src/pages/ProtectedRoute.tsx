// import { RootState } from "@/redux/store";
// import { setLoggedIn } from "@/redux/User/loggedInSlice";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface IProps {
  loggedIn: boolean
}

const ProtectedRoute = ({loggedIn}:IProps) => {
  return loggedIn ===true ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
