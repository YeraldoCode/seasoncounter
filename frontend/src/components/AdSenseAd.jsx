import React, { useEffect } from 'react';

/**
 * AdSense Component
 * 
 * Este componente está preparado para cuando actives Google AdSense.
 * 
 * Uso:
 * <AdSenseAd 
 *   adSlot="1234567890"
 *   adFormat="auto"
 *   fullWidthResponsive={true}
 * />
 * 
 * Instrucciones:
 * 1. Obtén tu ID de AdSense (ca-pub-XXXXXXXXXXXXXXXX)
 * 2. Agrega el script en index.html
 * 3. Obtén el slot ID de cada ad unit
 * 4. Reemplaza "ca-pub-XXXXXXXXXXXXXXXX" con tu ID real
 */

const AdSenseAd = ({ 
    adSlot = '1234567890',
    adFormat = 'auto',
    fullWidthResponsive = true,
    style = {}
}) => {
    useEffect(() => {
        // Cargar el ad cuando el componente se monta
        try {
            if (window.adsbygoogle && process.env.NODE_ENV === 'production') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (error) {
            console.error('Error loading AdSense:', error);
        }
    }, []);

    // No mostrar ads en desarrollo
    if (process.env.NODE_ENV !== 'production') {
        return (
            <div style={{
                padding: '20px',
                background: 'rgba(255, 255, 0, 0.1)',
                border: '2px dashed #ffd700',
                borderRadius: '8px',
                textAlign: 'center',
                color: '#ffd700',
                ...style
            }}>
                📢 Ad Space (Dev Mode)
            </div>
        );
    }

    return (
        <div style={style}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive.toString()}
            />
        </div>
    );
};

export default AdSenseAd;
