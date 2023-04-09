import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import DisputeService, { CreateDisputeProps } from './disputeService'

  const initialState: any = {
    dispute: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


//create Dispute
export const createDisputeAction = createAsyncThunk(
    "/createDisputeAction",
    async (
      { product_name, dispute_reason, seller_id, email, phone, token}: CreateDisputeProps,
      thunkAPI
    ) => {
      try {
        return await DisputeService.createDispute({
            product_name, dispute_reason, seller_id, email, phone, token
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
  
  export const createDispute = createSlice({
    name: "createDispute",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.dispute = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createDisputeAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(createDisputeAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.dispute = action.payload.dispute;
          state.message = action.payload.status;
        })
        .addCase(createDisputeAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload ? action.payload : action.error.message;
          state.dispute = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = createDispute.actions;
  
  export default createDispute.reducer;