import Header from './components/Header';
import Footer from './components/Footer';
import Workstations from './components/Workstations';
import LiveFeed from './components/LiveFeed';
import BernyCounter from './components/BernyCounter';
import HomeWeather from './components/HomeWeather';
import DailyJoke from './components/DailyJoke';
import HiddenGame from './components/HiddenGame';
import TodoList from './components/ToDoList';

function App() {
  return (
    <div className="App">
      <Header />

     <div className="dashboard">
        <Workstations />
        <LiveFeed />
        <BernyCounter />
        <HomeWeather />
        <DailyJoke />
        <TodoList />
        <HiddenGame />
      </div> 

      <Footer />
    </div>
  );
}

export default App;