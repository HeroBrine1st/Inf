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
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      position: "fixed",
      justifyContent: "center",
    },
    alignItems: "stretch",

    color: "white",

  },
}))

function Main() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <MainPagePaper items={["Подготовьтесь к выполнению определенных типов заданий", "Потренируйтесь выполнять задания на определенную тему"]} to="/blocks">Подготовка по тематическим блокам</MainPagePaper>
      <MainPagePaper items={["Проверьте свои знания на заданиях, схожих с заданиями ЕГЭ", "Найдите свои слабые места для подготовки в будущем", "Потренируйтесь выполнять задания"]} to="/variants">Отработка заданий по вариантам ЕГЭ</MainPagePaper>
    </div>
  )
}

export default Main