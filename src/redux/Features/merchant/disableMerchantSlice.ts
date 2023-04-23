import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import MerchantService,{ MerchantProps }  from './merchantService'



  
  const initialState: any = {
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER MERCHANT
export const disableMerchantAction = createAsyncThunk(
    "/disableMerchantAction",
    async ({id,token}:MerchantProps, thunkAPI: any,
    ) => {
      try {
        return await MerchantService.disableMerchant({id, token});
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
  
  export const disableMerchantSlice = createSlice({
    name: "disableMerchant",
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
        .addCase(disableMerchantAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(disableMerchantAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.message = action.payload.message;
        })
        
        .addCase(disableMerchantAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something Went Wrong";
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = disableMerchantSlice.actions;
  
  export default disableMerchantSlice.reducer;