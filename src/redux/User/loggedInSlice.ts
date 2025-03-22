import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const isLoggedIn = localStorage.getItem("token") ? true : false

interface loggedInState {
  loggedIn: boolean
}

const initialState: loggedInState = {
  loggedIn: isLoggedIn
}

export const loggedIn = createSlice({
  name: 'loggedIn',
  initialState,
  reducers: {
    setLoggedIn: (state, action:PayloadAction<boolean>) => {
      state.loggedIn = action.payload
    },

  }
})

export const { setLoggedIn } = loggedIn.actions

export default loggedIn.reducer
