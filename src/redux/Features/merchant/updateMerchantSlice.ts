import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Merchantervice,{ MerchantProps, UpdateMerchantProps }  from './merchantService'



  
  const initialState: any = {
    merchant: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const updateMerchantAction = createAsyncThunk(
    "/updateMerchantAction",
    async ({id,token,  name, business_name, email, website, address}:UpdateMerchantProps, thunkAPI: any,
    ) => {
      try {
        return await Merchantervice.updateMerchant({id, token,  name, business_name, email, website, address});
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(`${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  export const updateMerchantSlice = createSlice({
    name: "updateMerchant",
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
        .addCase(updateMerchantAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateMerchantAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.merchant = action.payload.merchant;
          state.message = "Merchant Updated Successfully";
        })
        .addCase(updateMerchantAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something went wrong";
          state.merchant = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = updateMerchantSlice.actions;
  
  export default updateMerchantSlice.reducer;