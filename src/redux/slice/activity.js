import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentExpanded: null,
  activityData: [],
  contributorsData: [],
  loadingState: false,
  successState: false,
  errorState: false
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setLoadingState: (state, action) => {
      state.loadingState = action.payload;
    },
    setSuccessState: (state, action) => {
      state.successState = action.payload;
    },
    setErrorState: (state, action) => {
      state.errorState = action.payload;
    },
    setActivityData: (state, action) => {
      state.activityData = [...action.payload];
    },
    setContributorsData: (state, action) => {
      state.contributorsData = [...action.payload];
    },
    setCurrentExpanded: (state, action) => {
      state.currentExpanded = action.payload;
    }
  }
});

export const activityActions = activitySlice.actions;
export default activitySlice.reducer;
