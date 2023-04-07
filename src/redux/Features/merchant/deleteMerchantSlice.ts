import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Merchantervice,{ MerchantProps }  from './merchantService'



  
  const initialState: any = {
    merchant: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER MERCHANT
export const deleteMerchantAction = createAsyncThunk(
    "/deleteMerchantAction",
    async ({id,token}:MerchantProps, thunkAPI: any,
    ) => {
      try {
        return await Merchantervice.deleteMerchant({id, token});
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
  
  export const deleteMerchantSlice = createSlice({
    name: "deleteMerchant",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.merchant = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(deleteMerchantAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteMerchantAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.merchant = action.payload.message;
        })
        
        .addCase(deleteMerchantAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something Went Wrong";
          state.merchant = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = deleteMerchantSlice.actions;
  
  export default deleteMerchantSlice.reducer;