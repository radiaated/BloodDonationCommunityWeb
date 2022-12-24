import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const requestBlood = createAsyncThunk(
  "request/requestBlood",
  async (temp) => {
    console.log(temp);
    const { data } = await axios.post(
      `http://127.0.0.1:8000/api/request/user/${temp.id}/`,
      temp,
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

export const fetchRequestDetail = createAsyncThunk(
  "request/fetchRequestDetail",
  async (temp) => {
    console.log(temp);
    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/request/${temp.id}/`,
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

export const updateRequestDetail = createAsyncThunk(
  "request/updateRequestDetail",
  async (temp) => {
    console.log(temp);
    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/request/${temp.id}/`,
      { type: temp.type },
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

export const fetchRequestUser = createAsyncThunk(
  "request/fetchRequestUser",
  async (token) => {
    const { data } = await axios.get(`http://127.0.0.1:8000/api/requests/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);

    return data;
  }
);

const initialState = {
  requestLoading: false,
  requests: [],
  request: {},
  requestMessage: "",
};

export const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestBlood.pending, (state) => {
      state.requestLoading = true;
      state.request = {};
      state.requestMessage = "";
    });
    builder.addCase(requestBlood.fulfilled, (state, action) => {
      state.requestLoading = false;
      state.request = action.payload;
      state.requestMessage = "";
    });
    builder.addCase(requestBlood.rejected, (state) => {
      state.requestLoading = false;
      state.request = {};
      state.requestMessage = "Request Error";
    });
    builder.addCase(fetchRequestDetail.pending, (state) => {
      state.requestLoading = true;
      state.request = {};
      state.requestMessage = "";
    });
    builder.addCase(fetchRequestDetail.fulfilled, (state, action) => {
      state.requestLoading = false;
      state.request = action.payload;
      console.log(action.payload.blood_asker.phone);
      state.requestMessage = "";
    });
    builder.addCase(fetchRequestDetail.rejected, (state) => {
      state.requestLoading = false;
      state.request = {};
      state.requestMessage = "Request Detail Error";
    });
    builder.addCase(fetchRequestUser.pending, (state) => {
      state.requestLoading = true;
      state.requests = [];
      state.requestMessage = "";
    });
    builder.addCase(fetchRequestUser.fulfilled, (state, action) => {
      state.requestLoading = false;
      state.requests = action.payload;
      // console.log(action.payload.blood_asker.phone);
      state.requestMessage = "";
    });
    builder.addCase(fetchRequestUser.rejected, (state) => {
      state.requestLoading = false;
      state.requests = [];
      state.requestMessage = "Request Detail Error";
    });
    builder.addCase(updateRequestDetail.pending, (state) => {
      state.requestLoading = true;
      state.request = {};
      state.requestMessage = "";
    });
    builder.addCase(updateRequestDetail.fulfilled, (state, action) => {
      state.requestLoading = false;
      state.request = action.payload;
      // console.log(action.payload.blood_asker.phone);
      state.requestMessage = "";
    });
    builder.addCase(updateRequestDetail.rejected, (state) => {
      state.requestLoading = false;
      state.request = {};
      state.requestMessage = "Request Detail Error";
    });
  },
});

// Action creators are generated for each case reducer function
export const reqeustActions = requestSlice.actions;

export default requestSlice.reducer;
