import React from 'react';
import styled from '@emotion/styled';

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

interface SongCardProps {
  song: {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
  };
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  return (
    <Card>
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
      <p>{song.album}</p>
      <p>{song.genre}</p>
    </Card>
  );
};

export default SongCard;
