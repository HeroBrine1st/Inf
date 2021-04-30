import MainAppBar from "../misc/MainAppBar";
import Main from "../main/Main";
import {Route, BrowserRouter, Switch} from "react-router-dom"
import Variants from "../variants/Variants";
import {SnackbarProvider} from "notistack";
import {useState} from "react";
import {Redirect} from "react-router";
import {Toolbar} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "75%",
    },

  },
}))

function App() {
  const classes = useStyles()
  const [title, setTitle] = useState("Информатика")
  const resetTitle = () => {
    setTitle("Информатика")
  };
  document.title = title
  return <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
      <div className={classes.app}>
        <MainAppBar title={title}/>
        <div className={classes.container}>
          <Toolbar/>
          <Switch>
            <Route exact path="/">
              <Main/>
            </Route>
            <Route path="/variants/">
              <Variants setTitle={setTitle} resetTitle={resetTitle}/>
            </Route>
            <Route path="*"> {/*404*/}
              <Redirect to="/"/>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </SnackbarProvider>;
}


export default App;