import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import donationService from './donationServices'
import { CreateDonationProps } from "./donationServices";


  const initialState: any = {
    donation: "",
    loading: false,
    error: false,
    success: false,
    message: "",
  };


//create Donation
export const createDonationAction = createAsyncThunk(
    "/createDonationAction",
    async (
      { token, amount}: CreateDonationProps,
      thunkAPI
    ) => {
      try {
        return await donationService.createDonation({
            amount, token
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
  
  export const createDonation = createSlice({
    name: "createDonation",
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
        .addCase(createDonationAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(createDonationAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.donation = action.payload;
          state.message = action.payload;
        })
        .addCase(createDonationAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.donation = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = createDonation.actions;
  
  export default createDonation.reducer;