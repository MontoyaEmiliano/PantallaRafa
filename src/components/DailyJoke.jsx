import { useState, useEffect } from 'react';

function DailyJoke() {
  const [jokes, setJokes] = useState([]);
  const [jokeOfTheDay, setJokeOfTheDay] = useState(null);

  useEffect(() => {
    async function fetchJokes() {
      try {
        const response = await fetch('https://official-joke-api.appspot.com/jokes/programming/ten');
        const data = await response.json();
        setJokes(data);

        const today = new Date();
        const dayOfYear = Math.floor(
          (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
        );

        const index = dayOfYear % data.length;
        setJokeOfTheDay(data[index]);
      } catch (error) {
        console.error('Error fetching jokes:', error);
      }
    }

    fetchJokes();
  }, []);

  return (
    <div className="card">
      <div className="card-title">
        Daily Joke
      </div>

      {jokeOfTheDay ? (
        <div style={{
          color: '#e2e8f0',
          fontSize: '16px',
          textAlign: 'center',
          marginTop: '20px',
          lineHeight: '1.6'
        }}>
          <p>"{jokeOfTheDay.setup}"</p>
          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>
            {jokeOfTheDay.punchline}
          </p>
        </div>
      ) : (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando chiste...</p>
      )}
    </div>
  );
}

export default DailyJoke;
