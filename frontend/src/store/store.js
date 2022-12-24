import { configureStore } from "@reduxjs/toolkit";
import viewUserReducer from "./../features/viewUserSlice";
import donorsReducer from "./../features/donorsSlice";
import requestReducer from "./../features/requestSlice";
import userProfileReducer from "./../features/userProfileSlice";

export const store = configureStore({
  reducer: {
    viewUser: viewUserReducer,
    userProfile: userProfileReducer,
    donors: donorsReducer,
    request: requestReducer,
  },
});
