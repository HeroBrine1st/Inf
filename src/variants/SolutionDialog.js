import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

function SolutionDialog(props) {
  return <Dialog open={props.open} onClose={props.onClose}>
    <DialogTitle>
      Решение
    </DialogTitle>
    <DialogContent>
      <DialogContentText>{props.solution}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.onClose} color="primary">
        Закрыть
      </Button>
    </DialogActions>
  </Dialog>
}

export default SolutionDialog