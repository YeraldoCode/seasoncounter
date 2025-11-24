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

  useEffect(() => {
    fetchSeasons();
  }, []);

  const fetchSeasons = async () => {
    try {
      setLoading(true);
      const data = await seasonService.getAllSeasons();

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
      // Optionally set fallback data here
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
        {showAds && <AdSidebar />}
        <SeasonCounter
          selectedGame={selectedGame}
          seasonData={seasons[selectedGame]}
        />
        {showAds && <AdSidebar />}
      </div>
    </div>
  );
}

export default App;
