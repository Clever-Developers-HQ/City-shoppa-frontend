import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import CaptionService from './captionService'



  const initialState: any = {
    captions: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER Caption
export const getCaptionsAction = createAsyncThunk(
    "/getCaptionsAction",
    async (
    token:string,
      thunkAPI: any,
    ) => {
      try {
        return await CaptionService.getCaptions(token);
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          if (message === "Request failed with status code 401" ) {
            toast.error(`Unauthorized Access`);
            window.location.href = '/login'
            return
          }
        toast.warning(`${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  export const getCaptionsSlice = createSlice({
    name: "getCaptions",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.Captions = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getCaptionsAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getCaptionsAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.captions = action.payload.caption;
        })
        .addCase(getCaptionsAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.captions = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getCaptionsSlice.actions;
  
  export default getCaptionsSlice.reducer;