import { createSlice } from '@reduxjs/toolkit'

const initialStateValue = {
    isAuth: false,
    isLoginLoading: false,
    isLoginErrors: null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    value: initialStateValue
  },
  reducers: {
      loginLoading: (state) => {
          state.isLoginLoading = true
      },

      loginSuccess: (state, { payload }) => {

        localStorage.setItem("accessToken", payload.accessToken)
        localStorage.setItem("user_id", payload.user_id)
        localStorage.setItem("username", payload.username)

        state.isAuth = true
        state.isLoginLoading = false
        state.isLoginErrors = null
      },

      loginFail: (state, { payload }) => {
        state.isLoginLoading = false
        state.isLoginErrors = payload
      },

      logout: (state) => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user_id")
        localStorage.removeItem("username")

        state.isAuth = false
      }
  }
})

export const { loginLoading, loginSuccess, loginFail, logout } = loginSlice.actions

export default loginSlice.reducer