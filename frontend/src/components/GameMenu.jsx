import React from 'react';
import './GameMenu.css';

const GameMenu = ({ isOpen, selectGame, selectedGame, availableGames = [] }) => {
    if (!isOpen) return null;

    // Fallback games if none available from API
    const games = availableGames.length > 0 ? availableGames : [
        "Fortnite",
        "COD: Warzone",
        "PUBG: Battlegrounds"
    ];

    return (
        <div className="game-menu">
            <div className="menu-header">
                <h3>Seleccionar juego de interes</h3>
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
