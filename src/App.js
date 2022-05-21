import './App.css';
import GeoChart from './GeoChart';
import USMap from './USAMap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}

        <USMap />
        <GeoChart />

      </header>
    </div>
  );
}

export default App;
