import './App.css';
import "./MainAppBar"
import MainAppBar from "./MainAppBar";
import {Button, Paper} from "@material-ui/core";


function App() {
  return (
    <div className="App">
      <div className="appbar">
        <MainAppBar/>
      </div>
      <div className="container">
        <Paper className="paper">
          Подготовка по тематическим блокам
          <div className="content">
            <ul>
              <li>Здесь может быть ваша реклама</li>
              <li>Тут тоже</li>
            </ul>
          </div>
          <Button variant="contained" color="primary">
            Нажми меня
          </Button>
        </Paper>

        <Paper className="paper">
          Отработка знаний по вариантам ЕГЭ
          <div className="content">
            <ul>
              <li>Здесь может быть ваша реклама</li>
              <li>Тут тоже</li>
            </ul>
          </div>
          <Button variant="contained" color="primary">
            Нажми меня
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default App;
