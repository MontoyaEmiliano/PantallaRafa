import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Workstations from './components/Workstations';
import LiveFeed from './components/LiveFeed';
import BernyCounter from './components/BernyCounter';
import HomeWeather from './components/HomeWeather';
import DailyJoke from './components/DailyJoke';
import HiddenGame from './components/HiddenGame';
import TodoList from './components/ToDoList';
import DailyGiphy from './components/DailyGiphy';
import SystemStats from './components/SystemStats';
import TerminalTips from './components/TerminalTips';
import AdvisoryCounter from './components/AdvisoryCounter';
import Login from './components/Login'; // Asegúrate de tener este componente

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('isLoggedIn');
    if (session === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <Header />

          <div className="dashboard">
            <Workstations />
            <LiveFeed />
            <BernyCounter />
            <HomeWeather />
            <DailyJoke />
            <TodoList />
            <HiddenGame />
            <DailyGiphy />
            <AdvisoryCounter />
            <SystemStats />
            
          </div>

          <Footer />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
