import './App.css';
import "./MainAppBar"
import MainAppBar from "./MainAppBar";
import Main from "./Main";
import {Component} from "react";


class App extends Component {
  render() {
    let showMain = true;
    return (
      <div className="App">
        <MainAppBar/>
        <div className="container">
          {showMain && (
            <Main/>
          )}
        </div>
      </div>
    );
  }
}

export default App;