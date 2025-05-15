// src/services/songService.ts
const BASE_URL = 'http://localhost:5000/api/songs'; // Replace with your actual backend API URL

export const getSongs = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch songs');
    return await response.json();
  } catch (error: unknown) {
    // Check if error is an instance of Error before accessing its properties
    if (error instanceof Error) {
      throw new Error(error.message || 'Something went wrong');
    } else {
      throw new Error('Something went wrong');
    }
  }
};

export const createSong = async (song: { title: string; artist: string; album: string; genre: string }) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    });
    if (!response.ok) throw new Error('Failed to create song');
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Something went wrong');
    } else {
      throw new Error('Something went wrong');
    }
  }
};

export const updateSong = async (id: string, song: { title: string; artist: string; album: string; genre: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    });
    if (!response.ok) throw new Error('Failed to update song');
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Something went wrong');
    } else {
      throw new Error('Something went wrong');
    }
  }
};

export const deleteSong = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete song');
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'Something went wrong');
    } else {
      throw new Error('Something went wrong');
    }
  }
};
