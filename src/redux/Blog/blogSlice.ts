import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
    id: number,
    username: string,
    firstName: string,
    lastName: string
}

export interface IBlog {
    id: number,
    title: string,
    description: string,
    userId: number,
    tag: string[],
    deleted: boolean,
    user: IUser
}

export interface IData {
    blogs: IBlog[],
    message: string
}

export interface IAllBlog {
    status: number,
    data: IData
}

interface IBlogState {
    blogs: IBlog[]
}

const initialState: IBlogState = {
    blogs: []
}

const blogSlice = createSlice({
    name: "blogSlice",
    initialState,
    reducers: {
        setAllBlogs: (state, action: PayloadAction<IBlog[]>) => {
            state.blogs = action.payload
        },
        addBlog: (state, action: PayloadAction<IBlog>) => {
            state.blogs.push(action.payload)
        },
        removeBlog: (state, action: PayloadAction<number>) => {
            const newBlogs = state.blogs.filter((blog) => {
                return blog.id !== action.payload
            })
            state.blogs = newBlogs
        }
    }

})


export const { setAllBlogs, addBlog, removeBlog } = blogSlice.actions

export default blogSlice.reducer
