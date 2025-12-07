import React from 'react';
import './GameMenu.css';

const GameMenu = ({ isOpen, selectGame, selectedGame, availableGames = [] }) => {
    if (!isOpen) return null;

    // Fallback events if none available from API
    const games = availableGames.length > 0 ? availableGames : [
        "Valentine's Day 2026",
        "FIFA World Cup 2026",
        "Christmas 2026"
    ];

    return (
        <div className="game-menu">
            <div className="menu-header">
                <h3>Select Event</h3>
            </div>
            <ul className="game-list">
                {games.map((game) => (
                    <li
                        key={game}
                        className={`game-item ${selectedGame === game ? 'active' : ''}`}
                        onClick={() => selectGame(game)}
                    >
                        {game}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameMenu;
