import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import RenderMarkdown from "../misc/RenderMarkdown";

function SolutionDialog(props) {
  return <Dialog open={props.open} onClose={props.onClose} fullWidth>
    <DialogTitle>
      Решение
    </DialogTitle>
    <DialogContent>
      {/*<DialogContentText>*/}
        <RenderMarkdown>{props.solution}</RenderMarkdown>
      {/*</DialogContentText>*/}
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose} color="primary">
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
}

export default SolutionDialog