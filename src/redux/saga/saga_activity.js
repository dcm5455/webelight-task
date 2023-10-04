import { call, cancelled, put, takeLatest } from "redux-saga/effects";
import { FETCH_ACTIVITY_DATA } from "../type/typeactivity";
import { activityActions } from "../slice/activity";
import { fetchActivityApi } from "../apis";
import { getActivityData, getContributorsData } from "../../helper";

function* fetchActivityHandler(action) {
  const { repo, owner } = action.payload;
  const abortController =
    typeof "AbortController" !== undefined && new AbortController();

  try {
    yield put(activityActions.setErrorState(false));
    yield put(activityActions.setLoadingState(true));
    let [commit_activity, code_frequency, contributors] = yield call(
      fetchActivityApi,
      owner,
      repo,
      abortController.signal
    );
    let activityData = getActivityData(
      commit_activity.data,
      code_frequency.data
    );
    let contributorsData = getContributorsData(
      commit_activity.data,
      contributors.data
    );
    yield put(activityActions.setActivityData(activityData));
    yield put(activityActions.setContributorsData(contributorsData));
    yield put(activityActions.setLoadingState(false));
  } catch (error) {
    yield put(activityActions.setLoadingState(false));
    yield put(activityActions.setErrorState(true));
  } finally {
    if (yield cancelled() && abortController) abortController.abort();
  }
}

export function* activitySaga() {
  yield takeLatest(FETCH_ACTIVITY_DATA, fetchActivityHandler);
}
