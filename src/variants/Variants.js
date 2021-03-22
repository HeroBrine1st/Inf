import {useEffect, useState} from "react";
import Loading from "../misc/Loading";
import {useSnackbar} from "notistack";
import {Route, useRouteMatch, Switch} from "react-router";
import {Link} from "react-router-dom";
import {Chip, makeStyles, Typography} from "@material-ui/core";
import Variant from "./Variant"
import join from "../utils/join"
const useStyles = makeStyles((theme) => ({
  root: {
    alignContent: "center",
  },
  selector: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(16),
    marginRight: theme.spacing(16),
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  text: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: 'center',
  }
}));

function Variants(props) {
  let [variants, setVariants] = useState([])
  const {enqueueSnackbar} = useSnackbar()
  let {path, url} = useRouteMatch()
  const classes = useStyles()
  useEffect(() => {
    fetch("/variants.json")
      .then(it => it.json())
      .then(it => {
          setVariants(it)
        },
        error => {
          console.error(error)
          enqueueSnackbar("Произошла ошибка при получении данных", {variant: "error"})
        }
      )
  }, [enqueueSnackbar]) // Костыль, чтобы цпу в сотку не держался

  return <div className={classes.root}>
    <Loading open={variants.length === 0}/>
    <Switch>
      <Route exact path={path}>
        <div className={classes.text}>
          <Typography variant="h6">Выберите вариант</Typography>
        </div>
        <div className={classes.selector}>
          {variants.length > 0 && variants.map(it => (
            <Chip label={it.name} component={Link} to={join(url, it.id)} clickable color="primary" key={it.id}/>
          ))}
        </div>
      </Route>
      <Route path={join(path,":variantId")}>
        <Variant setTitle={props.setTitle} resetTitle={props.resetTitle}/>
      </Route>
    </Switch>
  </div>
}

export default Variants