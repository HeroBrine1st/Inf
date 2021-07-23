import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useRef, useState} from "react";
import {Done, Visibility, VisibilityOff} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {green} from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginBottom: theme.spacing(1),
    width: "36ch",
  },
  buttonContainer: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  container: {
    overflow: "hidden",
    position: "relative",
  },
  done: {
    position: "absolute",
    width: "100%",
    height: 0,
    paddingBottom: "100%",
    top: "50%",
    left: "50%",
    borderRadius: "0%",
    transform: "translate(-50%, -50%)",
    animation: "$doneAnimation 1.5s",
    background: green[500],
    zIndex: 10,
  },
  "@keyframes doneAnimation": {
    from: {
      width: "0%",
      height: 0,
      paddingBottom: "0%",
      borderRadius: "50%"
    },
    to: {
      borderRadius: "50%",
      width: "141%",
      height: 0,
      paddingBottom: "141%",
    }
  },
  doneContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 20,
    color: "white",
    fontSize: "48px",
  }
}))

function AuthorizationDialog({handleAuthorized, open, handleClose}) {
  const classes = useStyles()
  const [showPassword, setShowPassword] = useState()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const timer = useRef(0)

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  const handleInput = (setter) => (/**React.ChangeEvent<HTMLInputElement>*/event) => {
    setter(event.target.value)
  }
  const handleButtonClick = () => {
    if (!loading || !success) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        handleAuthorized()
        setTimeout(() => handleClose(), 1500)
      }, 2000);
    }
  };

  return <Dialog open={open} onClose={handleClose}>
    <div className={classes.container}>
      <DialogTitle>
        Авторизация
      </DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <TextField
            className={classes.textField}
            id="login"
            type="text"
            label="Имя пользователя"
            variant="outlined"
            onInput={handleInput(setUsername)}
            value={username}
          />
          <TextField
            className={classes.textField}
            id="password"
            type={showPassword ? "text" : "password"}
            label="Пароль"
            variant="outlined"
            onInput={handleInput(setPassword)}
            value={password}
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <Visibility/> : <VisibilityOff/>}
                </IconButton>
              </InputAdornment>
            }}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" variant="outlined">
          Закрыть
        </Button>
        <div className={classes.buttonContainer}>
          <Button color="primary" variant="contained" onClick={handleButtonClick}
                  disabled={loading} className={buttonClassname}>
            Войти
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress}/>
          )}
        </div>
      </DialogActions>
      {success && <div className={classes.done}/>}
      {success && <div className={classes.doneContent}>
        <Done fontSize="inherit"/>
      </div>}
    </div>
  </Dialog>
}

export default AuthorizationDialog