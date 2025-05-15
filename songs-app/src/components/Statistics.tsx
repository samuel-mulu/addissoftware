import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

interface GenreStat {
  _id: string;
  count: number;
}

interface ArtistStat {
  _id: string;
  songs: number;
  albums?: number;
}

interface AlbumStat {
  _id: string;
  songs: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const capitalize = (name: string) =>
  name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const Statistics = () => {
  const [stats, setStats] = useState<any>(null);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');
  const [activeModal, setActiveModal] = useState<null | 'songs' | 'artists' | 'albums' | 'genres'>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/songs/stats/summary');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch statistics', error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Loading statistics...</div>;

  const filteredArtistStats = selectedArtist
    ? (stats.artistStats ?? []).filter((a: ArtistStat) => a._id === selectedArtist)
    : (stats.artistStats ?? []);

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.homeButton}>
        Back to Home
      </button>

      <p style={{ fontWeight: 'bold', marginBottom: 10 }}>To display the detail click:</p>

      {/* Summary Cards */}
      <div style={styles.cardGrid}>
        <Card label="Total Songs" value={stats.totalSongs} onClick={() => setActiveModal('songs')} />
        <Card label="Total Artists" value={stats.totalArtists} onClick={() => setActiveModal('artists')} />
        <Card label="Total Albums" value={stats.totalAlbums} onClick={() => setActiveModal('albums')} />
        <Card label="Total Genres" value={stats.totalGenres} onClick={() => setActiveModal('genres')} />
      </div>

      {/* Modal */}
      {activeModal && (
        <div style={styles.modalOverlay} onClick={() => setActiveModal(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={() => setActiveModal(null)}>
              &times;
            </button>
            <h2>Detailed Statistics</h2>

            {activeModal === 'songs' && (
              <>
                <h4>Total Songs:</h4>
                <p>{stats.totalSongs} songs available in the database.</p>
              </>
            )}

            {activeModal === 'genres' && (
              <>
                <h4># of Songs in Every Genre:</h4>
                <ul>
                  {(stats.genreStats ?? []).map((genre: GenreStat) => (
                    <li key={genre._id}>
                      {capitalize(genre._id)}: {genre.count} song{genre.count !== 1 ? 's' : ''}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {activeModal === 'artists' && (
              <>
                <h4># of Songs & Albums Each Artist Has:</h4>
                <ul>
                  {(stats.artistStats ?? []).map((artist: ArtistStat) => (
                    <li key={artist._id}>
                      {capitalize(artist._id)}: {artist.songs} song{artist.songs !== 1 ? 's' : ''}, {artist.albums ?? 0} album{(artist.albums ?? 0) !== 1 ? 's' : ''}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {activeModal === 'albums' && (
              <>
                <h4># of Songs in Each Album:</h4>
                <ul>
                  {(stats.albumStats ?? []).map((album: AlbumStat) => (
                    <li key={album._id}>
                      {capitalize(album._id)}: {album.songs} song{album.songs !== 1 ? 's' : ''}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      {/* Chart Toggle */}
      <div style={styles.toggleButtons}>
        <button
          style={{
            ...styles.toggleButton,
            backgroundColor: chartType === 'pie' ? '#007bff' : '#e0e0e0',
            color: chartType === 'pie' ? '#fff' : '#000',
          }}
          onClick={() => setChartType('pie')}
        >
          Pie Chart
        </button>
        <button
          style={{
            ...styles.toggleButton,
            backgroundColor: chartType === 'bar' ? '#007bff' : '#e0e0e0',
            color: chartType === 'bar' ? '#fff' : '#000',
          }}
          onClick={() => setChartType('bar')}
        >
          Bar Chart
        </button>
      </div>

      {/* Genre Chart */}
      <div style={styles.chartWrapper}>
        <h3>Genre Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          {chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={(stats.genreStats ?? []) as GenreStat[]}
                dataKey="count"
                nameKey="_id"
                outerRadius={100}
                label={({ name }: any) => name}
              >
                {(stats.genreStats ?? []).map((entry: GenreStat, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <BarChart data={stats.genreStats ?? []}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Artist Chart */}
      <div style={styles.chartWrapper}>
        <h3>Top Artists by Songs</h3>
        <select
          onChange={(e) => setSelectedArtist(e.target.value)}
          style={styles.select}
          value={selectedArtist}
        >
          <option value="">All Artists</option>
          {(stats.artistStats ?? []).map((artist: ArtistStat) => (
            <option key={artist._id} value={artist._id}>
              {capitalize(artist._id)}
            </option>
          ))}
        </select>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={filteredArtistStats.map((a: ArtistStat) => ({
              ...a,
              name: capitalize(a._id),
            }))}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: any) => `${value} songs`} />
            <Legend />
            <Bar dataKey="songs" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Album Chart */}
      <div style={styles.chartWrapper}>
        <h3>Albums by Number of Songs</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={(stats.albumStats ?? []).map((album: AlbumStat) => ({
              ...album,
              name: capitalize(album._id),
            }))}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value: any) => `${value} songs`} />
            <Legend />
            <Bar dataKey="songs" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Card Component
const Card = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value: number;
  onClick?: () => void;
}) => (
  <div style={styles.card} onClick={onClick}>
    <div>
      <p style={styles.cardLabel}>{label}</p>
      <h3>{value}</h3>
    </div>
  </div>
);

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  homeButton: {
    marginBottom: 20,
    padding: '10px 14px',
    fontSize: 16,
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
  cardLabel: {
    margin: 0,
    fontWeight: 600,
  },
  toggleButtons: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  toggleButton: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  chartWrapper: {
    marginBottom: '40px',
  },
  select: {
    padding: '8px',
    fontSize: '16px',
    marginBottom: '10px',
    width: '100%',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80%',
    overflowY: 'auto',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 14,
    fontSize: '24px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Statistics;
