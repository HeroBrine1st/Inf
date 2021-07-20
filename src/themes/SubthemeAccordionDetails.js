import DownloadingJson from "../misc/DownloadingJson";
import {useCallback, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Collapse} from "@material-ui/core";


function pluralize(number, a, b, c) {
  if (number === 1) return a;
  if (2 <= number <= 5) return b;
  if (number > 20) return pluralize(number % 10);
  if (number > 5) return c;
}

function SubthemeAccordionDetails(props) {
  const [subthemes, setSubthemes] = useState([])
  const [collapseIn, setCollapseIn] = useState(false)
  return <DownloadingJson
    onResult={useCallback(it => {
      setSubthemes(it)
      setTimeout(() => setCollapseIn(true), 0) // Костыль, но работает !
    }, [])}
    url={`${process.env.REACT_APP_API_ROOT}/themes/${props.id}/subthemes/`}
    nobackdrop linear>
    <Collapse in={collapseIn}>
      <ul>
        {subthemes.map(it => (
          <li key={it.id}>
            <Typography
              variant="body2">{it.name} - {it["task_count"]} {pluralize(it["task_count"], "задание", "задания", "заданий")}</Typography>
          </li>
        ))}
      </ul>
    </Collapse>
  </DownloadingJson>
}

export default SubthemeAccordionDetails;