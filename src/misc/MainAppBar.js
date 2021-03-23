import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HideOnScroll from "./HideOnScroll";
import {makeStyles} from "@material-ui/core";

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NavigationDrawer from "./NavigationDrawer";
import {Link} from "react-router-dom";

// В CSS эту хуйню не вывести :/
const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1, // TODO кажись юзлесс
    position: 'relative', // Чтобы дравер открывался под тулбаром
    zIndex: 1400, // Это тоже
  },
  menuButton: {
    marginRight: theme.spacing(2), // Чтобы текст после кноп очки лежал как надо
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
  return <div>
    <div className={classes.appBar}>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}
                        onClick={() => setDrawer(!drawer)}>
              {drawer ? (<ArrowBackIcon/>) : (<MenuIcon/>)}
            </IconButton>
            <Typography variant="h6" className={classes.title} component={Link} to="/">
              {props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

    </div>
    <NavigationDrawer open={drawer} onClose={() => setDrawer(false)}/>
  </div>;
}


export default MainAppBar