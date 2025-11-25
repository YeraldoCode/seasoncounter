import React, { useState, useEffect, useMemo } from 'react';
import './CountdownTimer.css';

/**
 * CountdownTimer
 * Props:
 *   - targetDate: ISO string or Date object representing the end of the season.
 *   - fallbackDate (optional): used if targetDate is invalid.
 */
const CountdownTimer = ({ targetDate, fallbackDate }) => {
    // Validate and normalise the date we will count down to (memoized)
    const endDate = useMemo(() => {
        const parseDate = (date) => {
            if (!date) return null;
            const d = new Date(date);
            return isNaN(d.getTime()) ? null : d;
        };
        return parseDate(targetDate) || parseDate(fallbackDate) || new Date();
    }, [targetDate, fallbackDate]);

    // If we still don't have a valid date, show a friendly message
    if (!endDate) {
        return (
            <div className="countdown-container">
                <p className="error-text">⚠️ Fecha no válida</p>
            </div>
        );
    }

    // Calculate the remaining time
    const calculateTimeLeft = () => {
        const now = new Date();
        const diff = endDate - now;
        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    // Update every second – clear interval on unmount or when date changes
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [endDate]); // re‑create interval only when the target date actually changes

    // Helper to pad numbers with leading zero for a uniform look
    const pad = (num) => String(num).padStart(2, '0');

    return (
        <div className="countdown-container">
            <div className="time-card">
                <span className="time-value">{timeLeft.days}</span>
                <span className="time-label">d</span>
            </div>
            <div className="time-card">
                <span className="time-value">{pad(timeLeft.hours)}</span>
                <span className="time-label">h</span>
            </div>
            <div className="time-card">
                <span className="time-value">{pad(timeLeft.minutes)}</span>
                <span className="time-label">m</span>
            </div>
            <div className="time-card">
                <span className="time-value">{pad(timeLeft.seconds)}</span>
                <span className="time-label">s</span>
            </div>
        </div>
    );
};

export default CountdownTimer;
