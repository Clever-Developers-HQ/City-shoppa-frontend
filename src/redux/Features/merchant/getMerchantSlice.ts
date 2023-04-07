import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import merchantService,{ MerchantProps }  from './merchantService'


  const initialState: any = {
    merchant: null,
    loading: false,
    error: false,
    success: false,
    message: "",
    products: []
  };

//REGISTER MERCHANT
export const getMerchantAction = createAsyncThunk(
    "/getMerchantAction",
    async ({id,token}:any, thunkAPI: any,
    ) => {
      try {
        return await merchantService.getMerchant({id, token});
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.error ||
          error.toString();
        toast.warning(`${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  export const getMerchantSlice = createSlice({
    name: "getMerchant",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.merchant = null;
        state.products = []
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getMerchantAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getMerchantAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.merchant = action.payload.merchant;
          state.products = action.payload.merchantProducts
        })
        .addCase(getMerchantAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something went wrong";
          state.merchant = null;
          state.products = []
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getMerchantSlice.actions;
  
  export default getMerchantSlice.reducer;