import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import cityService,{ CityProps }  from './cityServices'


  const initialState: any = {
    City: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER City
export const deleteCityAction = createAsyncThunk(
    "/deleteCityAction",
    async ({id,token}:CityProps, thunkAPI: any,
    ) => {
      try {
        return await cityService.deleteCity({id, token});
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
  
  export const deleteCitySlice = createSlice({
    name: "deleteCity",
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
        .addCase(deleteCityAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteCityAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.city = action.payload.message;
        })
        
        .addCase(deleteCityAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something Went Wrong";
          state.city = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = deleteCitySlice.actions;
  
  export default deleteCitySlice.reducer;