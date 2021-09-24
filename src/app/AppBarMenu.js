import { Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem, Button, DialogContentText, Typography } from "@material-ui/core"
import { useState } from "react";

function AppBarMenu({ buttonAnchor, handleClose }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    console.log(process.env.REACT_APP_ABOUT.replace(/\\n/g, "\n\n"))
    return <>
        <Menu
            id="app-menu"
            anchorEl={buttonAnchor}
            keepMounted
            open={Boolean(buttonAnchor)}
            onClose={handleClose}>
            <MenuItem onClick={() => {
                handleClose()
                setDialogOpen(true)
            }}>About</MenuItem>
        </Menu>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>
                About
            </DialogTitle>
            <DialogContent>
                {process.env.REACT_APP_ABOUT.split("\\n").map(it => <Typography>{it}</Typography>)}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)} color="primary" variant="text">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default AppBarMenu