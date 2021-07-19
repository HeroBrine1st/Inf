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
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginLeft: "15%",
    marginRight: "15%",
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
  const [variants, setVariants] = useState([])
  const {enqueueSnackbar} = useSnackbar()
  const {path, url} = useRouteMatch()
  const classes = useStyles()
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ROOT}/variants/`)
      .then(it => {
        if(!it.ok) {
          throw new Error(it.statusText)
        }
        return it;
      })
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