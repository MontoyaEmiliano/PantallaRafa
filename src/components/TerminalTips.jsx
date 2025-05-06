const commands = [
    
    { label: 'Actualizar paquetes (Debian)', cmd: 'sudo apt update && sudo apt upgrade' },
    { label: 'Buscar texto en archivos', cmd: 'grep -r "texto" .' },
    { label: 'Ver espacio en disco', cmd: 'df -h' },
    { label: 'Reiniciar red', cmd: 'sudo systemctl restart NetworkManager' }
  ];
  
  function TerminalTips() {
    const handleCopy = (text) => {
      navigator.clipboard.writeText(text);
      alert(`Copiado: ${text}`);
    };
  
    return (
      <div className="card">
        <div className="card-title">Terminal Tips</div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {commands.map((c, i) => (
            <li key={i} style={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '6px',
              padding: '10px',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#4ade80'
            }}>
              <span title={c.label}>{c.cmd}</span>
              <button onClick={() => handleCopy(c.cmd)} style={{
                backgroundColor: '#334155',
                color: '#e2e8f0',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                cursor: 'pointer'
              }}>
                📋
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default TerminalTips;
  