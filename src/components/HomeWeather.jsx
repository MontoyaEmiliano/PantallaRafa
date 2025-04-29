import { useState, useEffect } from 'react';

function HomeWeather() {
  const [temperature, setTemperature] = useState(null);
  const [weatherDescription, setWeatherDescription] = useState('');
  const [connectedDevices, setConnectedDevices] = useState(5);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=19.0414&longitude=-98.2063&current_weather=true'
        );
        const data = await response.json();
        const temp = data.current_weather.temperature;
        const code = data.current_weather.weathercode;

        setTemperature(temp);
        setWeatherDescription(getWeatherDescription(code));
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    }

    fetchWeather();
  }, []);

  function getWeatherDescription(code) {
    const weatherMap = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Light rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Light snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      99: 'Thunderstorm with hail',
    };
    return weatherMap[code] || 'Unknown';
  }

  return (
    <div className="card">
      <div className="card-title">Puebla's Home</div>

      <div className="smart-home-card" style={{
        backgroundColor: '#4f46e5',
        borderRadius: '12px',
        padding: '49px',
        color: '#e2e8f0'
      }}>
        <div style={{ fontSize: '14px' }}>Centro Histórico</div> {/* <- Calle opcional */}
        <div style={{ fontSize: '12px', opacity: 0.8 }}>Puebla, MX</div> {/* <- Ciudad y país corregido */}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <div>
            <div style={{ fontSize: '24px' }}>
              {temperature !== null ? `${temperature}° C` : 'Cargando...'}
            </div>
            <div style={{ fontSize: '12px' }}>
              {weatherDescription}
            </div>
          </div>
          <div style={{ fontSize: '24px' }}>❄️</div>
        </div>
      </div>

      
    </div>
  );
}

export default HomeWeather;
