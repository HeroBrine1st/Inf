import {
  Drawer,
  List,
  ListItem,
  ListItemIcon, ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Tooltip
} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {AccountBox, Edit, HelpOutline, Home, LibraryBooks, School, Settings} from "@material-ui/icons";
import DownloadingJson from "../misc/DownloadingJson";
import AuthorizationDialog from "../panel/AuthorizationDialog";

const useStyles = makeStyles((theme) => ({
  link: {
    '&:hover': {
      color: "#202124"
    },
  },
  list: {
    width: theme.spacing(35),
  },
  footer: {
    position: "absolute",
    bottom: theme.spacing(3.5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    textAlign: "center",
    alignSelf: "center",
  },
  menuButton: {
    marginRight: theme.spacing(1), // Чтобы текст после кноп очки лежал как надо
  },
  title: {
    margin: "right",
    color: theme.palette.primary,
  },
}))

function NavigationDrawer(props) {
  const classes = useStyles()
  const [authorized, setAuthorized] = useState()
  const [openAuthDialog, setOpenAuthDialog] = useState(false)
  const [authDisabled, setAuthDisabled] = useState(false)
  return <>
    <Drawer anchor="left" variant="temporary" open={props.open} onClose={props.onClose}
            BackdropProps={{invisible: true}} keepMounted>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}
                    onClick={props.onClose}>
          <ArrowBackIcon/>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {props.title}
        </Typography>
      </Toolbar>
      <List className={classes.list} onClick={props.onClose}>
        <ListSubheader>Навигация</ListSubheader>
        <ListItem button component={Link} to="/" key="home">
          <ListItemIcon><Home/></ListItemIcon>
          <ListItemText>На главную страницу</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/variants" key="by-variants">
          <ListItemIcon><School/></ListItemIcon>
          <ListItemText>По вариантам</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/themes" key="by-themes">
          <ListItemIcon><LibraryBooks/></ListItemIcon>
          <ListItemText>По темам</ListItemText>
        </ListItem>
        <ListSubheader>Управление</ListSubheader>
        <DownloadingJson
          onResult={() => setAuthorized(true)}
          url={`${process.env.REACT_APP_API_ROOT}/checkauth`}
          onError={() => {
            setAuthDisabled(true) // No connection to server
            return true
          }}
          onHttpError={/**Response*/it => {
            if (it.status === 503) {
              setAuthDisabled(true)
            }
            setAuthorized(false)
            return true
          }}
          noBackdrop quiet linear>
          {authorized ?
            <>
              <ListItem button component={Link} to="/panel" key="overview">
                <ListItemIcon><Settings/></ListItemIcon>
                <ListItemText>Панель управления</ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/panel/variant" key="edit_variant">
                <ListItemIcon><Edit/></ListItemIcon>
                <ListItemText>Редактирование вариантов</ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/panel/task" key="edit_task">
                <ListItemIcon><Edit/></ListItemIcon>
                <ListItemText>Редактирование заданий</ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/panel/theme" key="edit_theme">
                <ListItemIcon><Edit/></ListItemIcon>
                <ListItemText>Редактирование тем</ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/panel/subtheme" key="edit_subtheme">
                <ListItemIcon><Edit/></ListItemIcon>
                <ListItemText>Редактирование подтем</ListItemText>
              </ListItem>
            </> :
            (!authDisabled ?
              <ListItem button key="auth" onClick={() => {
                setOpenAuthDialog(true);
                props.onClose()
              }}>
                <ListItemIcon><AccountBox/></ListItemIcon>
                <ListItemText>Войти</ListItemText>
                <ListItemSecondaryAction>
                  <Tooltip title="Для разработчиков" placement="right" arrow>
                    <HelpOutline/>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem> :
                <ListItem key="auth_disabled">
                  <ListItemIcon><AccountBox/></ListItemIcon>
                  <ListItemText>Заблокировано</ListItemText>
                  <ListItemSecondaryAction>
                    <Tooltip title="Для разработчиков" placement="right" arrow>
                      <HelpOutline/>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
            )
          }
        </DownloadingJson>
      </List>

      <div className={classes.footer}>
        {/*<Typography variant="caption" color="textSecondary">*/}
        {/*  <MLink href="https://github.com/HeroBrine1st/Inf" target="_blank" rel="noopener noreferrer" underline="none"*/}
        {/*         color="textSecondary" className={classes.link}>Исходный код</MLink>*/}
        {/*</Typography>*/}
      </div>
    </Drawer>
    <AuthorizationDialog
      handleAuthorized={() => setAuthorized(true)}
      handleClose={() => setOpenAuthDialog(false)}
      open={openAuthDialog}/>
  </>
}

NavigationDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default NavigationDrawer