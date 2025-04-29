import { useState, useEffect } from 'react';

function HiddenGame() {
  const [showGame, setShowGame] = useState(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'b') {
        setShowGame((prev) => !prev); // Alterna mostrar o esconder el juego
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (showGame) {
      const moveInterval = setInterval(() => {
        setPosition((pos) => (pos + 10) % 300); // Movimiento simple en bucle
      }, 100);

      return () => clearInterval(moveInterval);
    }
  }, [showGame]);

  if (!showGame) return null; // No muestra nada si el juego está oculto

  return (
    <div className="card" style={{ textAlign: 'center', height: '200px', overflow: 'hidden' }}>
      <div className="card-title">Mini Game 🕹️</div>
      <div style={{
        marginTop: '20px',
        position: 'relative',
        height: '100px',
        backgroundColor: '#334155',
        borderRadius: '12px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#4ade80',
          borderRadius: '50%',
          position: 'absolute',
          top: '30px',
          left: `${position}px`,
          transition: 'left 0.1s'
        }}>
        </div>
      </div>
      <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>
        (Presiona Ctrl + B para salir)
      </p>
    </div>
  );
}

export default HiddenGame;
