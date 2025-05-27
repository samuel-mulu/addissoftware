// components/SongForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSong } from '../redux/songsSlice';
import axios from 'axios';
import styled from '@emotion/styled';
import { space, layout, typography, border, color, flexbox } from 'styled-system';
import { CREATE_SONG_REQUEST } from '../redux/songsSagaActions';

// Styled Components
const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  max-width: 500px;
  margin: 32px auto;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
`;

const Input = styled('input')(
  {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    outline: 'none',
    fontSize: '15px',
    color: '#111827',
    transition: 'border-color 0.3s ease, box-shadow 0.2s ease-in-out',
    '&:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
    },
    '::placeholder': {
      color: '#9ca3af',
    },
  },
  space,
  layout,
  typography,
  border,
  color
);

const Button = styled('button')(
  {
    padding: '12px 16px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '15px',
    color: '#ffffff',
    backgroundColor: '#3b82f6',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
  space,
  layout,
  typography,
  color
);

const SongForm = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !artist || !album || !genre) {
      alert('All fields are required!');
      return;
    }

    const newSong = { title, artist, album, genre };
    
    // Dispatch an action that saga will handle
    dispatch({ type: CREATE_SONG_REQUEST, payload: newSong });

    // Clear form
    setTitle('');
    setArtist('');
    setAlbum('');
    setGenre('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setTitle(e.target.value)}
        placeholder="🎵 Song Title (e.g. Blinding Lights)"
      />
      <Input
        type="text"
        value={artist}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setArtist(e.target.value)}
        placeholder="🎤 Artist Name (e.g. The Weeknd)"
      />
      <Input
        type="text"
        value={album}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setAlbum(e.target.value)}
        placeholder="💿 Album Name (e.g. After Hours)"
      />
      <Input
        type="text"
        value={genre}
        onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setGenre(e.target.value)}
        placeholder="🎧 Genre (e.g. Synth-pop)"
      />
      <Button type="submit">➕ Add Song</Button>
    </Form>
  );
};

export default SongForm;
