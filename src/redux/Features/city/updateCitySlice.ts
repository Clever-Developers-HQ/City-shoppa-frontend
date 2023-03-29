import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import cityService,{ UpdateCityProps }  from './cityServices'

  
  const initialState: any = {
    city: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const updateCityAction = createAsyncThunk(
    "/updateCityAction",
    async ({id, token, street, province,  name}:UpdateCityProps, thunkAPI: any,
    ) => {
      try {
        return await cityService.updateCity({id, token,  name, street, province});
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
  
  export const updateCitySlice = createSlice({
    name: "updateCity",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.city = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateCityAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateCityAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.city = action.payload.city;
          state.message = action.payload.status;
        })
        .addCase(updateCityAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something went wrong";
          state.city = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = updateCitySlice.actions;
  
  export default updateCitySlice.reducer;