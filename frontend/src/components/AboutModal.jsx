import React from 'react';
import './AboutModal.css';

const AboutModal = ({ onClose }) => {
    return (
        <div className="about-modal-overlay" onClick={onClose}>
            <div className="about-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="about-modal-header">
                    <h2>About Season Counter</h2>
                    <button onClick={onClose} className="about-close-btn">✕</button>
                </div>

                <div className="about-modal-body">
                    <section className="about-section">
                        <h3>🎯 Our Story</h3>
                        <p>
                            Season Counter was created on a Saturday night in December 2025,
                            with the assistance of Claude Sonnet AI, while watching the
                            Rayados de Monterrey match. What started as a simple idea evolved
                            into a comprehensive event tracking application.
                        </p>
                    </section>

                    <section className="about-section">
                        <h3>💡 Inspiration</h3>
                        <p>
                            This project was inspired by <strong>Timenite</strong>, a countdown
                            timer originally created by Priyam Raj in 2019 for tracking Fortnite
                            seasons. Timenite's simple yet essential approach to helping players
                            track season endings became the foundation for our vision.
                        </p>
                        <p>
                            In 2023, Timenite was acquired by CenterPoint Gaming, the Canadian
                            company behind CrosshairX. Their dedication to creating tools that
                            enhance the gaming experience inspired us to build something similar
                            but broader in scope.
                        </p>
                    </section>

                    <section className="about-section">
                        <h3>🚀 What We Do</h3>
                        <p>
                            Season Counter provides real-time countdown timers for events across
                            multiple categories:
                        </p>
                        <ul className="about-list">
                            <li>⚽ <strong>Sports</strong> - World Cups, Olympics, major tournaments</li>
                            <li>🎄 <strong>Holidays</strong> - Christmas, Halloween, Valentine's Day</li>
                            <li>🎬 <strong>Entertainment</strong> - Gaming events, releases</li>
                            <li>💻 <strong>Technology</strong> - Product launches, conferences</li>
                            <li>👤 <strong>Personal</strong> - Custom events</li>
                        </ul>
                        <p>
                            Our goal is to help users track what matters to them with precision,
                            style, and a delightful user experience.
                        </p>
                    </section>

                    <section className="about-section">
                        <h3>👨‍💻 The Developer</h3>
                        <p>
                            Built by <strong>YeraldoCode</strong>, a passionate developer dedicated
                            to creating beautiful, functional applications. This project combines
                            modern web technologies with premium design to deliver an exceptional
                            user experience.
                        </p>
                        <p>
                            <a
                                href="https://www.linkedin.com/in/yeraldo-avila/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="about-link"
                            >
                                Connect on LinkedIn →
                            </a>
                        </p>
                    </section>

                    <section className="about-section tech-stack">
                        <h3>⚙️ Technology Stack</h3>
                        <div className="tech-grid">
                            <div className="tech-item">
                                <span className="tech-icon">⚛️</span>
                                <span className="tech-name">React 19</span>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">🟢</span>
                                <span className="tech-name">Node.js</span>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">🍃</span>
                                <span className="tech-name">MongoDB</span>
                            </div>
                            <div className="tech-item">
                                <span className="tech-icon">⚡</span>
                                <span className="tech-name">Vite</span>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="about-modal-footer">
                    <p className="about-footer-text">
                        Thank you for using Season Counter! 🎉
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;
