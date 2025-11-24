import React from 'react';
import './AdSidebar.css';

const AdSidebar = () => {
    return (
        <div className="ad-sidebar">
            <div className="ad-slot">
                <div className="ad-placeholder">
                    <span className="ad-label">Ad Space</span>
                    <span className="ad-dims">300x250</span>
                </div>
            </div>
            <div className="ad-slot">
                <div className="ad-placeholder">
                    <span className="ad-label">Sponsor</span>
                    <span className="ad-dims">300x250</span>
                </div>
            </div>
        </div>
    );
};

export default AdSidebar;
