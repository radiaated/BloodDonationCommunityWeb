import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchViewUser = createAsyncThunk(
  "viewUser/fetchViewUser",
  async (id) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/user/${id}/`);
    console.log(data);
    return data;
  }
);

const initialState = {
  viewUserLoading: false,
  viewUser: {},
  viewUserMessage: "",
};

export const viewUserSlice = createSlice({
  name: "viewUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchViewUser.pending, (state) => {
      state.viewUserLoading = true;
      state.viewUser = {};
      state.viewUserMessage = "";
    });
    builder.addCase(fetchViewUser.fulfilled, (state, action) => {
      state.viewUserLoading = false;
      state.viewUser = action.payload;
      state.viewUserMessage = "";
    });
    builder.addCase(fetchViewUser.rejected, (state) => {
      state.viewUserLoading = false;
      state.viewUser = {};
      state.viewUserMessage = "User Error";
    });
  },
});

// Action creators are generated for each case reducer function
export const viewUserActions = viewUserSlice.actions;

export default viewUserSlice.reducer;
