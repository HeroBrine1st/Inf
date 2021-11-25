import DownloadingJson from "../misc/DownloadingJson";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Collapse } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useRouteMatch } from "react-router";
import join from "../utils/join";

// a - именительный
// b - родительный
// c - родительный множественный
function pluralize(number, a, b, c) {
  if (number === 0) return c;
  if (number === 1) return a;
  if (2 <= number && number <= 4)
    return b;
  if (number > 20) return pluralize(number % 10);
  if (number >= 5)
    return c;
}

function SubthemeAccordionDetails(props) {
  const [subthemes, setSubthemes] = useState([])
  const [collapseIn, setCollapseIn] = useState(false)
  const { url } = useRouteMatch()
  return <DownloadingJson
      onResult={it => {
      setSubthemes(it)
      setTimeout(() => setCollapseIn(true), 0) // Костыль, но работает !
    }}
      url={`${process.env.REACT_APP_API_ROOT}/themes/${props.id}/subthemes/`}
      noBackdrop linear minDelay={250}>
    <Collapse in={collapseIn}>
      <ul>
        {subthemes.map(it => (
          <li key={it.id}>
            <Typography variant="body2">
              <Link to={join(url, props.id, "subthemes", it.id)}>{it.name}</Link> - {it["task_count"]} {pluralize(it["task_count"], "задание", "задания", "заданий")}
            </Typography>
          </li>
        ))}
      </ul>
    </Collapse>
  </DownloadingJson>
}

export default SubthemeAccordionDetails;