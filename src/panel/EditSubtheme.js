import { useEffect, useState } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";
import { green, red } from "@material-ui/core/colors";
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
    marginBottom: theme.spacing(1),
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

function EditTheme({ setTitle, resetTitle }) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [step, setStep] = useState(0)

  // Step 1
  const [allThemes, setAllThemes] = useState([])
  const [selectedTheme, selectTheme] = useState(null)
  const [themesLoading, setThemesLoading] = useState(false)

  // Step 2
  const [subthemesLoading, setSubthemesLoading] = useState(false)
  const [selectedSubtheme, selectSubtheme] = useState(null)
  const [allSubthemes, setAllSubthemes] = useState([])

  // Step 3
  const [name, setName] = useState("")
  const [cheat, setCheat] = useState("")
  const [subthemePushing, setSubthemePushing] = useState(false)
  const [promptDeletion, setPromptDeletion] = useState(false)

  useEffect(() => {
    setTitle("Редактирование подтемы")
    return resetTitle
  }, [setTitle, resetTitle])

  const loadThemes = () => {
    if (themesLoading) return
    setThemesLoading(true)
    setAllThemes([])
    fetch(`${process.env.REACT_APP_API_ROOT}/themes/`).then(async response => {
      setAllThemes(await response.json())
      setThemesLoading(false)
    }).catch(error => {
      console.error(error)
      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
      history.push("/");
    })
  }

  const loadSubthemes = () => {
    if (subthemesLoading) return
    setSubthemesLoading(true)
    setAllSubthemes([])
    fetch(`${process.env.REACT_APP_API_ROOT}/themes/${selectedTheme["id"]}/subthemes/`).then(async response => {
      if (!response.ok) throw new Error(response.statusText)
      const /**Array*/result = await response.json()
      result.unshift({
        id: -1,
        name: "Создать новую",
        cheat: ""
      })
      setAllSubthemes(result)
      setSubthemesLoading(false)
    }).catch(error => {
      console.error(error)
      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && selectedTheme != null) {
                      setStep(1);
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {themesLoading ? <CircularProgress color="inherit" size={20} /> : null}
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
                }}>Дальше</Button>
            </div>
          </StepContent>
        </Step>
        <Step key={1}>
          <StepLabel>Выберите подтему</StepLabel>
          <StepContent>
            <Autocomplete
              noOptionsText="Не найдено"
              loadingText="Загрузка.."
              onOpen={() => {
                loadSubthemes()
              }}
              options={allSubthemes}
              getOptionLabel={it => it["name"]}
              getOptionSelected={(option, value) => option["id"] === value["id"]}
              loading={themesLoading}
              onChange={(event, newValue) => {
                selectSubtheme(newValue)
              }}
              value={selectedSubtheme}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Подтема"
                  variant="outlined"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && selectedSubtheme != null) {
                      setStep(2);
                      if (selectedSubtheme["id"] === -1) setName("")
                      else setName(selectedSubtheme["name"])
                      setCheat(selectedSubtheme["cheat"])
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {themesLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <div className={classes.actionsContainer}>
              <Button className={classes.button} onClick={() => setStep(0)}>
                Назад
              </Button>
              <Button variant="contained" color="primary" className={classes.button} disabled={selectedSubtheme == null}
                onClick={() => {
                  setStep(2);
                  if (selectedSubtheme["id"] === -1) setName("")
                  else setName(selectedSubtheme["name"])
                  setCheat(selectedSubtheme["cheat"])
                }}>Дальше</Button>
            </div>
          </StepContent>
        </Step>
        <Step key={2}>
          <StepLabel>Введите значения</StepLabel>
          <StepContent>
            <TextField
              className={classes.textField}
              fullWidth
              id="theme_name"
              name="theme_name"
              type="text"
              label="Название"
              variant="outlined"
              onInput={/**React.ChangeEvent<HTMLInputElement>*/event => setName(event.target.value)}
              value={name}
              error={name.length === 0}
              helperText={name.length === 0 && "Название подтемы не может быть пустым!"}
            />
            <TextField
              className={classes.textField}
              fullWidth
              id="theme_name"
              name="theme_name"
              type="text"
              label="Методика решения"
              variant="outlined"
              onInput={/**React.ChangeEvent<HTMLInputElement>*/event => setCheat(event.target.value)}
              value={cheat}
              error={cheat.length === 0}
              helperText={cheat.length === 0 && "Методика решения не может быть пустой!"}
              multiline rowsMax={7} />
            <div className={classes.actionsContainer}>
              <Button className={classes.button} onClick={() => setStep(1)}>
                Назад
              </Button>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" className={classes.button}
                  disabled={name.length === 0 || subthemePushing}
                  onClick={() => {
                    setSubthemePushing(true)
                    const body = JSON.stringify({
                      "name": name,
                      "cheat": cheat,
                    })
                    let url = `${process.env.REACT_APP_API_ROOT}/themes/${selectedTheme["id"]}/subthemes/`
                    if (selectedSubtheme["id"] !== -1) url += `${selectedSubtheme["id"]}/`
                    const method = selectedSubtheme["id"] === -1 ? "POST" : "PUT"
                    fetch(url, {
                      method: method,
                      credentials: "same-origin",
                      body: body,
                      headers: {
                        "Content-Type": "application/json"
                      }
                    }).then(async response => {
                      if (!response.ok) {
                        setSubthemePushing(false)
                        enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
                        console.error(response.statusText)
                        return
                      }
                      selectSubtheme(await response.json())
                      setSubthemePushing(false)
                      enqueueSnackbar(`Подтема ${method === "POST" ? "создана" : "изменена"}!`, { variant: "success" })
                    }).catch(error => {
                      setSubthemePushing(false)
                      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
                      console.error(error)
                    })
                  }}>Готово</Button>
                {subthemePushing && (
                  <CircularProgress size={24} className={classes.buttonProgress} />
                )}
              </div>
              <div className={classes.buttonContainer}>
                <Button variant="contained" className={clsx(classes.button, classes.deleteButton)}
                  disabled={subthemePushing || (selectedSubtheme && selectedSubtheme["id"] === -1)}
                  onClick={() => {
                    if (!promptDeletion) {
                      setPromptDeletion(true)
                      setTimeout(() => setPromptDeletion(false), 500)
                      return
                    }
                    setPromptDeletion(false)
                    setSubthemePushing(true)
                    let url = `${process.env.REACT_APP_API_ROOT}/themes/${selectedTheme["id"]}/subthemes/${selectedSubtheme["id"]}`
                    fetch(url, {
                      method: "DELETE",
                      credentials: "same-origin",
                    }).then(response => {
                      setSubthemePushing(false)
                      if (!response.ok) {
                        enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
                        console.error(response.statusText)
                        return
                      }
                      enqueueSnackbar(`Подтема удалена!`, { variant: "success" })
                      setStep(0)
                      selectTheme(null)
                      selectSubtheme(null)
                    }).catch(error => {
                      setSubthemePushing(false)
                      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
                      console.error(error)
                    })
                  }}>
                  {promptDeletion ? "Точно?" : "Удалить"}
                </Button>
                {subthemePushing && (
                  <CircularProgress size={24} className={classes.buttonProgress} />
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