import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog } from "./blogSlice";

interface ITempEditBlog {
    id: number;
    title: string;
    description: string;    
    tag: string[]
}

interface EditedBlog {
    editBlog: IBlog | ITempEditBlog
}

const initialState: EditedBlog = {
    editBlog: {
        id: Infinity,
        title: "",
        description: "",
        tag: []
    } 
}

const editBlogSlice = createSlice({
    name: "editBlogSlice",
    initialState,
    reducers: {
        setEditBlogState: (state, action: PayloadAction<IBlog>) => {
            state.editBlog = action.payload
        }
    }
})

export const { setEditBlogState } = editBlogSlice.actions

export default editBlogSlice.reducer