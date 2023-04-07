import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import CaptionService,{ CaptionProps }  from './captionService'



  
  const initialState: any = {
    caption: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER Caption
export const getCaptionAction = createAsyncThunk(
    "/getCaptionAction",
    async ({id,token}:CaptionProps, thunkAPI: any,
    ) => {
      try {
        return await CaptionService.getCaption({id, token});
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
  
  export const getCaptionSlice = createSlice({
    name: "getCaption",
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
        .addCase(getCaptionAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getCaptionAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.caption = action.payload.caption;
        })
        .addCase(getCaptionAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something went wrong";
          state.caption = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getCaptionSlice.actions;
  
  export default getCaptionSlice.reducer;