import React, { useState, useEffect, useCallback } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = useCallback(() => {
        if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const difference = +new Date(targetDate) - +new Date();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        // Update immediately
        setTimeLeft(calculateTimeLeft());

        // Configurar intervalo
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Cleanup
        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    return (
        <div className="countdown-container">
            <div className="simply-section">
                <span className="simply-amount">{timeLeft.days}</span>
                <span className="simply-word">d</span>
            </div>
            <div className="simply-section">
                <span className="simply-amount">{timeLeft.hours}</span>
                <span className="simply-word">h</span>
            </div>
            <div className="simply-section">
                <span className="simply-amount">{timeLeft.minutes}</span>
                <span className="simply-word">m</span>
            </div>
            <div className="simply-section">
                <span className="simply-amount">{timeLeft.seconds}</span>
                <span className="simply-word">s</span>
            </div>
        </div>
    );
};

export default CountdownTimer;
