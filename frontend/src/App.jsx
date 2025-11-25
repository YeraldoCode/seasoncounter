import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AdSidebar from './components/AdSidebar';
import SeasonCounter from './components/SeasonCounter';
import GameMenu from './components/GameMenu';
import { seasonService } from './services/seasonService';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState("Fortnite");
  const [showAds, setShowAds] = useState(true);
  const [seasons, setSeasons] = useState({});
  const [loading, setLoading] = useState(true);
  const [availableGames, setAvailableGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSeasons();
  }, []);

  const fetchSeasons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await seasonService.getAllSeasons();

      console.log('Seasons loaded:', data); // Debug

      // Convert array to object with game names as keys
      const seasonsMap = {};
      const games = [];

      data.forEach(season => {
        seasonsMap[season.game] = season;
        games.push(season.game);
      });

      setSeasons(seasonsMap);
      setAvailableGames(games);

      // Set first game as selected if available
      if (games.length > 0 && !games.includes(selectedGame)) {
        setSelectedGame(games[0]);
      }
    } catch (error) {
      console.error('Error loading seasons:', error);
      setError('No se pudieron cargar las temporadas. ¿Está el backend corriendo en puerto 5000?');
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAds = () => {
    setShowAds(!showAds);
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading seasons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="loading-screen">
          <p className="error-text">⚠️ {error}</p>
          <button onClick={fetchSeasons} className="retry-btn">Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header toggleMenu={toggleMenu} toggleAds={toggleAds} showAds={showAds} />

      <GameMenu
        isOpen={isMenuOpen}
        selectGame={handleGameSelect}
        selectedGame={selectedGame}
        availableGames={availableGames}
      />

      <div className="main-content">
        {showAds && <AdSidebar key="left" />}
        <SeasonCounter
          selectedGame={selectedGame}
          seasonData={seasons[selectedGame]}
        />
        {showAds && <AdSidebar key="right" />}
      </div>
    </div>
  );
}

export default App;
