import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Grow,
  InputAdornment,
  TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
import {Done, Visibility, VisibilityOff} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {green, red} from "@material-ui/core/colors";
import clsx from "clsx";
import {useSnackbar} from "notistack";

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
  buttonError: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700]
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
      width: "142%",
      height: 0,
      paddingBottom: "142%",
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
  const [usernameError, setUsernameError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const {enqueueSnackbar} = useSnackbar()

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonError]: error
  });

  const close = () => !loading && handleClose()

  const handleInput = (setter) => (/**React.ChangeEvent<HTMLInputElement>*/event) => {
    setUsernameError("")
    setPasswordError("")
    setError(false)
    setter(event.target.value)
  }
  const handleButtonClick = () => {
    if (!loading || !success) {
      if (username.length === 0) {
        setUsernameError("Имя пользователя не может быть пустым!")
      }
      if (password.length === 0) {
        setPasswordError("Пароль не может быть пустым!")
      }
      if (username.length === 0 || password.length === 0) return;
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_ROOT}/login`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `username=${username}&password=${password}`
      }).then(async it => {
        setLoading(false)
        if (!it.ok) {
          setError(true)
          if (it.status === 503) {
            enqueueSnackbar("Авторизация отключена на серверной стороне", {variant: "error"})
            handleClose()
          } else if (it.status === 401) {
            enqueueSnackbar("Неправильное имя пользователя или пароль", {variant: "error"})
          } else {
            throw new Error(it.statusText)
          }
          return
        }
        if (it.status === 204) {
          setSuccess(true)
          setTimeout(() => handleClose(), 1500)
          handleAuthorized()
        }
      }).catch(it => {
        setLoading(false)
        setError(true)
        enqueueSnackbar("Произошла неизвестная ошибка", {variant: "error"})
        console.error(it)
      })
    }
  };

  return <Dialog open={open} onClose={close}>
    <div className={classes.container}>
      <DialogTitle>
        Авторизация
      </DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <TextField
            className={classes.textField}
            id="login"
            name="username"
            type="text"
            label="Имя пользователя"
            variant="outlined"
            onInput={handleInput(setUsername)}
            value={username}
            error={usernameError.length !== 0}
            helperText={usernameError}
          />
          <TextField
            className={classes.textField}
            id="password"
            name="password"
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
            error={passwordError.length !== 0}
            helperText={passwordError}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Grow in={!loading}>
          <Button onClick={close} color="default" variant="outlined">
            Закрыть
          </Button>
        </Grow>
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