import { useState } from 'react';

function Workstations() {
  const totalStations = 12;
  const [activeStations, setActiveStations] = useState(0);

  const handleIncrement = () => {
    if (activeStations < totalStations) {
      setActiveStations(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (activeStations > 0) {
      setActiveStations(prev => prev - 1);
    }
  };

  return (
    <div className="card">
      <div className="card-title">
        WORKSTATIONS
      </div>

      <div className="stat-icon" style={{ 
        backgroundColor: 'rgba(167, 139, 250, 0.2)', 
        color: '#a78bfa', 
        fontSize: '32px', 
        margin: '10px auto', 
        width: '60px', 
        height: '60px', 
        borderRadius: '50%' 
      }}>
        💻
      </div>

      <div className="large-number text-center workstations-value">
        {activeStations}/{totalStations}
      </div>

      <div className="subtitle text-center">active stations</div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '10px' }}>
        <button 
          onClick={handleDecrement}
          style={{
            backgroundColor: '#334155',
            border: 'none',
            borderRadius: '4px',
            color: '#94a3b8',
            fontSize: '18px',
            padding: '4px 10px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >-</button>

        <button 
          onClick={handleIncrement}
          style={{
            backgroundColor: '#334155',
            border: 'none',
            borderRadius: '4px',
            color: '#94a3b8',
            fontSize: '18px',
            padding: '4px 10px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >+</button>
      </div>
    </div>
  );
}

export default Workstations;
