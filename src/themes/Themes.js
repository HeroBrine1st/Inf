import {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import SubthemeAccordionDetails from "./SubthemeAccordionDetails";
import DownloadingJson from "../misc/DownloadingJson";
import {Route, Switch, useRouteMatch} from "react-router";
import Subtheme from "./Subtheme";
import join from "../utils/join";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("lg")]: { // Мобила
      width: "95%",
    },
    [theme.breakpoints.up("lg")]: { // ПК
      width: "75%",
    },
    alignSelf: "center",
    margin: "auto",
    marginTop: theme.spacing(4),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
}))

function Themes(props) {
  const classes = useStyles()
  const {path} = useRouteMatch()

  const [themes, setThemes] = useState([])
  const [expanded, setExpanded] = useState()

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return <Switch>
    <Route exact path={path}>
      <DownloadingJson onResult={it => setThemes(it)} url={`${process.env.REACT_APP_API_ROOT}/themes/`}>
        <div className={classes.root}>
          {themes.length > 0 && themes.map((it, index) => (
            <Accordion expanded={expanded === index} onChange={handleChange(index)} TransitionProps={{
              mountOnEnter: true,
            }} key={it.id}>
              <AccordionSummary key={it.id}
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                <Typography className={classes.heading}>{it.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SubthemeAccordionDetails id={it.id}/>
              </AccordionDetails>
              <AccordionActions>
                <Button variant="text" color="primary" onClick={() => {
                  setExpanded(false)
                }}>Закрыть</Button>
              </AccordionActions>
            </Accordion>
          ))}
        </div>
      </DownloadingJson>
    </Route>
    <Route path={join(path, ":themeId", "subthemes", ":subthemeId")}>
      <Subtheme setTitle={props.setTitle} resetTitle={props.resetTitle}/>
    </Route>
  </Switch>

}

export default Themes;