import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AdSidebar from '../components/AdSidebar';
import EventCounter from '../components/EventCounter';
import GameMenu from '../components/GameMenu';
import Footer from '../components/Footer';
import { useGetEventsQuery } from '../store/apiSlice';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './LandingPage.css';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("FIFA World Cup 2026");
  const [showAds, setShowAds] = useState(true);
  const { isAdmin } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Fetch events using RTK Query
  const { data: eventsData = [], isLoading, error } = useGetEventsQuery();

  // Create events map and available events list
  const eventsMap = {};
  const availableEvents = [];

  eventsData.forEach(event => {
    eventsMap[event.name] = event;
    availableEvents.push(event.name);
  });

  // Set first event if current selection is not available
  useEffect(() => {
    if (availableEvents.length > 0 && !availableEvents.includes(selectedEvent)) {
      setSelectedEvent(availableEvents[0]);
    }
  }, [eventsData]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAds = () => {
    setShowAds(!showAds);
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setIsMenuOpen(false);
  };

  const goToAdmin = () => {
    if (isAdmin()) {
      navigate('/admin');
    }
  };

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-screen">
          <p>Error loading events</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header
        toggleMenu={toggleMenu}
        toggleAds={toggleAds}
        showAds={showAds}
        showAdminButton={isAdmin()}
        onAdminClick={goToAdmin}
      />

      <GameMenu
        isOpen={isMenuOpen}
        selectGame={handleEventSelect}
        selectedGame={selectedEvent}
        availableGames={availableEvents}
      />

      <div className="main-content">
        {showAds && <AdSidebar />}
        <EventCounter
          selectedEvent={selectedEvent}
          eventData={eventsMap[selectedEvent]}
        />
        {showAds && <AdSidebar />}
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
