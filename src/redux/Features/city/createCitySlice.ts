import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import cityService, { CreateCityProps } from './cityServices'


  const initialState: any = {
    city: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


//create City
export const createCityAction = createAsyncThunk(
    "/createCityAction",
    async (
      { name, token, street, province}: CreateCityProps,
      thunkAPI
    ) => {
      try {
        return await cityService.createCity({
            name, token, street, province
        });
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
  
  export const createCity = createSlice({
    name: "createCity",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.city = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createCityAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(createCityAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.city = action.payload.city;
          state.message = action.payload.status;
        })
        .addCase(createCityAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.city = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = createCity.actions;
  
  export default createCity.reducer;