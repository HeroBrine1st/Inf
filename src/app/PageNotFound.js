import {useSnackbar} from "notistack";
import {Redirect} from "react-router";
import {useEffect} from "react";

function PageNotFound() {
  const {enqueueSnackbar} = useSnackbar()
  useEffect(() => {
    enqueueSnackbar("Вы перешли на несуществующую страницу и были перенаправлены на главную", {variant: "info"})
  })
  return <Redirect to="/"/>
}

export default PageNotFound