import { all } from 'redux-saga/effects';
import { clockSagas } from 'modules/clock';

export default function* rootSaga() {
  yield all([clockSagas]);
}
