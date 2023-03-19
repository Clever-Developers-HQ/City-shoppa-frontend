import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import captionService from './captionService'
import { CreateCaptionProps } from "./captionService";


  const initialState: any = {
    caption: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


//create Caption
export const createCaptionAction = createAsyncThunk(
    "/createCaptionAction",
    async (
      { sub_heading, heading, image, token}: CreateCaptionProps,
      thunkAPI
    ) => {
      try {
        return await captionService.createCaption({
            sub_heading, heading, image, token
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
  
  export const createCaption = createSlice({
    name: "createCaption",
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
        .addCase(createCaptionAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(createCaptionAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.caption = action.payload.Caption;
          state.message = action.payload.status;
        })
        .addCase(createCaptionAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.caption = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = createCaption.actions;
  
  export default createCaption.reducer;