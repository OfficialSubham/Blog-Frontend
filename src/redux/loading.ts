import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ILoading {
    loading: boolean
}

const initialState: ILoading = {
    loading: false
}

const loadingSlice = createSlice({
    name: "loadingSlice",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const { setLoading } = loadingSlice.actions
export default loadingSlice.reducer