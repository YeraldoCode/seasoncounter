import React, { useEffect } from 'react';
import CountdownTimer from './CountdownTimer';
import SeasonDetails from './SeasonDetails';
import EventHistory from './EventHistory';
import useEventTheme from '../hooks/useEventTheme';
import './SeasonCounter.css';

const EventCounter = ({ selectedEvent, eventData }) => {
    // Fallback data if API hasn't loaded yet
    const defaultData = {
        name: "Loading...",
        description: "Loading...",
        targetDate: new Date().toISOString(),
        displayStartDate: "N/A",
        displayEndDate: "N/A",
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        icon: '📅',
        color: '#48bb78',
        history: '',
        funFacts: []
    };

    const currentData = eventData || defaultData;

    // Apply dynamic theme based on event color
    useEventTheme(currentData.color);

    return (
        <div className="season-counter-wrapper" style={{
            boxShadow: `0 25px 50px -12px ${currentData.color}33`
        }}>
            <h1 className="season-title" style={{ color: currentData.color }}>
                <span style={{ fontSize: '2.5em', marginRight: '0.3em' }}>{currentData.icon}</span>
                {currentData.name}
            </h1>

            <CountdownTimer targetDate={currentData.targetDate} />

            <SeasonDetails
                game={currentData.name}
                season={currentData.description}
                startDate={currentData.displayStartDate}
                endDate={currentData.displayEndDate}
            />

            <EventHistory 
                history={currentData.history}
                funFacts={currentData.funFacts}
            />
        </div>
    );
};

export default EventCounter;
