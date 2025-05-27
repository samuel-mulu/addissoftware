import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  FETCH_SONGS_REQUEST,
  DELETE_SONG_REQUEST,
  CREATE_SONG_REQUEST,
  UPDATE_SONG_REQUEST,
} from './songsSagaActions';
import {
  setSongs, setError, setLoading, deleteSong, addSong, updateSong,
} from './songsSlice';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:10000/api/songs';

function* fetchSongsSaga(): Generator<any, void, any> {
  try {
    yield put(setLoading(true));
    const res = yield call(fetch, API_URL);
    const data = yield res.json();
    yield put(setSongs(data));
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to fetch songs'));
  } finally {
    yield put(setLoading(false));
  }
}

function* deleteSongSaga(action: any): Generator<any, void, any> {
  try {
    const id = action.payload;
    yield call(fetch, `${API_URL}/${id}`, { method: 'DELETE' });
    yield put(deleteSong(id));
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to delete song'));
  }
}

function* createSongSaga(action: any): Generator<any, void, any> {
  try {
    const song = action.payload;
    const res = yield call(fetch, API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    });
    const data = yield res.json();
    yield put(addSong(data));
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to create song'));
  }
}

function* updateSongSaga(action: any): Generator<any, void, any> {
  try {
    const song = action.payload;
    const res = yield call(fetch, `${API_URL}/${song._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    });
    const data = yield res.json();
    yield put(updateSong(data));
  } catch (error: any) {
    yield put(setError(error.message || 'Failed to update song'));
  }
}

export function* songsSaga() {
  yield all([
    takeLatest(FETCH_SONGS_REQUEST, fetchSongsSaga),
    takeLatest(DELETE_SONG_REQUEST, deleteSongSaga),
    takeLatest(CREATE_SONG_REQUEST, createSongSaga),
    takeLatest(UPDATE_SONG_REQUEST, updateSongSaga),
  ]);
}
