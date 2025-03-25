import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from "./User/loggedInSlice";
import blogSlice from "./Blog/blogSlice"
import loadingSlice from "./loading";
import userSlice from "./User/userSlice";
import editBlogSlice from "./Blog/editBlogSlice"


const store = configureStore({
    reducer: {
        loggedIn: loggedInReducer,
        blog: blogSlice,
        loadingState: loadingSlice,
        userState: userSlice,
        editBlogState: editBlogSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store