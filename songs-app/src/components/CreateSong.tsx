/** @jsxImportSource @emotion/react */
import React from 'react';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { createSongRequest } from '../redux/songsSagaActions';
import { AppDispatch } from '../redux/store';

interface CreateSongProps {
  onAddSong: () => void;
}

const CreateSong: React.FC<CreateSongProps> = ({ onAddSong }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    const song = {
      title: data.get('title') as string,
      artist: data.get('artist') as string,
      album: data.get('album') as string,
      genre: data.get('genre') as string,
    };

    dispatch(createSongRequest(song));
    onAddSong();
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} css={formStyle}>
      <h2>Add New Song</h2>
      <input name="title" placeholder="Title" required />
      <input name="artist" placeholder="Artist" required />
      <input name="album" placeholder="Album" required />
      <input name="genre" placeholder="Genre" required />
      <button type="submit">Add Song</button>
    </form>
  );
};

export default CreateSong;

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
