import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="countdown-container">
            <div className="time-card">
                <span className="time-value">{timeLeft.days}</span>
                <span className="time-label">d</span>
            </div>
            <div className="time-card">
                <span className="time-value">{timeLeft.hours}</span>
                <span className="time-label">h</span>
            </div>
            <div className="time-card">
                <span className="time-value">{timeLeft.minutes}</span>
                <span className="time-label">m</span>
            </div>
            <div className="time-card">
                <span className="time-value">{timeLeft.seconds}</span>
                <span className="time-label">s</span>
            </div>
        </div>
    );
};

export default CountdownTimer;
