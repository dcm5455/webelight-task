import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  duration: 7,
  repos: [],
  hasMore: false,
  loadingState: false,
  successState: false,
  errorState: false
};

const repoSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    changeDuration: (state, action) => {
      state.duration = action.payload;
    },
    setLoadingState: (state, action) => {
      state.loadingState = action.payload;
    },
    setSuccessState: (state, action) => {
      state.successState = action.payload;
    },
    setErrorState: (state, action) => {
      state.errorState = action.payload;
    },
    resetRepos: (state, action) => {
      state.repos = [];
    },
    setRepos: (state, action) => {
      state.repos = [...state.repos, ...action.payload];
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    }
  }
});

export const repoActions = repoSlice.actions;
export default repoSlice.reducer;
