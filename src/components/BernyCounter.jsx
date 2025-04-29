import { useState, useEffect } from 'react';

function BernyCounter() {
  const [daysWithoutIncident, setDaysWithoutIncident] = useState(() => {
    const savedDays = localStorage.getItem('bernyDays');
    return savedDays ? parseInt(savedDays, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('bernyDays', daysWithoutIncident);
  }, [daysWithoutIncident]);

  useEffect(() => {
    const now = new Date();
    const lastReset = localStorage.getItem('bernyLastUpdate');
    const lastDate = lastReset ? new Date(lastReset) : null;

    if (!lastDate || now.getDate() !== lastDate.getDate()) {
      setDaysWithoutIncident(prev => {
        const newCount = prev + 1;
        localStorage.setItem('bernyDays', newCount);
        localStorage.setItem('bernyLastUpdate', now.toISOString());
        return newCount;
      });
    }
  }, []);

  const handleReset = () => {
    if (confirm('¿Seguro que deseas reiniciar el contador de Berny?')) {
      setDaysWithoutIncident(0);
      localStorage.setItem('bernyDays', 0);
      localStorage.setItem('bernyLastUpdate', new Date().toISOString());
    }
  };

  return (
    <div className="card">
      <div className="card-title">BERNY</div>

      <div className="stat-icon" style={{
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        color: '#facc15',
        fontSize: '32px',
        margin: '10px auto',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        🛠️
      </div>

      <div className="large-number text-center" style={{ color: '#facc15' }}>
        {daysWithoutIncident}
      </div>

      <div className="subtitle text-center">
        días sin que Berny rompa algo
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button 
          onClick={handleReset}
          style={{
            backgroundColor: '#334155',
            border: 'none',
            borderRadius: '8px',
            color: '#94a3b8',
            fontSize: '14px',
            padding: '8px 16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export default BernyCounter;
