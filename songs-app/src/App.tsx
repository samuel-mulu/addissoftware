import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage'; // Import HomePage component
import CreateSong from './components/CreateSong'; // Import CreateSong form
import Statistics from './components/Statistics'; // Import Statistics component
import { useDispatch, useSelector } from 'react-redux';
import { setSongs } from './redux/songsSlice'; // Adjust the import based on your Redux setup

function App() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const dispatch = useDispatch();

 
  // Toggle form visibility
  const toggleCreateForm = () => {
    setShowCreateForm((prevState) => !prevState);
  };

  function handleAddSong(newSong: any): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Song Management</h1> {/* Heading */}
        </header>
        <main>
          
          {/* Routing for HomePage and Statistics */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
