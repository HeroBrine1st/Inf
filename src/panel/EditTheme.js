import {useEffect, useState} from "react";
import {
  Button,
  CircularProgress,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useHistory} from "react-router";
import {useSnackbar} from "notistack";
import {green, red} from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "56.25%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "fixed",
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
  },
  button: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  textField: {
    minWidth: "32ch",
  },
  buttonContainer: {
    position: "relative"
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  deleteButton: {
    backgroundColor: red[500],
    color: "white",
    "&:hover": {
      backgroundColor: red[700],
    }
  }
}))

function EditTheme({setTitle, resetTitle}) {
  const classes = useStyles()
  const history = useHistory()
  const {enqueueSnackbar} = useSnackbar()
  const [step, setStep] = useState(0)
  const [allThemes, setAllThemes] = useState([])
  const [selectedTheme, selectTheme] = useState(null)
  const [name, setName] = useState("")
  const [themesLoading, setThemesLoading] = useState(false)
  const [themePushing, setThemePushing] = useState(false)
  const [promptDeletion, setPromptDeletion] = useState(false)

  useEffect(() => {
    setTitle("Редактирование темы")
    return resetTitle
  }, [setTitle, resetTitle])

  const loadThemes = () => {
    if (themesLoading) return
    setThemesLoading(true)
    setAllThemes([])
    fetch(`${process.env.REACT_APP_API_ROOT}/themes/`).then(async response => {
      if(!response.ok) throw new Error(response.statusText)
      const /**Array*/result = await response.json()
      result.unshift({id: -1, name: "Создать новую"})
      setAllThemes(result)
      setThemesLoading(false)
    }).catch(error => {
      console.error(error)
      enqueueSnackbar("Произошла неизвестная ошибка", {variant: "error"})
      history.push("/");
    })
  }

  return <div className={classes.root}>
    <Paper>
      <Stepper orientation="vertical" activeStep={step}>
        <Step key={0}>
          <StepLabel>Выберите тему</StepLabel>
          <StepContent>
            <Autocomplete
              noOptionsText="Не найдено"
              loadingText="Загрузка.."
              onOpen={() => {
                loadThemes()
              }}
              options={allThemes}
              getOptionLabel={it => it["name"]}
              getOptionSelected={(option, value) => option["id"] === value["id"]}
              loading={themesLoading}
              onChange={(event, newValue) => {
                selectTheme(newValue)
              }}
              value={selectedTheme}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Тема"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {themesLoading ? <CircularProgress color="inherit" size={20}/> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <div className={classes.actionsContainer}>
              <Button disabled className={classes.button}>
                Назад
              </Button>
              <Button variant="contained" color="primary" className={classes.button} disabled={selectedTheme == null}
                      onClick={() => {
                        setStep(1);
                        if (selectedTheme["id"] !== -1)
                          setName(selectedTheme["name"])
                        else setName("")
                      }}>Дальше</Button>
            </div>
          </StepContent>
        </Step>
        <Step key={1}>
          <StepLabel>Введите значения</StepLabel>
          <StepContent>
            <TextField
              fullWidth
              id="theme_name"
              name="theme_name"
              type="text"
              label="Название"
              variant="outlined"
              onInput={/**React.ChangeEvent<HTMLInputElement>*/event => setName(event.target.value)}
              value={name}
              error={name.length === 0}
              helperText={name.length === 0 && "Название темы не может быть пустым!"}
            />
            <div className={classes.actionsContainer}>
              <Button className={classes.button} onClick={() => setStep(0)}>
                Назад
              </Button>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" className={classes.button}
                        disabled={name.length === 0 || themePushing}
                        onClick={() => {
                          setThemePushing(true)
                          const body = JSON.stringify({
                            "name": name,
                          })
                          let url = `${process.env.REACT_APP_API_ROOT}/themes/`
                          if (selectedTheme["id"] !== -1) url += `${selectedTheme["id"]}/`
                          const method = selectedTheme["id"] === -1 ? "POST" : "PUT"
                          fetch(url, {
                            method: method,
                            credentials: "same-origin",
                            body: body,
                            headers: {
                              "Content-Type": "application/json"
                            }
                          }).then(async response => {
                            if (!response.ok) {
                              setThemePushing(false)
                              enqueueSnackbar("Произошла неизвестная ошибка", {variant: "error"})
                              console.error(response.statusText)
                              return
                            }
                            selectTheme(await response.json())
                            setThemePushing(false)
                            enqueueSnackbar(`Тема ${method === "POST" ? "создана" : "изменена"}!`, {variant: "success"})
                          }).catch(error => {
                            setThemePushing(false)
                            enqueueSnackbar("Произошла неизвестная ошибка", {variant: "error"})
                            console.error(error)
                          })
                        }}>Готово</Button>
                {themePushing && (
                  <CircularProgress size={24} className={classes.buttonProgress}/>
                )}
              </div>
              <div className={classes.buttonContainer}>
                <Button variant="contained" className={clsx(classes.button, classes.deleteButton)}
                        disabled={themePushing || (selectedTheme && selectedTheme["id"] === -1)}
                        onClick={() => {
                          if (!promptDeletion) {
                            setPromptDeletion(true)
                            setTimeout(() => setPromptDeletion(false), 500)
                            return
                          }
                          setPromptDeletion(false)
                          setThemePushing(true)
                          let url = `${process.env.REACT_APP_API_ROOT}/themes/${selectedTheme["id"]}/`
                          fetch(url, {
                            method: "DELETE",
                            credentials: "same-origin",
                          }).then(response => {
                            setThemePushing(false)
                            if (!response.ok) {
                              enqueueSnackbar("Произошла неизвестная ошибка", {variant: "error"})
                              console.error(response.statusText)
                              return
                            }
                            enqueueSnackbar(`Тема удалена!`, {variant: "success"})
                            setStep(0)
                            selectTheme(null)
                          }).catch(error => {
                            setThemePushing(false)
                            enqueueSnackbar("Произошла неизвестная ошибка", {variant: "error"})
                            console.error(error)
                          })
                        }}>
                  {promptDeletion ? "Точно?" : "Удалить"}
                </Button>
                {themePushing && (
                  <CircularProgress size={24} className={classes.buttonProgress}/>
                )}
              </div>
            </div>
          </StepContent>
        </Step>
      </Stepper>
    </Paper>
  </div>
}

export default EditTheme