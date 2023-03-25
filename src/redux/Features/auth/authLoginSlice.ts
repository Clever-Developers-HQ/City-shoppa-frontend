import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService';
import { AuthProps, SignupProps } from "./authDTO";
import { showSuccess, showInfo } from "@/components/Utils/AlertMsg";


let userFromStorage = null;
const ISSERVER = typeof window === "undefined";

if (!ISSERVER) {
  userFromStorage = localStorage.getItem("user")
    // ? JSON.parse(localStorage.getItem("user"))
    // : null;
}



export interface authLoginInterface {
    user: any,
    loading: boolean,
    error: any,
    message: any
    status: any,
}

const initialState: authLoginInterface = {
    user: null,
    status: null,
    loading: false,
    error: null,
    message: null
}


//Login User

export const loginUser: any = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: AuthProps, thunkAPI) => {
        try {
            return authService.login({ email, password })
        } catch (error: any) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            if (/jwt|unauthenticated/gi.test(message)) {
                //dispatch logout
                thunkAPI.dispatch(logout());
            }
            showInfo(`${message}`);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const logout = createAsyncThunk("auth/logout", async ({ }, thunkAPI) => {
    return showSuccess("Logged Out Successfully")
});



export const loginSlice = createSlice({
    name: 'loginUser',
    initialState,

    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = null
            state.user = null
            state.message = ""
        },
    },

    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.status = action.payload.status
            state.user = action.payload.user
            state.error = null
        })

        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.status = action.payload.status
            state.user = null
            state.message = ""
        })
    }
})

export const { reset } = loginSlice.actions

export default loginSlice.reducer