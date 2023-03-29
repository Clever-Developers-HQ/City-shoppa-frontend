import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import categoryservice from './categoryService'



const initialState: any = {
    categories: null,
    loading: false,
    error: false,
    success: false,
    message: "",
};

//REGISTER MERCHANT
export const getCategoriesAction = createAsyncThunk(
    "/getCategoriesAction",
    async (
        token: string,
        thunkAPI: any,
    ) => {
        try {
            return await categoryservice.getCategories(token);
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

export const getCategoriesSlice = createSlice({
    name: "getCategories",
    initialState,
    reducers: {
        //non asynchronous reducers goes here
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.message = "";
            state.categories = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCategoriesAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.categories = action.payload.category;
            })
            .addCase(getCategoriesAction.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload || "Something went wrong";
                state.categories = null;
            });
    },
});

// Action creators are generated for each case reducer function
export const { reset } = getCategoriesSlice.actions;

export default getCategoriesSlice.reducer;