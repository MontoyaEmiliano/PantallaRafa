import { useState, useEffect } from 'react';

function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
  };

  return (
    <div className="header">
      <h1>
        <span className="terminal-prefix">&gt;</span> LAB SYSTEMS // IBERO PUEBLA
      </h1>

      <div className="header-right">
        <div>{currentTime.toLocaleString('es-MX')}</div>

        <div className="status-line">
          <div className="status">NETWORK: STABLE</div>

          <button
            onClick={toggleFullscreen}
            className="fullscreen-btn"
            title="Pantalla completa"
          >
            {isFullscreen ? '⛶' : '🖵'}
          </button>

          <button
            onClick={handleLogout}
            className="fullscreen-btn"
            title="Cerrar sesión"
          >
            🚪
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
