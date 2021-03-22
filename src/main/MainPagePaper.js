import {Button, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: "1"
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
    flexGrow: "1",
  },
  button: {}
}))

function MainPagePaper(props) {
  const classes = useStyles()
  return <div className={classes.root}>
    <Paper className={classes.paper}>
      <Typography variant="h5">{props.children}</Typography>
      <div className={classes.paperContent}>
        <ul>
          {props.items.map(it => (
            <li><Typography variant="body2">{it}</Typography></li>
          ))}
        </ul>
      </div>

      <Button variant="outlined" color="primary" className={classes.button} component={Link} to={props.to}>
        Нажми меня
      </Button>
    </Paper>
  </div>
}

export default MainPagePaper