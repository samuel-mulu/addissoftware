import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const EditSong = ({ song, onUpdate }: { song: Song; onUpdate: () => void }) => {
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);
  const [album, setAlbum] = useState(song.album);
  const [genre, setGenre] = useState(song.genre);

  useEffect(() => {
    setTitle(song.title);
    setArtist(song.artist);
    setAlbum(song.album);
    setGenre(song.genre);
  }, [song]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSong = { title, artist, album, genre };
    try {
      
      onUpdate(); // Call onUpdate after the update is successful
    } catch (error) {
      console.error('Failed to update song', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        type="text"
        value={album}
        onChange={(e) => setAlbum(e.target.value)}
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button type="submit">Update Song</button>
    </form>
  );
};

export default EditSong;
