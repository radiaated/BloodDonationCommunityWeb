import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDonors = createAsyncThunk(
  "donors/fetchDonors",
  async (type) => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/donors/${type}/`
    );

    console.log(data);

    return data;
  }
);

const initialState = {
  donorsLoading: false,
  donors: [],
  donorsMessage: "",
};

export const donorsSlice = createSlice({
  name: "donors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDonors.pending, (state) => {
      state.donorsLoading = true;
      state.donors = {};
      state.donorsMessage = "";
    });
    builder.addCase(fetchDonors.fulfilled, (state, action) => {
      state.donorsLoading = false;
      state.donors = action.payload;
      state.donorsMessage = "";
    });
    builder.addCase(fetchDonors.rejected, (state) => {
      state.donorsLoading = false;
      state.donors = {};
      state.donorsMessage = "Donors Error";
    });
  },
});

// Action creators are generated for each case reducer function
export const donorsActions = donorsSlice.actions;

export default donorsSlice.reducer;
