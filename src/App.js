import './App.css';
import GeoChart from './GeoChart';
import USMap from './USAMap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className='USAdiv'>
          <USMap />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <GeoChart />

      </header>
    </div>
  );
}

export default App;
