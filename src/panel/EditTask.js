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

function EditVariant({setTitle, resetTitle}) {
  const classes = useStyles()
  const history = useHistory()
  const {enqueueSnackbar} = useSnackbar()
  const [step, setStep] = useState(0)

  // Step 1
  const [variantsLoading, setVariantsLoading] = useState(false)
  const [selectedVariant, selectVariant] = useState(null)
  const [allVariants, setAllVariants] = useState([])

  // Step 2
  const [tasksLoading, setTasksLoading] = useState(false)
  const [selectedTask, selectTask] = useState(null)
  const [allTasks, setAllTasks] = useState([])

  // Step 3
  const [subthemesLoading, setSubthemesLoading] = useState(false)
  const [selectedSubtheme, selectSubtheme] = useState(null)
  const [allSubthemes, setAllSubthemes] = useState([])
  const [content, setContent] = useState("")
  const [solution, setSolution] = useState("")
  const [number, setNumber] = useState(-1)
  const [promptDeletion, setPromptDeletion] = useState(false)

  useEffect(() => {
    setTitle("Редактирование задания")
    return resetTitle
  }, [setTitle, resetTitle])

  const loadVariants = () => {
    if (variantsLoading) return
    setVariantsLoading(true)
    setAllVariants([])
    fetch(`${process.env.REACT_APP_API_ROOT}/variants/`).then(async response => {
      setAllVariants(await response.json())
      setVariantsLoading(false)
    }).catch(error => {
      console.error(error)
      enqueueSnackbar("Произошла неизвестная ошибка", {variant: "error"})
      history.push("/");
    })
  }

  const loadTasks = () => {
    if (selectedVariant == null) return
    setTasksLoading(true)
    setAllTasks([])
    fetch(`${process.env.REACT_APP_API_ROOT}/variants/${selectedVariant["id"]}/tasks/`).then(async response => {
      const tasks = await response.json()
      tasks.unshift({
        id: -1,
        subtheme: null,
        content: "",
        solution: "",
        variant: selectedVariant,
        number: -1,
      })
      setAllTasks(tasks)
      setTasksLoading(false)
    }).catch(error => {
      console.error(error)
      enqueueSnackbar("Произошла неизвестная ошибка", {variant: "error"})
      history.push("/");
    })
  }

  const loadSubthemes = () => {
    if (subthemesLoading) return
    if (allSubthemes.length > 0) return; // Вызов дохера дорогой
    setSubthemesLoading(true)
    fetch(`${process.env.REACT_APP_API_ROOT}/themes/`).then(async response => {
      const accumulator = []
      const /**Array*/themes = await response.json()
      for (const theme of themes)
        accumulator.push(...await (await fetch(`${process.env.REACT_APP_API_ROOT}/themes/${theme["id"]}/subthemes/`)).json())
      setAllSubthemes(accumulator)
      setSubthemesLoading(false)
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
          <StepLabel>Выберите вариант</StepLabel>
          <StepContent>
            <Autocomplete
              noOptionsText="Не найдено"
              loadingText="Загрузка.."
              onOpen={() => {
                loadVariants()
              }}
              options={allVariants}
              getOptionLabel={it => it["name"]}
              getOptionSelected={(option, value) => option["id"] === value["id"]}
              loading={variantsLoading}
              onChange={(event, newValue) => {
                selectVariant(newValue)
              }}
              value={selectedVariant}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Вариант"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {variantsLoading ? <CircularProgress color="inherit" size={20}/> : null}
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
              <Button variant="contained" color="primary" className={classes.button} disabled={selectedVariant == null}
                      onClick={() => {
                        setStep(1);
                      }}>Дальше</Button>
            </div>
          </StepContent>
        </Step>
        <Step key={1}>
          <StepLabel>Выберите задание</StepLabel>
          <StepContent>
            <Autocomplete
              noOptionsText="Не найдено"
              loadingText="Загрузка.."
              onOpen={() => {
                loadTasks()
              }}
              options={allTasks}
              getOptionLabel={it => {
                if (it["id"] === -1) return "Создать новое"
                else return `Вариант №${it["number"]}: ${it["content"]}`;
              }}
              getOptionSelected={(option, value) => option["id"] === value["id"]}
              loading={tasksLoading}
              onChange={(event, newValue) => {
                selectTask(newValue)
              }}
              value={selectedTask}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Задание"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {variantsLoading ? <CircularProgress color="inherit" size={20}/> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
            <div className={classes.actionsContainer}>
              <Button className={classes.button} onClick={() => {
                selectTask(null)
                setStep(0);
              }}>
                Назад
              </Button>
              <Button variant="contained" color="primary" className={classes.button} disabled={selectedTask == null}
                      onClick={() => {
                        selectSubtheme(selectedTask["subtheme"])
                        setContent(selectedTask["content"])
                        setSolution(selectedTask["solution"])
                        setNumber(selectedTask["number"])
                        setStep(2);
                      }}>Дальше</Button>
            </div>
          </StepContent>
        </Step>
        <Step key={2}>
          <StepLabel>Введите значения</StepLabel>
          <StepContent>
            <Autocomplete
              className={classes.textField}
              noOptionsText="Не найдено"
              loadingText="Загрузка.."
              onOpen={() => {
                loadVariants()
              }}
              options={allVariants}
              getOptionLabel={it => it["name"]}
              getOptionSelected={(option, value) => option["id"] === value["id"]}
              loading={variantsLoading}
              onChange={(event, newValue) => {
                selectVariant(newValue)
              }}
              value={selectedVariant}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Вариант"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {variantsLoading ? <CircularProgress color="inherit" size={20}/> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  error={selectedVariant == null}
                  helperText={selectedVariant == null && "Вариант должен быть выбран!"}
                />
              )}
            />
            <Autocomplete
              className={classes.textField}
              noOptionsText="Не найдено"
              loadingText="Загрузка.."
              onOpen={() => {
                loadSubthemes()
              }}
              options={allSubthemes}
              getOptionLabel={it => it["name"]}
              getOptionSelected={(option, value) => option["id"] === value["id"]}
              loading={subthemesLoading}
              onChange={(event, newValue) => {
                selectSubtheme(newValue)
              }}
              value={selectedSubtheme}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Подтема"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {variantsLoading ? <CircularProgress color="inherit" size={20}/> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                  error={selectedSubtheme == null}
                  helperText={selectedSubtheme == null && "Подтема должна быть выбрана!"}
                />
              )}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Номер задания"
              type="number"
              onInput={/**React.ChangeEvent<HTMLInputElement>*/event => {
                setNumber(parseInt(event.target.value, 10));
              }}
              value={number}
              error={isNaN(number) || number <= 0}
              helperText={(() => {
                if(isNaN(number)) return "Номер не должен быть пустым!"
                if(number <= 0) return "Номер должен быть положителен!"
              })()}
              fullWidth/>
            <div className={classes.actionsContainer}>
              <Button className={classes.button} onClick={() => {
                setStep(1);
              }}>
                Назад
              </Button>
              <Button variant="contained" color="primary" className={classes.button} disabled={selectedTask == null}
                      onClick={() => {

                      }}>Готово</Button>
            </div>
          </StepContent>
        </Step>
      </Stepper>
    </Paper>
  </div>
}

export default EditVariant