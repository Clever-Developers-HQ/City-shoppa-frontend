import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService';
import { AuthProps, SignupProps } from "./authDTO";

export interface PasswordResetInterface {
    loading: boolean,
    error: any,
    message: any
    status: any,
}

const initialState: PasswordResetInterface = {
    status: null,
    loading: false,
    error: null,
    message: null
}


//Login User


export const forgetPassword: any = createAsyncThunk(
    'auth/forgetPassword',
    async (email: string, thunkAPI) => {
        try {
            return authService.forgetPassword(email)
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            // showMessage({
            //     message: "Error",
            //     description: message,
            //     type: "danger",
            //     icon: "danger",
            //     duration: 3000,
            // });
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const forgetPasswordSlice = createSlice({
    name: 'forgetPassword',
    initialState,

    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = null
            state.message = ""
        },
    },

    extraReducers: (builder) => {
        builder.addCase(forgetPassword.pending, (state) => {
            state.loading = true
        })
        builder.addCase(forgetPassword.fulfilled, (state, action) => {
            state.loading = false
            state.status = action.payload.status
            state.error = null
            state.status = "failed"
        })

        builder.addCase(forgetPassword.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.status = action.payload.status
            state.message = ""
        })
    }
})

export const { reset } = forgetPasswordSlice.actions

export default forgetPasswordSlice.reducer