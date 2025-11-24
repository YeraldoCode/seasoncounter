import React from 'react';
import './SeasonDetails.css';

const SeasonDetails = ({ game, season, startDate, endDate }) => {
    return (
        <div className="season-details-container">
            <div className="detail-item">
                <span className="detail-label">Game</span>
                <span className="detail-value">{game}</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Season</span>
                <span className="detail-value">{season}</span>
            </div>
            <div className="detail-row">
                <div className="detail-item">
                    <span className="detail-label">Started</span>
                    <span className="detail-value">{startDate}</span>
                </div>
                <div className="detail-item">
                    <span className="detail-label">Ends</span>
                    <span className="detail-value">{endDate}</span>
                </div>
            </div>
        </div>
    );
};

export default SeasonDetails;
