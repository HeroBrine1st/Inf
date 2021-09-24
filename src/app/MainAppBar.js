import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HideOnScroll from "../misc/HideOnScroll";
import {makeStyles} from "@material-ui/core";
import NavigationDrawer from "./NavigationDrawer";
import {Link} from "react-router-dom";
import {MoreVert} from "@material-ui/icons";
import AppBarMenu from './AppBarMenu';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1), // Чтобы текст после кноп очки лежал как надо
  },
  title: {
    margin: "right",
    color: "white",
    textDecoration: "none",
    outline: "0",
    '&:hover': {
      color: "white",
    },
  },
}));

function MainAppBar(props) {
  const classes = useStyles();
  const [drawer, setDrawer] = React.useState(false);
  const [buttonAnchor, setButtonAnchor] = React.useState(null);

  const handleClick = (event) => {
    setButtonAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setButtonAnchor(null);
  };

  return <>
    <HideOnScroll>
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}
                      onClick={() => setDrawer(!drawer)}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title} component={Link} to="/">
            {props.title + (process.env.NODE_ENV !== 'production' ? " // Режим разработчика" : "")}
          </Typography>
          <div style={{flexGrow: 1}}/>
          <IconButton edge="end" color="inherit" onClick={handleClick}>
            <MoreVert/>
          </IconButton>
          <AppBarMenu buttonAnchor={buttonAnchor} handleClose={handleClose}/>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    <Toolbar/>
    <NavigationDrawer open={drawer} onClose={() => setDrawer(false)} title={props.navDrawerTitle}/>
  </>;
}


export default MainAppBar