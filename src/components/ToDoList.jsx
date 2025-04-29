import { useState, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todo-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = { id: Date.now(), text: inputValue, done: false };
      setTasks(prev => [...prev, newTask]);
      setInputValue('');
    }
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="card">
      <div className="card-title">To-Do List</div>

      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Agregar tarea..."
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: '#e2e8f0'
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
        />
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            backgroundColor: '#334155',
            padding: '8px',
            borderRadius: '6px',
            color: task.done ? '#4ade80' : '#e2e8f0',
            textDecoration: task.done ? 'line-through' : 'none'
          }}>
            <span onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer' }}>
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#fb7185',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
