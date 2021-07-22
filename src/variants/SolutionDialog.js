import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import ReactMarkdown from 'react-markdown'

function SolutionDialog(props) {
  return <Dialog open={props.open} onClose={props.onClose} fullWidth>
    <DialogTitle>
      Решение
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <ReactMarkdown>{props.solution}</ReactMarkdown>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose} color="primary">
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
}

export default SolutionDialog