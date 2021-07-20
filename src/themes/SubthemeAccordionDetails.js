import DownloadingJson from "../misc/DownloadingJson";
import {useCallback, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ul: {
    [theme.breakpoints.down("lg")]: {
      padding: theme.spacing(2),
    }
  }
}))

function pluralize(number, a, b, c) {
  if (number === 1) return a;
  if (2 <= number <= 5) return b;
  if (number > 20) return pluralize(number % 10);
  if (number > 5) return c;
}

function SubthemeAccordionDetails(props) {
  const [subthemes, setSubthemes] = useState([])
  const classes = useStyles()
  return <DownloadingJson
    onResult={useCallback(it => setSubthemes(it), [])}
    url={`${process.env.REACT_APP_API_ROOT}/themes/${props.id}/subthemes/`}
    nobackdrop>
    <ul className={classes.ul}>
      {subthemes.map(it => (
        <li key={it.id}>
          <Typography
            variant="body2">{it.name} - {it["task_count"]} {pluralize(it["task_count"], "задание", "задания", "заданий")}</Typography>
        </li>
      ))}
    </ul>
  </DownloadingJson>
}

export default SubthemeAccordionDetails;