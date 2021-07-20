import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useSnackbar} from "notistack";
import PropTypes from 'prop-types';
import {useHistory} from "react-router";
import {Done, Error as ErrorIcon} from "@material-ui/icons";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  backdropContent: {
    display: "block",
    textAlign: "center",
  }
}));

const transitionDuration = 300;

function DownloadingJson(props) {
  const [loaded, setLoaded] = useState(false); // Скачано
  const [completed, setCompleted] = useState(false); // Обработано
  const [error, setError] = useState(false); // Ошибка
  const {enqueueSnackbar} = useSnackbar()
  const history = useHistory()
  const classes = useStyles()
  const {url, onError, onResult, quiet} = props;

  useEffect(() => {
    console.log("Start downloading")
    fetch(url).then(async response => {
      if (!response.ok) {
        if (response.status === 404) {
          setError(true)
          setTimeout(() => history.push("/404/"), transitionDuration*2)
          return
        } else throw new Error(response.statusText)
      }
      setLoaded(true)
      onResult(await response.json())
      setCompleted(true)
    }).catch(error => {
      setError(true)
      if (onError) {
        onError(error)
      }
      if (!quiet) enqueueSnackbar("Произошла ошибка при получении данных", {variant: "error"})
      console.error(error)
    })
  }, [url, quiet, enqueueSnackbar, onError, onResult, history])
  let component = <CircularProgress color="inherit"/>
  if(loaded) component = <Done fontSize="large"/>
  if(error) component = <div className={classes.backdropContent}>
    <ErrorIcon fontSize="large"/>
    <Typography variant="h6">Произошла ошибка</Typography>
  </div>
  return <>
    {props.nobackdrop ? (!completed && component) :
      <Backdrop className={classes.backdrop} open={!completed} transitionDuration={transitionDuration}>
          {component}
      </Backdrop>}
    {loaded && props.children}
  </>;
}

DownloadingJson.propTypes = {
  onError: PropTypes.func,
  onResult: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
  quiet: PropTypes.bool,
  nobackdrop: PropTypes.bool
};

export default DownloadingJson;