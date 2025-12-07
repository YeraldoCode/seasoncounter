import { useEffect } from 'react';

/**
 * Hook personalizado para aplicar color de fondo dinámico basado en el evento
 * @param {string} eventColor - Color principal del evento en formato hex
 */
const useEventTheme = (eventColor) => {
    useEffect(() => {
        if (!eventColor) return;

        console.log('🎨 Aplicando color del evento:', eventColor);

        // Función para convertir hex a RGB
        const hexToRgb = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };

        // Función para crear versiones con opacidad para el fondo
        const withOpacity = (hex, opacity) => {
            const rgb = hexToRgb(hex);
            if (!rgb) return hex;
            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
        };

        // Aplicar gradiente de fondo MUY VISIBLE con el color del evento
        const primaryColor = eventColor;
        const backgroundGradient = `
            radial-gradient(ellipse 1200px 800px at top right, ${withOpacity(primaryColor, 0.6)} 0%, ${withOpacity(primaryColor, 0.3)} 40%, transparent 70%),
            radial-gradient(ellipse 1200px 800px at bottom left, ${withOpacity(primaryColor, 0.5)} 0%, ${withOpacity(primaryColor, 0.25)} 40%, transparent 70%),
            radial-gradient(ellipse 1500px 1000px at center, ${withOpacity(primaryColor, 0.25)} 0%, ${withOpacity(primaryColor, 0.1)} 50%, transparent 90%)
        `;

        // Aplicar el gradiente al body con color base más oscuro
        document.body.style.background = `${backgroundGradient}, #0a0f1a`;
        document.body.style.transition = 'background 1.5s ease';

        console.log('✅ Fondo aplicado con gradiente:', backgroundGradient.substring(0, 100) + '...');

        // Limpiar al desmontar
        return () => {
            console.log('🧹 Limpiando color del evento');
        };
    }, [eventColor]);
};

export default useEventTheme;
