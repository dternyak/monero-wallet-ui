import { delay } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

import { tickClock } from './actions';
import types from './types';

function* runClockSaga() {
  yield take(types.START_CLOCK);
  while (true) {
    yield put(
      tickClock({
        lastUpdate: Date.now()
      })
    );
    yield call(delay, 800);
  }
}

export default call(runClockSaga);
