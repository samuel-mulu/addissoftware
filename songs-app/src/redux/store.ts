// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from './songsSlice';
import { songsSaga } from './songsSaga';
import statsReducer from './statsSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(songsSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
