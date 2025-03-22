import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import CreateBlog from "./pages/CreateBlog";
import AddBlog from "./components/AddBlog";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "./redux/User/loggedInSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import Loading from "./components/Loading";
import YourBlogs from "./pages/YourBlogs";
import { getUserDetailsAsync } from "./redux/User/userSlice";

function App() {
  const loggedIn = useSelector((state: RootState) => state.loggedIn.loggedIn);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserDetailsAsync())
      dispatch(setLoggedIn(true));
    }
  }, [dispatch]);

  return (
    <>
      <Loading />
      <div className="max-w-screen min-h-screen overflow-y-hidden">
        <BrowserRouter>
          <Navbar />
          <AddBlog />
          <div className="max-w-screen">
            <Routes>
              <Route path="/login" Component={LoginPage} />
              <Route path="/signup" Component={SignupPage} />
              <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
                <Route path="/" Component={HomePage} />
                <Route path="/yourblogs" Component={YourBlogs} />
                <Route path="/createblog" Component={CreateBlog} />
              </Route>
              <Route path="*" Component={LoginPage} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
