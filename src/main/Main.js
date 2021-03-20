import {Button, Paper} from "@material-ui/core";
import "./Main.css"
import {Link} from "react-router-dom";

function Main() {
  return (
    <div className="mainPage">
      <Paper className="paper">
        Подготовка по тематическим блокам
        <div className="paperContent">
          <ul>
            <li>Здесь может быть ваша реклама</li>
            <li>Тут тоже</li>
          </ul>
        </div>

        <Button variant="outlined" color="primary">
          Нажми меня
        </Button>
      </Paper>

      <Paper className="paper">
        Отработка знаний по вариантам ЕГЭ
        <div className="paperContent">
          <ul>
            <li>Здесь может быть ваша реклама</li>
            <li>Тут тоже</li>
          </ul>
        </div>
        <Link to="/variants">
          <Button variant="outlined" color="primary">
            Нажми меня
          </Button>
        </Link>
      </Paper>
    </div>
  )
}

export default Main