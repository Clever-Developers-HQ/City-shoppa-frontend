import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Captionervice,{ CaptionProps, UpdateCaptionProps }  from './captionService'



  
  const initialState: any = {
    caption: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER Caption
export const updateCaptionAction = createAsyncThunk(
    "/updateCaptionAction",
    async ({id,token, data}:UpdateCaptionProps, thunkAPI: any,
    ) => {
      try {
        return await Captionervice.updateCaption({id, token, data});
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
  
  export const updateCaptionSlice = createSlice({
    name: "updateCaption",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.Caption = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateCaptionAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateCaptionAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.Caption = action.payload.Caption;
        })
        .addCase(updateCaptionAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something went wrong";
          state.Caption = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = updateCaptionSlice.actions;
  
  export default updateCaptionSlice.reducer;