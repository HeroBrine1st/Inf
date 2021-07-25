import {useEffect} from "react";
import {Route, Switch, useRouteMatch} from "react-router";
import join from "../utils/join";
import EditVariant from "./EditVariant";

// const useStyles = makeStyles((theme) => ({
//   root: {
//
//   }
// }))

function Overview({setTitle, resetTitle}) {
  // const classes = useStyles()
  const {path, url} = useRouteMatch()
  useEffect(() => {
    setTitle("Панель управления")
    return resetTitle
  }, [setTitle, resetTitle, url])
  return <Switch>
    <Route exact path="/">
      TODO
    </Route>
    <Route path={join(path, "variant")}>
      <EditVariant setTitle={setTitle} resetTitle={resetTitle}/>
    </Route>
  </Switch>
}

export default Overview