import './App.css';
import "../misc/MainAppBar"
import MainAppBar from "../misc/MainAppBar";
import Main from "../main/Main";
import {Component} from "react";
import {Route, BrowserRouter, Switch} from "react-router-dom"
import Variants from "../variants/Variants";
import {SnackbarProvider} from "notistack";


class App extends Component {
  render() {
    return <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <div className="App">
          <MainAppBar/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Main/>
              </Route>
              <Route path="/variants/">
                <Variants/>
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </SnackbarProvider>;
  }
}

export default App;