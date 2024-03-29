import React, {useEffect} from "react";
import {Route, Switch, useRouteMatch} from "react-router";
import join from "../utils/join";
import EditVariant from "./EditVariant";
import PageNotFound from "../app/PageNotFound";
import EditTask from "./EditTask";
import EditTheme from "./EditTheme";
import EditSubtheme from "./EditSubtheme";

// const useStyles = makeStyles((theme) => ({
//   root: {
//
//   }
// }))

function Overview({setTitle, resetTitle}) {
  // const classes = useStyles()
  const {path, isExact} = useRouteMatch()
  useEffect(() => {
    if(!isExact) return
    setTitle("Панель управления")
    return resetTitle
  }, [setTitle, resetTitle, isExact])
  return <Switch>
    <Route exact path={path}>
      TODO
    </Route>
    <Route path={join(path, "variant")}>
      <EditVariant setTitle={setTitle} resetTitle={resetTitle}/>
    </Route>
    <Route path={join(path, "task")}>
      <EditTask setTitle={setTitle} resetTitle={resetTitle}/>
    </Route>
    <Route path={join(path, "theme")}>
      <EditTheme setTitle={setTitle} resetTitle={resetTitle}/>
    </Route>
    <Route path={join(path, "subtheme")}>
      <EditSubtheme setTitle={setTitle} resetTitle={resetTitle}/>
    </Route>
    <Route path="*"> {/*404*/}
      <PageNotFound/>
    </Route>
  </Switch>
}

export default Overview