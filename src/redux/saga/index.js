import { all } from "redux-saga/effects";
import { repoSaga } from "./sagar_repo";
import { activitySaga } from "./saga_activity";

export default function* rootSaga() {
  yield all([repoSaga(), activitySaga()]);
}
