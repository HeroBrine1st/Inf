import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSnackbar} from "notistack";
import PropTypes from 'prop-types';
import {useHistory} from "react-router";
import {Done, Error as ErrorIcon} from "@material-ui/icons";
import {LinearProgress, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  backdropContent: {
    display: "block",
    textAlign: "center",
    width: "100%",
  },
  nobackdrop: {
    margin: "0 auto",
    width: "100%",
  }
}));

const LOADING = 0;
const COMPLETED = 1;
const ERROR = -1;

const transitionDuration = 300;

function DownloadingJson({url, onError, onResult, quiet, children, description, nobackdrop, linear}) {
  const [state, setState] = useState(LOADING);
  const {enqueueSnackbar} = useSnackbar()
  const history = useHistory()
  const classes = useStyles()
  if(linear && !nobackdrop) throw new Error("linear can be used only with nobackdrop")
  useEffect(() => {
    fetch(url).then(async response => {
      if (!response.ok) {
        if (response.status === 404) {
          setState(ERROR)
          setTimeout(() => history.push("/404/"), transitionDuration * 2)
          return
        } else throw new Error(response.statusText)
      }
      onResult(await response.json())
      setState(COMPLETED)
    }).catch(error => {
      setState(ERROR)
      if (onError) {
        onError(error)
      }
      if (!quiet) enqueueSnackbar("Произошла ошибка при получении данных", {variant: "error"})
      console.error(error)
    })
  }, [url, quiet, enqueueSnackbar, onError, onResult, history])
  let component
  switch (state) {
    case COMPLETED:
      component = <Done fontSize="large"/>
      break;
    case ERROR:
      component = <>
        <ErrorIcon fontSize="large"/>
        <Typography variant="h6">Произошла ошибка</Typography>
      </>
      break;
    default:
      component = <>
        {linear ? <LinearProgress color="primary"/> : <CircularProgress color="inherit"/>}
        {description && <Typography variant="h6">{description}</Typography>}
      </>
      break;
  }
  return <>
    {nobackdrop ? (state !== COMPLETED && <div className={classes.nobackdrop}>{component}</div>) :
      <Backdrop className={classes.backdrop} open={state !== COMPLETED} transitionDuration={transitionDuration}>
        <div className={classes.backdropContent}>{component}</div>
      </Backdrop>}
    {state === COMPLETED && children}
  </>;
}

DownloadingJson.propTypes = {
  onError: PropTypes.func,
  onResult: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
  quiet: PropTypes.bool,
  nobackdrop: PropTypes.bool,
  linear: PropTypes.bool,
  description: PropTypes.string,
};

export default DownloadingJson;