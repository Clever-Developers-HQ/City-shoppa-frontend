import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import merchantService from './merchantService'



  const initialState: any = {
    merchants: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER MERCHANT
export const getMerchantsAction = createAsyncThunk(
    "/getMerchantsAction",
    async (
    token:string,
      thunkAPI: any,
    ) => {
      try {
        return await merchantService.getMerchants(token);
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
  
  export const getMerchantsSlice = createSlice({
    name: "getMerchants",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.merchants = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getMerchantsAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getMerchantsAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.merchants = action.payload;
        })
        .addCase(getMerchantsAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.merchants = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getMerchantsSlice.actions;
  
  export default getMerchantsSlice.reducer;