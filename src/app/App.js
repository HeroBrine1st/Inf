import MainAppBar from "./MainAppBar";
import Main from "../main/Main";
import {BrowserRouter} from "react-router-dom"
import {Route, Switch} from "react-router"
import Variants from "../variants/Variants";
import {SnackbarProvider} from "notistack";
import {useCallback, useEffect, useState} from "react";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, useMediaQuery, useTheme} from "@material-ui/core";
import PageNotFound from "./PageNotFound";
import Themes from "../themes/Themes";
import Overview from "../panel/Overview";

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    minHeight: "100vh",
  },
  container: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    textAlign: "left",
    backgroundColor: "#DFDFDF",
    [theme.breakpoints.down("lg")]: { // Мобила
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: { // ПК
      width: "75%",
    },
  },
  dismissButton: {
    color: "white",
  }
}))

function App() {
  const classes = useStyles()
  const notistackRef = React.createRef()
  const isMobile = useMediaQuery(useTheme().breakpoints.down("lg"))
  const [title, setTitle] = useState(() => `${process.env.REACT_APP_TITLE}`)
  const resetTitle = useCallback(() => {
    setTitle(process.env.REACT_APP_TITLE)
  }, []);
  useEffect(() => {
    document.title = title;
  }, [title])
  return <SnackbarProvider
    ref={notistackRef}
    dense={isMobile}
    maxSnack={3}
    action={(key) => (
      <Button onClick={() => notistackRef.current.closeSnackbar(key)} className={classes.dismissButton}>Понятно</Button>)}>
    <BrowserRouter>
      <div className={classes.app}>
        <MainAppBar title={title} navDrawerTitle={process.env.REACT_APP_TITLE}/>
        <div className={classes.container}>
          <Switch>
            <Route exact path="/">
              <Main/>
            </Route>
            <Route path="/variants/">
              <Variants setTitle={setTitle} resetTitle={resetTitle}/>
            </Route>
            <Route path="/themes/">
              <Themes setTitle={setTitle} resetTitle={resetTitle}/>
            </Route>
            <Route path="/panel/">
              <Overview setTitle={setTitle} resetTitle={resetTitle}/>
            </Route>
            <Route path="*"> {/*404*/}
              <PageNotFound/>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </SnackbarProvider>;
}


export default App;