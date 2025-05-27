// src/redux/stats/statsSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface StatsState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  data: null,
  loading: false,
  error: null,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    fetchStatsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStatsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStatsRequest, fetchStatsSuccess, fetchStatsFailure } = statsSlice.actions;
export default statsSlice.reducer;
