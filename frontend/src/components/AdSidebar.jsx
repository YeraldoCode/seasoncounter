import React, { useEffect } from 'react';
import './AdSidebar.css';

const AdSidebar = () => {
    useEffect(() => {
        // Intentar cargar anuncios
        try {
            if (window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (err) {
            console.log('AdSense en modo test');
        }
    }, []);

    return (
        <div className="ad-sidebar">
            {/* Primer espacio publicitario */}
            <div className="ad-slot">
                {/* AdSense real (invisible en localhost) */}
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                    data-ad-client="ca-pub-9632317107381265"
                    data-ad-slot="5684347183"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                    data-adtest="on">
                </ins>

                {/* Placeholder visible - se oculta cuando AdSense carga */}
                <div className="ad-placeholder-mock">
                    <div className="ad-icon">📢</div>
                    <span className="ad-label">GOOGLE ADSENSE</span>
                    <span className="ad-size">300 x 250</span>
                    <div className="ad-status">Test Mode</div>
                </div>
            </div>

            {/* Segundo espacio publicitario */}
            <div className="ad-slot">
                {/* AdSense real (invisible en localhost) */}
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                    data-ad-client="ca-pub-9632317107381265"
                    data-ad-slot="5684347183"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                    data-adtest="on">
                </ins>

                {/* Placeholder visible */}
                <div className="ad-placeholder-mock">
                    <div className="ad-icon">📢</div>
                    <span className="ad-label">GOOGLE ADSENSE</span>
                    <span className="ad-size">300 x 250</span>
                    <div className="ad-status">Test Mode</div>
                </div>
            </div>
        </div>
    );
};

export default AdSidebar;
