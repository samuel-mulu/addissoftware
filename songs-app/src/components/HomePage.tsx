/** @jsxImportSource @emotion/react */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { space, layout, typography, color, flexbox } from 'styled-system';
import SongList from './SongList';

// Wrapper for the whole page
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f8ff, #e6f7ff);
  ${space}
  ${layout}
`;

// Heading with animation
const AnimatedHeading = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(to right, #007cf0, #00dfd8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeIn 1s ease-in;

  @keyframes fadeIn {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// Styled Button with hover effect
const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 114, 255, 0.3);
  }
`;

const SectionWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  ${layout}
`;

const HomePage = () => {
  return (
    <PageWrapper>
        <SectionWrapper>
        <AnimatedHeading>🎶 Song List</AnimatedHeading>
        <SongList />
      </SectionWrapper>
      <AnimatedHeading>🎵 Welcome to Song Management</AnimatedHeading>

      <Link to="/statistics">
        <ActionButton>📊 View Statistics</ActionButton>
      </Link>

      
    </PageWrapper>
  );
};

export default HomePage;
