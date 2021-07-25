import React, {useEffect, useRef, useState} from "react";
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
  nobackdrop: {},
  nobackdropLinear: {
    margin: "0 auto",
    width: "100%",
  }
}));

const LOADING = 0;
const COMPLETED = 1;
const ERROR = -1;

const transitionDuration = 300;

function DownloadingJson({url, onError, onResult, onHttpError, quiet, children, description, nobackdrop, linear, minDelay}) {
  const [state, setState] = useState(LOADING)
  const {enqueueSnackbar} = useSnackbar()
  const history = useHistory()
  const classes = useStyles()
  // Чтобы не было бесконечного цикла без useCallback
  const onResultRef = useRef()
  const onErrorRef = useRef()
  const onHttpErrorRef = useRef()
  onResultRef.current = onResult
  onErrorRef.current = onError
  onHttpErrorRef.current = onHttpError || onError
  // Костыль, чтобы анимации успели отрисоваться, а то дохрена лагающим выглядит иногда
  const [minTime] = useState(Date.now() + (minDelay || 0))
  useEffect(() => {
    let pending = true
    fetch(url, {
      credentials: "same-origin"
    }).then(async response => {
      if (!response.ok) {
        if(!pending) return
        if (response.status === 404) {
          setState(ERROR)
          setTimeout(() => history.push("/404/"), transitionDuration * 2)
        } else (onHttpErrorRef.current && onHttpErrorRef.current(response)) ? setState(COMPLETED) : setState(ERROR)
        return
      }
      if (minTime - Date.now() > 0) {
        await new Promise(resolve => setTimeout(resolve, minTime - Date.now()))
      }
      if (!pending) return
      if(response.status === 204) onResultRef.current(); else onResultRef.current(await response.json())
      setState(COMPLETED)
    }).catch(error => {
      if (!pending) return
      if (!quiet) enqueueSnackbar("Произошла ошибка при получении данных", {variant: "error"}); // ТОЧКУ С ЗАПЯТОЙ НЕ УБИРАТЬ
      (onErrorRef.current && onErrorRef.current(error)) ? setState(COMPLETED) : setState(ERROR)
      console.error(error)
    })
    return () => {
      pending = false
    }
  }, [url, quiet, enqueueSnackbar, onErrorRef, onResultRef, onHttpErrorRef, history, minTime])
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
        {linear ? <LinearProgress/> : <CircularProgress color="inherit"/>}
        {description && <Typography variant="h6">{description}</Typography>}
      </>
      break;
  }
  return <>
    {nobackdrop ? (state !== COMPLETED &&
      <div className={linear ? classes.nobackdropLinear : classes.nobackdrop}>{component}</div>) :
      <Backdrop className={classes.backdrop} open={state !== COMPLETED} transitionDuration={transitionDuration}>
        <div className={classes.backdropContent}>{component}</div>
      </Backdrop>}
    {state === COMPLETED && children}
  </>;
}

DownloadingJson.propTypes = {
  onError: PropTypes.func,
  onHttpError: PropTypes.func,
  onResult: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  quiet: PropTypes.bool,
  nobackdrop: PropTypes.bool,
  linear: PropTypes.bool,
  description: PropTypes.string,
  minDelay: PropTypes.number,
};

export default DownloadingJson;