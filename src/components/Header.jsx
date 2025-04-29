import { useState } from 'react';

function Header() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Safari
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE11
        document.documentElement.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { // Safari
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE11
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="header">
      <h1>
        <span className="terminal-prefix">&gt;</span> LAB SYSTEMS // UNIVERSIDAD X
      </h1>
      <div className="header-right">
        <div id="time-display">{new Date().toLocaleString('es-MX')}</div>
        <div className="status">NETWORK: STABLE</div>

        {/* Botón de Fullscreen */}
        <button 
          onClick={toggleFullscreen}
          style={{
            backgroundColor: '#334155',
            border: 'none',
            borderRadius: '6px',
            color: '#94a3b8',
            padding: '6px 12px',
            marginLeft: '10px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
        >
          {isFullscreen ? "⛶" : "🖵"}
        </button>
      </div>
    </div>
  );
}

export default Header;
