// redux/sagas/statsSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchStatsFailure,
} from './statsSlice';

function* fetchStatsSaga(): any {
  try {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    const response = yield call(axios.get, `${API_BASE_URL}/stats/summary`);
    yield put(fetchStatsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchStatsFailure(error.message || 'Failed to fetch statistics'));
  }
}

export default function* watchStatsSaga() {
  yield takeLatest(fetchStatsRequest.type, fetchStatsSaga);
}
