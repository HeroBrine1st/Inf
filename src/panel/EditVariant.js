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

function EditVariant({ setTitle, resetTitle }) {
  const classes = useStyles()
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [step, setStep] = useState(0)
  const [variants, setVariants] = useState([])
  const [variant, setVariant] = useState(null)
  const [variantName, setVariantName] = useState("")
  const [variantsLoading, setVariantsLoading] = useState(false)
  const [variantPushing, setVariantPushing] = useState(false)
  const [promptDeletion, setPromptDeletion] = useState(false)

  useEffect(() => {
    setTitle("Редактирование варианта")
    return resetTitle
  }, [setTitle, resetTitle])

  const loadVariants = () => {
    if (variantsLoading) return
    setVariantsLoading(true)
    setVariants([])
    fetch(`${process.env.REACT_APP_API_ROOT}/variants/`).then(async response => {
      if (!response.ok) throw new Error(response.statusText)
      const /**Array*/result = await response.json()
      result.unshift({ id: -1, name: "Создать новый" })
      setVariants(result)
      setVariantsLoading(false)
    }).catch(error => {
      console.error(error)
      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
      history.push("/");
    })
  }

  const pushVariant = () => {
    setVariantPushing(true)
    const body = JSON.stringify({
      "name": variantName,
    })
    let url = `${process.env.REACT_APP_API_ROOT}/variants/`
    if (variant["id"] !== -1) url += `${variant["id"]}/`
    const method = variant["id"] === -1 ? "POST" : "PUT"
    fetch(url, {
      method: method,
      credentials: "same-origin",
      body: body,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async response => {
      if (!response.ok) {
        setVariantPushing(false)
        enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
        console.error(response.statusText)
        return
      }
      setVariant(await response.json())
      setVariantPushing(false)
      enqueueSnackbar(`Вариант ${method === "POST" ? "создан" : "изменен"}!`, { variant: "success" })
    }).catch(error => {
      setVariantPushing(false)
      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
      console.error(error)
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
              options={variants}
              getOptionLabel={it => it["name"]}
              getOptionSelected={(option, value) => option["id"] === value["id"]}
              loading={variantsLoading}
              onChange={(event, newValue) => {
                setVariant(newValue)
              }}
              value={variant}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Вариант"
                  variant="outlined"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && variant != null) {
                      setStep(1);
                      if (variant["id"] !== -1)
                        setVariantName(variant["name"])
                      else setVariantName("")
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
              <Button variant="contained" color="primary" className={classes.button} disabled={variant == null}
                onClick={() => {
                  setStep(1);
                  if (variant["id"] !== -1)
                    setVariantName(variant["name"])
                  else setVariantName("")
                }}>Дальше</Button>
            </div>
          </StepContent>
        </Step>
        <Step key={1}>
          <StepLabel>Введите значения</StepLabel>
          <StepContent>
            <TextField
              fullWidth
              id="variant_name"
              name="variant_name"
              type="text"
              label="Название"
              variant="outlined"
              onInput={/**React.ChangeEvent<HTMLInputElement>*/event => setVariantName(event.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && variantName.length !== 0 && !variantPushing) {
                  pushVariant()
                }
              }}
              value={variantName}
              error={variantName.length === 0}
              helperText={variantName.length === 0 && "Название варианта не может быть пустым!"}
            />
            <div className={classes.actionsContainer}>
              <Button className={classes.button} onClick={() => setStep(0)}>
                Назад
              </Button>
              <div className={classes.buttonContainer}>
                <Button variant="contained" color="primary" className={classes.button}
                  disabled={variantName.length === 0 || variantPushing}
                  onClick={pushVariant}>Готово</Button>
                {variantPushing && (
                  <CircularProgress size={24} className={classes.buttonProgress} />
                )}
              </div>
              <div className={classes.buttonContainer}>
                <Button variant="contained" className={clsx(classes.button, classes.deleteButton)}
                  disabled={variantPushing || (variant && variant["id"] === -1)}
                  onClick={() => {
                    if (!promptDeletion) {
                      setPromptDeletion(true)
                      setTimeout(() => setPromptDeletion(false), 500)
                      return
                    }
                    setPromptDeletion(false)
                    setVariantPushing(true)
                    let url = `${process.env.REACT_APP_API_ROOT}/variants/${variant["id"]}/`
                    fetch(url, {
                      method: "DELETE",
                      credentials: "same-origin",
                    }).then(response => {
                      setVariantPushing(false)
                      if (!response.ok) {
                        enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
                        console.error(response.statusText)
                        return
                      }
                      enqueueSnackbar(`Вариант удален!`, { variant: "success" })
                      setStep(0)
                      setVariant(null)
                    }).catch(error => {
                      setVariantPushing(false)
                      enqueueSnackbar("Произошла неизвестная ошибка", { variant: "error" })
                      console.error(error)
                    })
                  }}>
                  {promptDeletion ? "Точно?" : "Удалить"}
                </Button>
                {variantPushing && (
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

export default EditVariant