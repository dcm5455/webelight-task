import { call, cancelled, put, takeLatest } from "redux-saga/effects";
import { repoActions } from "../slice/repository";
import { CHANGE_DURATION, FETCH_REPOS } from "../type/typerepo";
import { fetchRepoApi } from "../apis";
import moment from "moment";

function* fetchReposHandler(action) {
  const { duration, pageNumber } = action.payload;
  const abortController =
    typeof "AbortController" !== undefined && new AbortController();

  try {
    yield put(repoActions.setErrorState(false));
    yield put(repoActions.setLoadingState(true));
    let fromDate = moment().subtract(duration, "d").format("YYYY-MM-DD");
    let res = yield call(
      fetchRepoApi,
      fromDate,
      pageNumber,
      abortController.signal
    );
    yield put(repoActions.setRepos(res.data.items));
    yield put(repoActions.setLoadingState(false));
    yield put(repoActions.setHasMore(res.data.items.length > 0));
  } catch (error) {
    yield put(repoActions.setLoadingState(false));
    yield put(repoActions.setErrorState(true));
  } finally {
    if (yield cancelled() && abortController) abortController.abort();
  }
}

function* changeDurationHandler(action) {
  const abortController =
    typeof "AbortController" !== undefined && new AbortController();

  try {
    yield put(repoActions.setErrorState(false));
    yield put(repoActions.changeDuration(action.payload));
    yield put(repoActions.resetRepos());
    yield put(repoActions.setLoadingState(true));
    let fromDate = moment().subtract(action.payload, "d").format("YYYY-MM-DD");
    let res = yield call(fetchRepoApi, fromDate, 1, abortController.signal);
    yield put(repoActions.setRepos(res.data.items));
    yield put(repoActions.setLoadingState(false));
    yield put(repoActions.setHasMore(res.data.items.length > 0));
  } catch (error) {
    yield put(repoActions.setLoadingState(false));
    yield put(repoActions.setErrorState(true));
  } finally {
    if (yield cancelled() && abortController) abortController.abort();
  }
}

export function* repoSaga() {
  yield takeLatest(FETCH_REPOS, fetchReposHandler);
  yield takeLatest(CHANGE_DURATION, changeDurationHandler);
}
