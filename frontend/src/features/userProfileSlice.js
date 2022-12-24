import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (token) => {
    console.log(token);
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/user_profile/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data);
    return data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "userProfile/updateUserProfile",
  async (temp) => {
    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/user_profile/`,
      temp.data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${temp.token}`,
        },
      }
    );
    console.log(data);
    return data;
  }
);

const initialState = {
  userLoading: false,
  user: {},
  userMessage: "",
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state) => {
      state.userLoading = true;
      state.user = {};
      state.userMessage = "";
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userLoading = false;
      state.user = action.payload;
      state.userMessage = "";
    });
    builder.addCase(fetchUserProfile.rejected, (state) => {
      state.userLoading = false;
      state.user = {};
      state.userMessage = "User Error";
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.userLoading = true;
      state.user = {};
      state.userMessage = "";
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.userLoading = false;
      state.user = action.payload;
      state.userMessage = "";
    });
    builder.addCase(updateUserProfile.rejected, (state) => {
      state.userLoading = false;
      state.user = {};
      state.userMessage = "User Error";
    });
  },
});

// Action creators are generated for each case reducer function
export const userProfileActions = userProfileSlice.actions;

export default userProfileSlice.reducer;
