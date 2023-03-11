import { combineReducers } from "@reduxjs/toolkit";
import { loginSlice } from "./Features/auth/authLoginSlice";
import { registerSlice } from "./Features/auth/authRegisterSlice";
import { forgetPasswordSlice } from "./Features/auth/authForgetPasswordSlice";

const reducers = combineReducers({

    //AUTHENTICATION REDUCERS
    authLogin: loginSlice.reducer,
    authRegister: registerSlice.reducer,
    authForgetPassword: forgetPasswordSlice.reducer

    //MUSIC REDUCERS


})

export { reducers };