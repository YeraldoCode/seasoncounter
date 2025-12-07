import React, { useState } from 'react';
import './Footer.css';
import AboutModal from './AboutModal';

const Footer = () => {
    const [showAboutModal, setShowAboutModal] = useState(false);

    return (
        <>
            <footer className="app-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <p className="footer-text">
                            Developed by{' '}
                            <a
                                href="https://www.linkedin.com/in/yeraldo-avila/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link developer-link"
                            >
                                YeraldoCode
                            </a>
                        </p>
                    </div>

                    <div className="footer-divider"></div>

                    <div className="footer-section">
                        <button
                            onClick={() => setShowAboutModal(true)}
                            className="footer-link-button"
                        >
                            About Us
                        </button>
                    </div>

                    <div className="footer-divider"></div>

                    <div className="footer-section">
                        <p className="footer-copyright">
                            {new Date().getFullYear()} Season Counter
                        </p>
                    </div>
                </div>
            </footer>

            {showAboutModal && (
                <AboutModal onClose={() => setShowAboutModal(false)} />
            )}
        </>
    );
};

export default Footer;
