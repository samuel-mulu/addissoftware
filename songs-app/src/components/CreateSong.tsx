/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';

// Props
interface CreateSongProps {
  onAddSong: (newSong: any) => void;
}

// Component
const CreateSong: React.FC<CreateSongProps> = ({ onAddSong }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/songs', {
        title,
        artist,
        album,
        genre,
      });
      onAddSong(data);
      setTitle('');
      setArtist('');
      setAlbum('');
      setGenre('');
    } catch (error) {
      console.error('❌ Failed to create song:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form css={formStyle} onSubmit={handleSubmit}>
      <h2>Create New Song</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="🎵 Song Title"
        required
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="🎤 Artist"
        required
      />
      <input
        type="text"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
        placeholder="💿 Album"
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="🎧 Genre"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Song'}
      </button>
    </form>
  );
};

export default CreateSong;

// Emotion CSS styles
const formStyle = css`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    color: #333;
  }

  input {
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    font-size: 1rem;
    outline: none;
    transition: border 0.2s ease;

    &:focus {
      border-color: #0070f3;
    }
  }

  button {
    background-color: #0070f3;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background-color: #0059c9;
    }

    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  }
`;
