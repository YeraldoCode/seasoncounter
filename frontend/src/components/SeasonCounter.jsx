import React from 'react';
import CountdownTimer from './CountdownTimer';
import ProgressBar from './ProgressBar';
import SeasonDetails from './SeasonDetails';
import './SeasonCounter.css';

const SeasonCounter = ({ selectedGame, seasonData }) => {
    // Fallback data if API hasn't loaded yet
    const defaultData = {
        seasonName: "Loading...",
        targetDate: new Date().toISOString(),
        displayStartDate: "N/A",
        displayEndDate: "N/A",
        seasonNumber: 0,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString()
    };

    const currentData = seasonData || defaultData;

    const calculateProgress = (start, end) => {
        const now = new Date().getTime();
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        const total = endTime - startTime;
        const current = now - startTime;
        const percentage = Math.min(100, Math.max(0, (current / total) * 100));
        return Math.round(percentage);
    };

    const progress = calculateProgress(currentData.startDate, currentData.endDate);

    return (
        <div className="season-counter-wrapper">
            <h1 className="season-title">
                TEMPORADA <span className="season-number">{currentData.seasonNumber}</span>
            </h1>

            <CountdownTimer targetDate={currentData.targetDate} />

            <ProgressBar progress={progress} />

            <SeasonDetails
                game={selectedGame || "Loading"}
                season={currentData.seasonName}
                startDate={currentData.displayStartDate}
                endDate={currentData.displayEndDate}
            />
        </div>
    );
};

export default SeasonCounter;
