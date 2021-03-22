import {makeStyles} from "@material-ui/core/styles";
import MainPagePaper from "./MainPagePaper";

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
}))

function Main() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <MainPagePaper items={["Здесь может быть ваша реклама", "Тут тоже"]} to="/blocks">Подготовка по тематическим блокам</MainPagePaper>
      <MainPagePaper items={["Здесь может быть ваша реклама", "Тут тоже", "Тестовый пункт"]} to="/variants">Отработка заданий по вариантам ЕГЭ</MainPagePaper>
    </div>
  )
}

export default Main