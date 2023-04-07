import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import cityServices,{ CityProps }  from './cityServices'

  const initialState: any = {
    city: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const getCityAction = createAsyncThunk(
    "/getCityAction",
    async ({id,token}:CityProps, thunkAPI: any,
    ) => {
      try {
        return await cityServices.getCity({id, token});
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
  
  
  export const getCitySlice = createSlice({
    name: "getCity",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.city = null;
        state.products = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getCityAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getCityAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.city = action.payload.city;
        })
        
        .addCase(getCityAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something went wrong";
          state.city = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getCitySlice.actions;
  
  export default getCitySlice.reducer;