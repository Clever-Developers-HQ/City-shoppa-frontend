import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cityservice from './cityServices'



const initialState: any = {
    cities: null,
    loading: false,
    error: false,
    success: false,
    message: "",
};

//REGISTER MERCHANT
export const getCitiesAction : any = createAsyncThunk(
    "/getCitiesAction",
    async (
        token: string,
        thunkAPI: any,
    ) => {
        try {
            return await Cityservice.getCities(token);
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
);

export const getCitiesSlice = createSlice({
    name: "getCities",
    initialState,
    reducers: {
        //non asynchronous reducers goes here
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = "";
            state.cities = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCitiesAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCitiesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.cities = action.payload.city;
            })
            .addCase(getCitiesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload || "Something went wrong";
                state.cities = null;
            });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = getCitiesSlice.actions;

export default getCitiesSlice.reducer;