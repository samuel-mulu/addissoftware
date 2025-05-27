import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchSongsRequest, deleteSongRequest } from '../redux/songsSagaActions';
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

// Styled components (same as before, unchanged)
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
  flex-wrap: wrap;
  gap: 1rem;
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

const PaginationControls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const SongList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { songs, loading, error } = useSelector((state: RootState) => state.songs);

  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchFilter, setSearchFilter] = useState<'title' | 'artist' | 'album' | 'genre'>('title');
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [albumFilter, setAlbumFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<'title' | 'artist' | 'album' | 'genre'>('title');

  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchSongsRequest());
    const interval = setInterval(() => dispatch(fetchSongsRequest()), 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteSongRequest(id));
  };

  const filteredSongs = songs
    .filter((s) => {
      const matchSearch = s[searchFilter]?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchGenre = genreFilter ? s.genre === genreFilter : true;
      const matchAlbum = albumFilter ? s.album === albumFilter : true;
      return matchSearch && matchGenre && matchAlbum;
    })
    .sort((a, b) => a[sortField].localeCompare(b[sortField]));

  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
  const paginatedSongs = filteredSongs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const clearFilters = () => {
    setSearchTerm('');
    setGenreFilter('');
    setAlbumFilter('');
  };

  const uniqueAlbums = Array.from(new Set(songs.map((s) => s.album)));
  const uniqueGenres = Array.from(new Set(songs.map((s) => s.genre)));

  return (
    <Container>
      {editingSong && <EditSong song={editingSong} onUpdate={() => setEditingSong(null)} />}
      <Button onClick={() => setShowCreateForm((prev) => !prev)}>
        {showCreateForm ? 'Hide Form' : 'Add New Song'}
      </Button>
      {showCreateForm && <CreateSong onAddSong={() => dispatch(fetchSongsRequest())} />}

      <SearchBarContainer>
        <Dropdown value={searchFilter} onChange={(e) => setSearchFilter(e.target.value as any)}>
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
        <Dropdown value={albumFilter} onChange={(e) => setAlbumFilter(e.target.value)}>
          <option value="">All Albums</option>
          {uniqueAlbums.map((album) => (
            <option key={album} value={album}>{album}</option>
          ))}
        </Dropdown>
        <Dropdown value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
          <option value="">All Genres</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </Dropdown>
        <Button onClick={clearFilters}>Clear Filters</Button>
        <Dropdown value={sortField} onChange={(e) => setSortField(e.target.value as any)}>
          <option value="title">Sort by Title</option>
          <option value="artist">Sort by Artist</option>
          <option value="album">Sort by Album</option>
          <option value="genre">Sort by Genre</option>
        </Dropdown>
      </SearchBarContainer>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedSongs.length > 0 ? (
          paginatedSongs.map((song, index) => (
            <Card key={song._id}>
              <CardHeader>
                <div>#{index + 1 + (currentPage - 1) * itemsPerPage}</div>
                <div>
                  <Button onClick={() => setEditingSong(song)}>Edit</Button>{' '}
                  <Button onClick={() => handleDelete(song._id)}>Delete</Button>
                </div>
              </CardHeader>
              <CardContent>
                <SongInfo>
                  <div><SongLabel>Title:</SongLabel> {song.title}</div>
                  <div><SongLabel>Artist:</SongLabel> {song.artist}</div>
                  <div><SongLabel>Album:</SongLabel> {song.album}</div>
                  <div><SongLabel>Genre:</SongLabel> {song.genre}</div>
                </SongInfo>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No songs found</div>
        )}
      </div>

      <PaginationControls>
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>Next</Button>
      </PaginationControls>
    </Container>
  );
};

export default SongList;
