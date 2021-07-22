import {useHistory, useParams} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SolutionDialog from "./SolutionDialog";
import DownloadingJson from "../misc/DownloadingJson";
import validatePositiveNumber from "../utils/validatePositiveNumber";
import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";

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
  }
}))

function Variant(props) {
  const classes = useStyles()
  const {variantId} = useParams()
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState()
  const [dialog, openDialog] = useState(false)
  const [dialogContent, setDialogContent] = useState("")
  const [expanded, setExpanded] = useState()
  const history = useHistory()
  if (!validatePositiveNumber(variantId)) history.push("/404/")
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
    }, [])}
    url={`${process.env.REACT_APP_API_ROOT}/variants/${variantId}/`}>
    <div className={classes.root}>
      {tasks.length !== 0 && <Typography variant="h6">Список заданий:</Typography>}
      {tasks.length > 0 && tasks.sort((a, b) => a.number - b.number).map((it, index) => (
        <Accordion expanded={expanded === index} onChange={handleChange(index)} key={it["id"]}>
          <AccordionSummary key={it.id}
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
            <Typography className={classes.heading}>Задание №{it.number}</Typography>
            <Typography className={classes.secondaryHeading}>
              {it["subtheme"].name} (<Link
              to={`/themes/${it["subtheme"]["theme_id"]}/subthemes/${it["subtheme"].id}`}>#{it["subtheme"].id}</Link>)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
              <ReactMarkdown>
                {it["content"]}
              </ReactMarkdown>
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

export default Variant