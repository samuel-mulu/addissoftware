const BASE_URL = process.env.REACT_APP_API_BASE_URL as string; // CRA uses REACT_APP_ prefix

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Something went wrong');
  }
  return await response.json();
};

export const getSongs = async () => {
  try {
    const response = await fetch(BASE_URL);
    return await handleResponse(response);
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('Unknown error occurred while fetching songs');
  }
};

export const createSong = async (song: { title: string; artist: string; album: string; genre: string }) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    });
    return await handleResponse(response);
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('Unknown error occurred while creating a song');
  }
};

export const updateSong = async (
  id: string,
  song: { title: string; artist: string; album: string; genre: string }
) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(song),
    });
    return await handleResponse(response);
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('Unknown error occurred while updating the song');
  }
};

export const deleteSong = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(response);
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error('Unknown error occurred while deleting the song');
  }
};
