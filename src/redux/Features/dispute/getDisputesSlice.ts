import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import disputeService from './disputeService'



  const initialState: any = {
    disputes: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER Dispute
export const getDisputesAction = createAsyncThunk(
    "/getDisputesAction",
    async (
    token:string,
      thunkAPI: any,
    ) => {
      try {
        return await disputeService.getDisputes(token);
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
  
  export const getDisputesSlice = createSlice({
    name: "getDisputes",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.disputes = null;

      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getDisputesAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getDisputesAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.disputes = action.payload.responses;
        })
        .addCase(getDisputesAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.disputes = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getDisputesSlice.actions;
  
  export default getDisputesSlice.reducer;