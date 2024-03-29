import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import merchantService, { RegisterMerchantProps } from './merchantService'


  
  const initialState: any = {
    merchant: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


//REGISTER MERCHANT
export const merchantRegisterAction = createAsyncThunk(
    "/merchantRegisterAction",
    async (
      { name, token, business_name, address, website, email}: RegisterMerchantProps,
      thunkAPI
    ) => {
      try {
        return await merchantService.registerMerchant({
            name,
            business_name,
            address,
            website,
            email,
            token
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
  
  export const merchantRegister = createSlice({
    name: "merchantRegister",
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
        .addCase(merchantRegisterAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(merchantRegisterAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.merchant = action.payload;
          state.message = action.payload;
        })
        .addCase(merchantRegisterAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.merchant = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = merchantRegister.actions;
  
  export default merchantRegister.reducer;