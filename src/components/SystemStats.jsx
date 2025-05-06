import { useEffect, useState } from 'react';
import { FaMicrochip, FaMemory, FaDesktop } from 'react-icons/fa';

function SystemStats() {
  const [cpu, setCpu] = useState(30);
  const [ram, setRam] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 100));
      setRam(Math.floor(Math.random() * 100));
    }, 60000); // 12 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
      <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaDesktop style={{ fontSize: '20px', color: '#4ade80' }} />
        System Monitor
      </div>

      {/* CPU */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <FaMicrochip style={{ color: '#4ade80', fontSize: '24px', marginRight: '10px' }} />
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>CPU Usage</span>
        </div>
        <div style={{
          backgroundColor: '#334155',
          borderRadius: '6px',
          height: '24px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${cpu}%`,
            backgroundColor: '#4ade80',
            height: '100%',
            transition: 'width 5.6s'
          }}></div>
        </div>
        <div style={{ fontSize: '13px', color: '#e2e8f0', marginTop: '6px' }}>
          {cpu}% &nbsp;|&nbsp; Threads: {Math.floor(cpu / 4) + 1} &nbsp;|&nbsp; Temp: {40 + Math.floor(cpu / 5)}°C
        </div>
      </div>

      {/* RAM */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <FaMemory style={{ color: '#38bdf8', fontSize: '24px', marginRight: '10px' }} />
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>RAM Usage</span>
        </div>
        <div style={{
          backgroundColor: '#334155',
          borderRadius: '6px',
          height: '24px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${ram}%`,
            backgroundColor: '#38bdf8',
            height: '100%',
            transition: 'width 5.6s'
          }}></div>
        </div>
        <div style={{ fontSize: '13px', color: '#e2e8f0', marginTop: '6px' }}>
          {ram}% &nbsp;|&nbsp; {Math.floor(ram * 16 / 100)} GB / 16 GB
        </div>
      </div>
    </div>
  );
}

export default SystemStats;
