import React from 'react';
import './EventHistory.css';

const EventHistory = ({ history, funFacts }) => {
    if (!history && (!funFacts || funFacts.length === 0)) {
        return null;
    }

    return (
        <div className="event-history">
            {history && (
                <div className="history-section">
                    <h3 className="section-title">
                        <span className="title-icon">📖</span>
                        History
                    </h3>
                    <p className="history-text">{history}</p>
                </div>
            )}

            {funFacts && funFacts.length > 0 && (
                <div className="facts-section">
                    <h3 className="section-title">
                        <span className="title-icon">✨</span>
                        Did You Know?
                    </h3>
                    <ul className="facts-list">
                        {funFacts.map((fact, index) => (
                            <li 
                                key={index} 
                                className="fact-item"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {fact}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EventHistory;
