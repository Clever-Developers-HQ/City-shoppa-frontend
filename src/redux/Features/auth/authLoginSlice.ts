import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService';
import { AuthProps, SignupProps } from "./authDTO";
import { toast } from "react-toastify";



const initialState: any = {
    user: null,
    loading: false,
    error: false,
    success: false,
    message: null,
    token: null
}

export const logOutAction = () => {
    //Clear tHE dETAILS saved in Local Storage 

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");

    //Toast The User That Log Out Sucecssfull

    toast.success("Logout Successfully");
    
    //Redirect the user to Home after 5 seconds 

    setTimeout(() => {
        window.location.href = "/";
    }, 3000)
}

//LOGIN USER

export const loginAction = createAsyncThunk(
    "loginAction",
    async ({email, password}: any, thunkAPI: any) => {
        try {
            return await authService.login({email, password});
        } catch (error: any) {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            toast.warning(`${message}`);
            return thunkAPI.rejectWithValue(message);
          }
    }
)

//CREATE THE SLICE

export const authLoginSlice = createSlice({
    name: "authLogin",
    initialState,
    reducers: {
        //non asynchronous reducers goes here   
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = "";
            state.user = null;
            state.token = null;
        },
    },


    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.user;
                state.token = action.payload.user.token;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
                state.user = "I DEYSYSYS"
            })
    }
})


export const { reset } = authLoginSlice.actions;

export default authLoginSlice.reducer;




