import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Captionervice,{ CaptionProps }  from './captionService'



  
  const initialState: any = {
    caption: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER Caption
export const deleteCaptionAction = createAsyncThunk(
    "/deleteCaptionAction",
    async ({id,token}:CaptionProps, thunkAPI: any,
    ) => {
      try {
        return await Captionervice.deleteCaption({id, token});
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
  
  export const deleteCaptionSlice = createSlice({
    name: "deleteCaption",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.caption = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(deleteCaptionAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteCaptionAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.caption = action.payload.message;
        })
        .addCase(deleteCaptionAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something Went Wrong";
          state.caption = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = deleteCaptionSlice.actions;
  
  export default deleteCaptionSlice.reducer;