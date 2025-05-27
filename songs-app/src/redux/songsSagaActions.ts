export const FETCH_SONGS_REQUEST = 'FETCH_SONGS_REQUEST';
export const DELETE_SONG_REQUEST = 'DELETE_SONG_REQUEST';
export const CREATE_SONG_REQUEST = 'CREATE_SONG_REQUEST';
export const UPDATE_SONG_REQUEST = 'UPDATE_SONG_REQUEST';

export const fetchSongsRequest = () => ({ type: FETCH_SONGS_REQUEST });
export const deleteSongRequest = (id: string) => ({ type: DELETE_SONG_REQUEST, payload: id });
export const createSongRequest = (song: any) => ({ type: CREATE_SONG_REQUEST, payload: song });
export const updateSongRequest = (song: any) => ({ type: UPDATE_SONG_REQUEST, payload: song });
