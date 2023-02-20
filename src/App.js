import './App.css';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <div className='sticky-top' style={{ background: "#E3E3D8", borderRadius: "0 0 85% 85%/30%"}}>
        <header>
          <div className='overlay'>
            <h2>Veridic News App</h2>
            <h5>This app is made for "Veridic HireSprint 2023"</h5>
          </div>
        </header>
      </div>
      <Home />
    </div>
  );
}

export default App;