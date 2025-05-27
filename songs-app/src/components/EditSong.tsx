import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSongRequest } from '../redux/songsSagaActions';

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const EditSong = ({ song, onUpdate }: { song: Song; onUpdate: (s: Song) => void }) => {
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);
  const [album, setAlbum] = useState(song.album);
  const [genre, setGenre] = useState(song.genre);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(song.title);
    setArtist(song.artist);
    setAlbum(song.album);
    setGenre(song.genre);
  }, [song]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...song, title, artist, album, genre };
    dispatch(updateSongRequest(updated));
    onUpdate(updated); // local optimistic update
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={artist} onChange={(e) => setArtist(e.target.value)} />
      <input value={album} onChange={(e) => setAlbum(e.target.value)} />
      <input value={genre} onChange={(e) => setGenre(e.target.value)} />
      <button type="submit">Update Song</button>
    </form>
  );
};

export default EditSong;
