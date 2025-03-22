import axios from "axios";
import { IUser } from "../Blog/blogSlice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
    user: IUser | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: IUserState = {
    user: null,
    status: "idle",
    error: null,
};

interface userDetailsRes {
    data: IUser,
    status: number,
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getUserDetailsAsync.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        })
    }
})

export const getUserDetailsAsync = createAsyncThunk<
    IUser,                      // This is the return type of the fuction
    void,                       //this is the argument we are giving to the function   
    { rejectValue: string }     // this will be the return type when it fails
>(
    "userSlice/getUserDetailsAsync",
    async (_, { rejectWithValue }) => {
        try {
            const userDetails: userDetailsRes = await axios.get(`${BACKEND_URL}/user/getuserdetails`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            if (userDetails.status === 200 && userDetails.data) {
                return userDetails.data
            }
            else {
                return rejectWithValue("Failed to fetch user details");
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Something went wrong");
        }
    }
)

export default userSlice.reducer