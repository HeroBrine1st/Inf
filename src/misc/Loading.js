import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Loading(props) {
  const classes = useStyles()
  return <Backdrop className={classes.backdrop} open={props.open} transitionDuration={300}>
    <CircularProgress color="inherit" />
  </Backdrop>;
}