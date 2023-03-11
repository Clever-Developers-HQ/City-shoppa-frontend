import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService';
import { AuthProps, SignupProps } from "./authDTO";

export interface authRegisterInterface {
    user: any,
    loading: boolean,
    error: any,
    message: any,
    status: any
}

const initialState: authRegisterInterface = {
    user: null,
    loading: false,
    error: null,
    message: null,
    status: null,
}


//Login User

export const registerUser: any = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password, username }: SignupProps, thunkAPI) => {
        try {
            return await authService.signup({ email, password, username })
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

export const registerSlice = createSlice({
    name: 'registerUser',
    initialState,

    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = null
            state.user = {}
            state.message = ""
            state.status = null
        },
    },

    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.user
            state.error = null
            state.message = "Registration Successful"
            state.status = action.payload.status
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.user = null
            state.status = action.payload.status
            state.message = action.payload.message

        })
    }
})

export const { reset } = registerSlice.actions

export default registerSlice.reducer
