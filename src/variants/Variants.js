import {useState} from "react";
import {Route, useRouteMatch, Switch} from "react-router";
import {Link} from "react-router-dom";
import {Chip, makeStyles, Typography} from "@material-ui/core";
import Variant from "./Variant"
import join from "../utils/join"
import DownloadingJson from "../misc/DownloadingJson";

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
  const {path, url} = useRouteMatch()
  const classes = useStyles()

  return <div className={classes.root}>
    <Switch>
      <Route exact path={path}>
        <DownloadingJson onResult={it => setVariants(it)}
                         url={`${process.env.REACT_APP_API_ROOT}/variants/`}>
          <div className={classes.text}>
            <Typography variant="h6">Выберите вариант</Typography>
          </div>
          <div className={classes.selector}>
            {variants.length > 0 && variants.map(it => (
              <Chip label={it.name} component={Link} to={join(url, it.id)} clickable color="primary" key={it.id}/>
            ))}
          </div>
        </DownloadingJson>
      </Route>
      <Route path={join(path, ":variantId")}>
        <Variant setTitle={props.setTitle} resetTitle={props.resetTitle}/>
      </Route>
    </Switch>
  </div>
}

export default Variants