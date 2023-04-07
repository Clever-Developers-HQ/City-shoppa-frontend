import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import donationService,{ DonationProps }  from './donationServices'



  
  const initialState: any = {
    donation: "",
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER Donation
export const getDonationAction = createAsyncThunk(
    "/getDonationAction",
    async ({id,token}:DonationProps, thunkAPI: any,
    ) => {
      try {
        return await donationService.getDonation({id, token});
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
  
  export const getDonationSlice = createSlice({
    name: "getDonation",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.donation = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getDonationAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getDonationAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.donation = action.payload.donation;
        })
        .addCase(getDonationAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something went wrong";
          state.donation = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getDonationSlice.actions;
  
  export default getDonationSlice.reducer;