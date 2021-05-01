import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import Loading from "../misc/Loading";
import {Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SolutionDialog from "./SolutionDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "75%",
    alignSelf: "center",
    margin: "auto",
    marginTop: theme.spacing(4),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}))

function Variant(props) {
  const {variantId} = useParams()
  const {enqueueSnackbar} = useSnackbar()
  const [tasks, setTasks] = useState([])
  const [name, setName] = useState()
  const classes = useStyles()
  useEffect(() => {
    fetch(`/variants/${variantId}.json`)
      .then(it => it.json())
      .then(it => {
          setTasks(it["tasks"])
          setName(it["name"])
        },
        error => {
          console.error(error)
          enqueueSnackbar("Произошла ошибка при получении данных", {variant: "error"})
        }
      )
  }, [enqueueSnackbar, variantId])

  useEffect(() => {
    if(name === undefined) {
      return
    }
    props.setTitle(name)
    return () => {
      props.resetTitle()
    }
  }, [props, name])

  const [expanded, setExpanded] = useState()
  const [dialog, openDialog] = useState(false)
  const [dialogContent, setDialogContent] = useState("")
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return <div className={classes.root}>
    <Loading open={tasks.length === 0}/>
    <Typography variant="h6">Список заданий:</Typography>
    {tasks.length > 0 && tasks.map((it, index) => (
      <Accordion expanded={expanded === index} onChange={handleChange(index)}>
        <AccordionSummary key={it["id"]}
                          expandIcon={<ExpandMoreIcon/>}
                          aria-controls="panel1a-content"
                          id="panel1a-header">
          <Typography className={classes.heading}>{`Задание №${index + 1}`}</Typography>
          <Typography className={classes.secondaryHeading}>А тут типа тема будет</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1">{it["task"]}</Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button variant="outlined" color="secondary" onClick={() => {
            setDialogContent("Тут типа решение будет. Еще какой-то текст чтобы протестировать размер окна. Это обязательно нужно сделать, пока я не написал бекенд, ведь иначе я получу кучу багов после того, как напишу его.")
            openDialog(true)
          }}>Решение</Button>
        </AccordionActions>
      </Accordion>
    ))}
    <SolutionDialog open={dialog} onClose={() => openDialog(false)} solution={dialogContent}/>
  </div>
}

export default Variant