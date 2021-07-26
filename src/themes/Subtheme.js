import {useHistory, useParams} from "react-router";
import {useCallback, useEffect, useRef, useState} from "react";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card, CardActions,
  CardContent
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SolutionDialog from "../variants/SolutionDialog";
import DownloadingJson from "../misc/DownloadingJson";
import {Link} from "react-router-dom";
import validatePositiveNumber from "../utils/validatePositiveNumber";
import RenderMarkdown from "../misc/RenderMarkdown";
import ReactToPrint from "react-to-print";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("lg")]: { // Мобила
      width: "95%",
    },
    [theme.breakpoints.up("lg")]: { // ПК
      width: "75%",
    },
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    margin: "auto",
    marginTop: theme.spacing(4),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    [theme.breakpoints.down("lg")]: { // Мобила
      flexBasis: "40%",
    },
    [theme.breakpoints.up("lg")]: { // ПК
      flexBasis: "33.33%",
    },
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  cheat: {
    margin: theme.spacing(1),
  },
  cheatPaper: {
    width: "50%",
    alignSelf: "center",
  }
}))

function Subtheme(props) {
  const classes = useStyles()
  const {themeId, subthemeId} = useParams()
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState()
  const [cheat, setCheat] = useState()
  const [dialog, openDialog] = useState(false)
  const [dialogContent, setDialogContent] = useState("")
  const [expanded, setExpanded] = useState()
  const history = useHistory()
  const cheatRef = useRef()
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  if (!validatePositiveNumber(themeId)) history.push("/404/")
  if (!validatePositiveNumber(subthemeId)) history.push("/404/")
  useEffect(() => {
    if (name === undefined) {
      return
    }
    props.setTitle(name)
    return () => {
      props.resetTitle()
    }
  }, [props, name])

  return <DownloadingJson
    onResult={useCallback(it => {
      setTasks(it["tasks"])
      setName(it["name"])
      setCheat(it["cheat"])
    }, [])}
    url={`${process.env.REACT_APP_API_ROOT}/themes/${themeId}/subthemes/${subthemeId}`}>
    <div className={classes.root}>
      <Card className={classes.cheatPaper}>
        <CardContent>
          <div ref={cheatRef} className={classes.cheat}>
            <Typography variant="h6">Методика решения задач подтемы "{name}":</Typography>
            <RenderMarkdown>{cheat}</RenderMarkdown>
          </div>
        </CardContent>
        <CardActions>
          <ReactToPrint
            content={() => cheatRef.current}
            trigger={() => (
              <Button>Распечатать</Button>
            )}/>
        </CardActions>
      </Card>
      <Typography variant="h6">Список заданий:</Typography>
      {tasks.map((it, index) => (
        <Accordion expanded={expanded === index} onChange={handleChange(index)} key={it["id"]}>
          <AccordionSummary key={it.id}
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
            <Typography className={classes.heading}>Задание #{it.id}</Typography>
            <Typography className={classes.secondaryHeading}>
              {it["variant"].name} (<Link to={`/variants/${it["variant"].id}`}>#{it["variant"].id}</Link>)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RenderMarkdown>
              {it["content"]}
            </RenderMarkdown>
          </AccordionDetails>
          <AccordionActions>
            <Button variant="outlined" color="secondary" onClick={() => {
              setDialogContent(it["solution"])
              openDialog(true)
            }}>Решение</Button>
          </AccordionActions>
        </Accordion>
      ))}
      <SolutionDialog open={dialog} onClose={() => openDialog(false)} solution={dialogContent}/>
    </div>
  </DownloadingJson>
}

export default Subtheme