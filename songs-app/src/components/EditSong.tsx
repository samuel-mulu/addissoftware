import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const Form = styled.form`
  max-width: 500px;
  margin: 1.5rem auto;
  padding: 1.5rem;
  border-radius: 12px;
  background: #f4f4f4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #1e40af;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 0.875rem;
  text-align: center;
`;

const EditSong: React.FC<{ song: Song; onUpdate: () => void }> = ({ song, onUpdate }) => {
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);
  const [album, setAlbum] = useState(song.album);
  const [genre, setGenre] = useState(song.genre);
  const [error, setError] = useState('');

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    setTitle(song.title);
    setArtist(song.artist);
    setAlbum(song.album);
    setGenre(song.genre);
  }, [song]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/api/songs/${song._id}`, {
        title,
        artist,
        album,
        genre,
      });
      onUpdate(); // refresh song list
    } catch (err) {
      setError('Failed to update song.');
      console.error('❌ Update Error:', err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Edit Song</h2>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <Input value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist" />
      <Input value={album} onChange={(e) => setAlbum(e.target.value)} placeholder="Album" />
      <Input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
      {error && <Error>{error}</Error>}
      <Button type="submit">Update Song</Button>
    </Form>
  );
};

export default EditSong;
