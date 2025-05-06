import { useEffect, useState } from 'react';

const API_KEY = 'EeDaXmSFyxBS2EfffrFbK3izZXVotPxj'; // Tu clave de Giphy

function DailyGiphy() {
  const [gifUrl, setGifUrl] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toDateString();
    const cached = JSON.parse(localStorage.getItem('daily-gif-trending'));

    if (cached && cached.date === today) {
      setGifUrl(cached.url);
      setTitle(cached.title);
      setLoading(false);
      return;
    }

    const fetchGif = async () => {
      try {
        const res = await fetch(
          `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=20&rating=g`
        );
        const data = await res.json();

        if (data.data && data.data.length > 0) {
          const index = new Date().getDate() % data.data.length;
          const gif = data.data[index];

          setGifUrl(gif.images.fixed_height.url);
          setTitle(gif.title);

          localStorage.setItem('daily-gif-trending', JSON.stringify({
            date: today,
            url: gif.images.fixed_height.url,
            title: gif.title
          }));
        } else {
          setTitle('No se encontró ningún GIF trending 😕');
        }
      } catch (error) {
        console.error('Error al obtener el GIF:', error);
        setTitle('Error al cargar el GIF 😢');
      } finally {
        setLoading(false);
      }
    };

    fetchGif();
  }, []);

  return (
    <div className="card">
      <div className="card-title">GIF del Día</div>
      {loading ? (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#4ade80' }}>Cargando GIF...</p>
      ) : gifUrl ? (
        <div style={{ textAlign: 'center' }}>
          <img src={gifUrl} alt={title} style={{ width: '100%', borderRadius: '8px' }} />
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>{title}</p>
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#fb7185' }}>{title}</p>
      )}
    </div>
  );
}

export default DailyGiphy;
