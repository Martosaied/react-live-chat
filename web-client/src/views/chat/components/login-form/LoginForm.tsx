import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog(props: any) {
    const [open, setOpen] = useState(true);
    const [username, setUsername] = useState('');

    const onSubmit = () => {
        props.onSubmit(username)
        setOpen(false);
    };

    const onChangeUsernameInput = (event: any) => {
        setUsername(event.target.value)
    }

    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Set Username</DialogTitle>
                <DialogContent>
                <TextField
                    onChange={onChangeUsernameInput}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Username"
                    type="text"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={onSubmit}  color="primary">
                    Enter
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
