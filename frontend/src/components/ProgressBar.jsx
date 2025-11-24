import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
    return (
        <div className="progress-container">
            <div className="progress-bar-bg">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="progress-labels">
                <span>Season progress</span>
                <span>{progress}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;
