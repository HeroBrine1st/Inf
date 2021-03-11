import './App.css';
import "./ButtonAppBar"
import ButtonAppBar from "./ButtonAppBar";
function App() {
  return (
    <div className="App">
      <div className="appbar">
        <ButtonAppBar/>
      </div>
      <div className="container">
        <div className="center_this">abc</div>
        <div className="center_this">abc2</div>
      </div>
    </div>
  );
}

export default App;
