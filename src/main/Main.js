import {Button, Paper} from "@material-ui/core";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("lg")]: {
      display: "block",
    },
    [theme.breakpoints.up("lg")]: {
      display: "flex",
      flexDirection: "row",
    },
    alignItems: "stretch",
    justifyContent: "center",
    color: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "fixed",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignSelf: "center",
    textAlign: "center",
    // justifyContent: "center",
    margin: "5%",
    padding: theme.spacing(1),
  },
  paperContent: {
    fontSize: "calc(4px + 1.5vmin)",
    textAlign: "left",
    flex: "1",
  },
  button: {

  }
}))

function Main() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5">Подготовка по тематическим блокам</Typography>
        <div className={classes.paperContent}>
          <ul>
            {["Здесь может быть ваша реклама", "Тут тоже"].map(it => (
              <li><Typography variant="body2">{it}</Typography></li>
            ))}
          </ul>
        </div>

        <Button variant="outlined" color="primary" className={classes.button}>
          Нажми меня
        </Button>
      </Paper>

      <Paper className={classes.paper}>
        <Typography variant="h5">Отработка знаний по вариантам ЕГЭ</Typography>
        <div className={classes.paperContent}>
          <ul>
            {["Здесь может быть ваша реклама", "Тут тоже", "Тестовый пункт"].map(it => (
              <li><Typography variant="body2">{it}</Typography></li>
            ))}
          </ul>
        </div>
        <Button variant="outlined" color="primary" component={Link} to="/variants">
          Нажми меня
        </Button>
      </Paper>
    </div>
  )
}

export default Main