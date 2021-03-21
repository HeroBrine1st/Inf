import './App.css';
import "../misc/MainAppBar"
import MainAppBar from "../misc/MainAppBar";
import Main from "../main/Main";
import {Route, BrowserRouter, Switch} from "react-router-dom"
import Variants from "../variants/Variants";
import {SnackbarProvider} from "notistack";
import {useState} from "react";


function App() {
  const [title, setTitle] = useState("Информатика")
  const resetTitle = () => {
    setTitle("Информатика")
  };
  document.title = title
  return <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
      <div className="App">
        <MainAppBar title={title}/>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Main/>
            </Route>
            <Route path="/variants/">
              <Variants setTitle={setTitle} resetTitle={resetTitle}/>
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  </SnackbarProvider>;
}


export default App;