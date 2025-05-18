import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSongs, setLoading, setError } from '../redux/songsSlice';
import { AppDispatch, RootState } from '../redux/store';
import axios from 'axios';
import styled from '@emotion/styled';
import { space, layout, typography, border, color } from 'styled-system';
import EditSong from './EditSong';
import CreateSong from './CreateSong';

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

// Styled Components
const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f9fafb;
`;

const Card = styled('div')`
  background-color: white;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SongInfo = styled('div')`
  font-size: 14px;
  color: #4b5563;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const SongLabel = styled('span')`
  font-weight: bold;
`;

const Button = styled('button')(
  {
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2563eb',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#1d4ed8',
    },
  },
  space,
  layout,
  typography,
  border,
  color
);

const SearchBarContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  flex: 1;
  font-size: 1rem;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
  font-weight: bold;
`;

const SongList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);

  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchFilter, setSearchFilter] = useState<'title' | 'artist' | 'album' | 'genre'>('title');
  const [searchTerm, setSearchTerm] = useState('');

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  if (!API_BASE_URL) {
    throw new Error('REACT_APP_API_BASE_URL is missing. Check your .env file or Netlify environment variables.');
  }

  const handleAddSong = (newSong: Song) => {
    dispatch(setSongs([...songs, newSong]));
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      dispatch(setSongs(songs.filter((song) => song._id !== id)));
    } catch (error) {
      dispatch(setError('Failed to delete song'));
    }
  };

  const handleUpdate = (song: Song) => {
    setEditingSong(song);
  };

  const handleUpdateComplete = (updatedSong: Song) => {
    const updatedSongs = songs.map((song) =>
      song._id === updatedSong._id ? updatedSong : song
    );
    dispatch(setSongs(updatedSongs));
    setEditingSong(null);
  };
  

  const fetchSongs = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${API_BASE_URL}`);
      const data = await response.json();
      dispatch(setSongs(data));
    } catch (error) {
      dispatch(setError('Failed to fetch songs'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [dispatch]);

  const toggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  const filteredSongs = songs.filter((song) => {
    const fieldValue = song[searchFilter]?.toLowerCase() || '';
    return fieldValue.includes(searchTerm.toLowerCase());
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      {editingSong && <EditSong song={editingSong} onUpdate={handleUpdateComplete} />}

      <Button onClick={toggleCreateForm}>
        {showCreateForm ? 'Hide Form' : 'Add New Song'}
      </Button>

      {showCreateForm && <CreateSong onAddSong={handleAddSong} />}

      {/* Search Bar */}
      <SearchBarContainer>
        <Dropdown
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value as any)}
        >
          <option value="title">Title</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
          <option value="genre">Genre</option>
        </Dropdown>

        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search by ${searchFilter}`}
        />
      </SearchBarContainer>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <Card key={song._id}>
              <CardHeader>
                <div>#{index + 1}</div>
                <div>
                  <Button onClick={() => handleUpdate(song)}>Edit</Button>{' '}
                  <Button onClick={() => handleDelete(song._id)}>Delete</Button>
                </div>
              </CardHeader>
              <CardContent>
                <SongInfo>
                  <div>
                    <SongLabel>Title: </SongLabel>{song.title}
                  </div>
                  <div>
                    <SongLabel>Artist: </SongLabel>{song.artist}
                  </div>
                  <div>
                    <SongLabel>Genre: </SongLabel>{song.genre}
                  </div>
                  <div>
                    <SongLabel>Album: </SongLabel>{song.album}
                  </div>
                </SongInfo>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No songs found</div>
        )}
      </div>
    </Container>
  );
};

export default SongList;
