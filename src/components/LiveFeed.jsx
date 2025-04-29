import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

function LiveFeed() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('livefeed-events');
    return savedEvents ? JSON.parse(savedEvents) : [
      { id: 1, title: 'Próxima plática', subtitle: 'IA Generativa' },
      { id: 2, title: 'Hackathon', subtitle: 'Desarrollo Open Source' }
    ];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventSubtitle, setNewEventSubtitle] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('livefeed-events', JSON.stringify(events));
  }, [events]);

  const openAddModal = () => {
    setNewEventTitle('');
    setNewEventSubtitle('');
    setEditId(null);
    setIsOpen(true);
  };

  const openEditModal = (event) => {
    setNewEventTitle(event.title);
    setNewEventSubtitle(event.subtitle);
    setEditId(event.id);
    setIsOpen(true);
  };

  const handleSave = () => {
    if (editId !== null) {
      // Editar evento existente
      setEvents(events.map(event => 
        event.id === editId ? { ...event, title: newEventTitle, subtitle: newEventSubtitle } : event
      ));
    } else {
      // Agregar nuevo evento
      const newEvent = {
        id: Date.now(),
        title: newEventTitle,
        subtitle: newEventSubtitle
      };
      setEvents([...events, newEvent]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('¿Seguro que deseas eliminar este evento?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  return (
    <div className="card">
      <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        LIVE FEED
        <button 
          onClick={openAddModal}
          style={{
            backgroundColor: '#ec4899',
            border: 'none',
            borderRadius: '6px',
            color: '#0f172a',
            fontSize: '18px',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ✦
        </button>
      </div>

      {events.map(event => (
        <div key={event.id} className="event-item" style={{ position: 'relative' }}>
          <div className="stat-label">{event.title}</div>
          <div className="stat-value" style={{ color: '#4ade80' }}>{event.subtitle}</div>

          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '5px' }}>
            <button 
              onClick={() => openEditModal(event)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#38bdf8',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ✏️
            </button>
            <button 
              onClick={() => handleDelete(event.id)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#fb7185',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}

      {/* MODAL */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            inset: 0
          }} />
          <Dialog.Content style={{
            backgroundColor: '#1e293b',
            borderRadius: '8px',
            padding: '20px',
            width: '90%',
            maxWidth: '400px',
            margin: 'auto',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#e2e8f0'
          }}>
            <Dialog.Title style={{ marginBottom: '10px', fontSize: '18px' }}>
              {editId !== null ? 'Editar Evento' : 'Agregar Evento'}
            </Dialog.Title>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="Título del evento"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                style={{
                  backgroundColor: '#334155',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px',
                  color: '#e2e8f0'
                }}
              />
              <input
                type="text"
                placeholder="Subtítulo del evento"
                value={newEventSubtitle}
                onChange={(e) => setNewEventSubtitle(e.target.value)}
                style={{
                  backgroundColor: '#334155',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px',
                  color: '#e2e8f0'
                }}
              />
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <Dialog.Close asChild>
                <button style={{
                  backgroundColor: '#334155',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  color: '#94a3b8'
                }}>
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: '#4ade80',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  color: '#0f172a'
                }}
              >
                Guardar
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default LiveFeed;
