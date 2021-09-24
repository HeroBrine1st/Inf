import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper,
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
import RenderMarkdown from "../misc/RenderMarkdown";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "56.25%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
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

function EditVariant({ setTitle, resetTitle }) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
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
  const [selectedTaskVariant, selectTaskVariant] = useState(null)
  const [selectedSubtheme, selectSubtheme] = useState(null)
  const [allSubthemes, setAllSubthemes] = useState([])
  const [content, setContent] = useState("")
  const [solution, setSolution] = useState("")
  const [number, setNumber] = useState(-1)
  const [contentPreview, openContentPreview] = useState(false)
  const [solutionPreview, openSolutionPreview] = useState(false)
  const [promptDeletion, setPromptDeletion] = useState(false)
  const [taskPushing, setTaskPushing] = useState(false)

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
      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
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
      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
      history.push("/");
    })
  }

  const loadSubthemes = () => {
    if (allSubthemes.length > 0) return; // Вызов дохера дорогой
    if (subthemesLoading) return
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
      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && selectedVariant != null) {
                      setStep(1);
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {variantsLoading ? <CircularProgress color="inherit" size={20} /> : null}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && selectedTask != null) {
                      selectTaskVariant(selectedTask["variant"])
                      selectSubtheme(selectedTask["subtheme"])
                      setContent(selectedTask["content"])
                      setSolution(selectedTask["solution"])
                      setNumber(selectedTask["number"])
                      setStep(2);
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {variantsLoading ? <CircularProgress color="inherit" size={20} /> : null}
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
                  selectTaskVariant(selectedTask["variant"])
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
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="flex-start"
              spacing={1}
            >
              <Grid item xs>
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
                    selectTaskVariant(newValue)
                  }}
                  value={selectedTaskVariant}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Вариант"
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {variantsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      error={selectedVariant == null}
                      helperText={selectedVariant == null && "Вариант должен быть выбран!"}
                    />
                  )}
                />
              </Grid>
              <Grid item xs>
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
                            {variantsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                      error={selectedSubtheme == null}
                      helperText={selectedSubtheme == null && "Подтема должна быть выбрана!"}
                    />
                  )}
                />
              </Grid>
              <Grid item xs>
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
                    if (isNaN(number)) return "Номер не должен быть пустым!"
                    if (number <= 0) return "Номер должен быть положителен!"
                  })()}
                  fullWidth />
              </Grid>
            </Grid>
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Текст задания"
              type="text"
              onInput={/**React.ChangeEvent<HTMLInputElement>*/event => {
                setContent(event.target.value)
              }}
              value={content}
              error={content.length === 0}
              helperText={content.length === 0 && "Текст задания не должен быть пустым!"}
              fullWidth multiline rowsMax={7} />
            <TextField
              className={classes.textField}
              variant="outlined"
              label="Текст решения"
              type="text"
              onInput={/**React.ChangeEvent<HTMLInputElement>*/event => {
                setSolution(event.target.value)
              }}
              value={solution}
              error={solution.length === 0}
              helperText={solution.length === 0 && "Текст решения не должен быть пустым!"}
              fullWidth multiline rowsMax={7} />
            <div className={classes.actionsContainer}>
              <Button className={classes.button} onClick={() => {
                setStep(1);
              }}>
                Назад
              </Button>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" className={classes.button}
                  disabled={selectedVariant == null || selectedSubtheme == null || isNaN(number) || number <= 0 || content.length === 0 || solution.length === 0 || taskPushing}
                  onClick={() => {
                    setTaskPushing(true)
                    const body = JSON.stringify({
                      number: number,
                      content: content,
                      solution: solution,
                      subtheme_id: selectedSubtheme["id"],
                      variant_id: selectedTaskVariant["id"]
                    })
                    let url = `${process.env.REACT_APP_API_ROOT}/variants/${selectedVariant["id"]}/tasks/`
                    if (selectedTask["id"] !== -1) url += `${selectedTask["id"]}/`
                    const method = selectedTask["id"] === -1 ? "POST" : "PUT"
                    fetch(url, {
                      method: method,
                      credentials: "same-origin",
                      body: body,
                      headers: {
                        "Content-Type": "application/json"
                      }
                    }).then(async response => {
                      if (!response.ok) {
                        setTaskPushing(false)
                        enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
                        console.error(response.statusText)
                        return
                      }
                      const task = await response.json()
                      selectTask(task)
                      selectVariant(task["variant"])
                      setTaskPushing(false)
                      enqueueSnackbar(`Задание ${method === "POST" ? "создано" : "изменено"}!`, { variant: "success" })
                    }).catch(error => {
                      setTaskPushing(false)
                      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
                      console.error(error)
                    })
                  }}>Готово</Button>
                {taskPushing && (
                  <CircularProgress size={24} className={classes.buttonProgress} />
                )}
              </div>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="inherit" className={clsx(classes.button, classes.deleteButton)}
                  disabled={(selectedTask && selectedTask["id"] === -1) || taskPushing}
                  onClick={() => {
                    if (!promptDeletion) {
                      setPromptDeletion(true)
                      setTimeout(() => setPromptDeletion(false), 500)
                      return
                    }
                    setPromptDeletion(false)
                    setTaskPushing(true)
                    let url = `${process.env.REACT_APP_API_ROOT}/variants/${selectedVariant["id"]}/tasks/${selectedTask["id"]}/`
                    fetch(url, {
                      method: "DELETE",
                      credentials: "same-origin",
                    }).then(response => {
                      setTaskPushing(false)
                      if (!response.ok) {
                        enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
                        console.error(response.statusText)
                        return
                      }
                      enqueueSnackbar(`Задание удалено!`, { variant: "info" })
                      setStep(0)
                      selectTask(null)
                    }).catch(error => {
                      setTaskPushing(false)
                      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "success" })
                      console.error(error)
                    })
                  }}>{promptDeletion ? "Точно?" : "Удалить"}</Button>
                {taskPushing && (
                  <CircularProgress size={24} className={classes.buttonProgress} />
                )}
              </div>
              <Button variant="outlined" color="secondary" className={classes.button}
                disabled={content.length === 0}
                onClick={() => openContentPreview(true)}>Предпросмотр задания</Button>
              <Button variant="outlined" color="secondary" className={classes.button}
                disabled={solution.length === 0}
                onClick={() => openSolutionPreview(true)}>Предпросмотр решения</Button>
            </div>
            <Dialog open={contentPreview} onClose={() => openContentPreview(false)} fullWidth>
              <DialogTitle>Предспросмотр задания</DialogTitle>
              <DialogContent>
                <RenderMarkdown>{content}</RenderMarkdown>
              </DialogContent>
              <DialogActions>
                <Button variant="text" onClick={() => openContentPreview(false)}>Закрыть</Button>
              </DialogActions>
            </Dialog>
            <Dialog open={solutionPreview} onClose={() => openSolutionPreview(false)} fullWidth>
              <DialogTitle>Предспросмотр решения</DialogTitle>
              <DialogContent>
                <RenderMarkdown>{solution}</RenderMarkdown>
              </DialogContent>
              <DialogActions>
                <Button variant="text" onClick={() => openSolutionPreview(false)}>Закрыть</Button>
              </DialogActions>
            </Dialog>
          </StepContent>
        </Step>
      </Stepper>
    </Paper>
  </div>
}

export default EditVariant