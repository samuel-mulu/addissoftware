// redux/statsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface StatsState {
  loading: boolean;
  data: StatsData | null;
  error: string | null;
}

const initialState: StatsState = {
  loading: false,
  data: null,
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
    fetchStatsSuccess: (state, action: PayloadAction<StatsData>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchStatsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchStatsRequest,
  fetchStatsSuccess,
  fetchStatsFailure,
} = statsSlice.actions;

// types.ts or inside statsSlice.ts
export interface GenreStat {
  _id: string;
  count: number;
}

export interface ArtistStat {
  _id: string;
  songs: number;
}

export interface AlbumStat {
  _id: string;
  songs: number;
}

export interface StatsData {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  genreStats: GenreStat[];
  artistStats: ArtistStat[];
  albumStats: AlbumStat[];
}


export default statsSlice.reducer;
