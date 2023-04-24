import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import disputeService,{ DisputeProps }  from './disputeService'

  
  const initialState: any = {
    dispute: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const updateDisputeAction = createAsyncThunk(
    "/updateDisputeAction",
    async ({id, token}: DisputeProps, thunkAPI: any,
    ) => {
      try {
        return await disputeService.updateDispute({id, token});
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
  
  export const updateDisputeSlice = createSlice({
    name: "updateDispute",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.Dispute = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateDisputeAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateDisputeAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.Dispute = action.payload.dispute;
          state.message = "Dispute Updated Successfully";
        })
        .addCase(updateDisputeAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something went wrong";
          state.Dispute = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = updateDisputeSlice.actions;
  
  export default updateDisputeSlice.reducer;