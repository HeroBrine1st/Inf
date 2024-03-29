import {Button, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {NavigateNextRounded} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignSelf: "center",
    textAlign: "center",
    [theme.breakpoints.down("lg")]: { // Мобила
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: { // ПК
      margin: "5%",
    },
    padding: theme.spacing(1),
  },
  paperContent: {
    textAlign: "left",
    flexGrow: "1",
  },
  button: {},
  ul: {
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(2),
    }
  }
}))

function MainPagePaper(props) {
  const classes = useStyles()
  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <Typography variant="h5">{props.children}</Typography>
      <div className={classes.paperContent}>
        <ul className={classes.ul}>
          {props.items.map((it, index) => (
            <li key={index}><Typography variant="body2">{it}</Typography></li>
          ))}
        </ul>
      </div>
      <Button variant="contained" color="primary" className={classes.button} component={Link} to={props.to}
              endIcon={<NavigateNextRounded/>}>Перейти</Button>
    </Paper>
  </div>
}

export default MainPagePaper