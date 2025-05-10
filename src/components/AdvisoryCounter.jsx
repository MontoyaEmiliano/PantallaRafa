import { useEffect, useState } from 'react';

function AdvisoryCounter() {
  const [todayCount, setTodayCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const todayDate = new Date().toLocaleDateString('es-MX'); // formato corto y seguro

  // Cargar datos al iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('advisory-counter'));

    if (stored) {
      if (stored.date === todayDate) {
        setTodayCount(stored.todayCount);
        setTotalCount(stored.totalCount);
      } else {
        // Solo resetea el de hoy si cambia el día (mantiene el total)
        setTodayCount(0);
        setTotalCount(stored.totalCount);
        // Actualiza en localStorage inmediatamente
        localStorage.setItem('advisory-counter', JSON.stringify({
          date: todayDate,
          todayCount: 0,
          totalCount: stored.totalCount
        }));
      }
    } else {
      // Si no hay nada guardado, inicializa todo
      localStorage.setItem('advisory-counter', JSON.stringify({
        date: todayDate,
        todayCount: 0,
        totalCount: 0
      }));
    }
  }, [todayDate]);

  // Sumar asesoría
  const addAdvisory = () => {
    const newTodayCount = todayCount + 1;
    const newTotalCount = totalCount + 1;

    setTodayCount(newTodayCount);
    setTotalCount(newTotalCount);

    localStorage.setItem('advisory-counter', JSON.stringify({
      date: todayDate,
      todayCount: newTodayCount,
      totalCount: newTotalCount
    }));
  };

  return (
    <div className="card">
      <div className="card-title">📊 Contador de Asesorías</div>
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <p style={{ color: '#4ade80', fontSize: '16px' }}>
          Asesorías de hoy: <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#e2e8f0' }}>{todayCount}</span>
        </p>
        <p style={{ color: '#94a3b8', fontSize: '16px' }}>
          Acumulado total: <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#e2e8f0' }}>{totalCount}</span>
        </p>
        <button onClick={addAdvisory} style={{
          marginTop: '10px',
          backgroundColor: '#334155',
          border: 'none',
          borderRadius: '6px',
          color: '#94a3b8',
          padding: '8px 16px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.2s'
        }}>
          ➕ Registrar asesoría
        </button>
      </div>
    </div>
  );
}

export default AdvisoryCounter;
