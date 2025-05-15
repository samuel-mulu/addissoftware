// redux/songsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store'; // Import AppDispatch to type the dispatch function

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}


interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
    },
    addSong(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload); // Adds a new song to the state
    },
    updateSong(state, action: PayloadAction<Song>) {
      const index = state.songs.findIndex((song) => song._id === action.payload._id);
      if (index !== -1) {
        state.songs[index] = action.payload; // Update existing song
      }
    },
    deleteSong(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter((song) => song._id !== action.payload); // Remove song by id
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setSongs, addSong, updateSong, deleteSong, setLoading, setError } = songsSlice.actions;

export default songsSlice.reducer;
