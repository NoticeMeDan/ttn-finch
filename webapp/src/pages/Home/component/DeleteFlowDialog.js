import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { deleteJSON } from '@acto/ajax'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'

const DeleteFlowDialog = ({ flow }) => {
    const [open, setOpen] = React.useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const history = useHistory()

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        deleteJSON(`/api/flow/${flow.id}`).json(() => {
            enqueueSnackbar('Flow deleted', { variant: 'info' })
        })
        setOpen(false)
        history.push('/')
    }

    return (
        <div>
            <IconButton aria-label='delete flow' onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id='alert-dialog-title'>{`${flow.name} (ID: ${flow.id})`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        You are about to delete a flow. By deleting a flow you also delete all activity logs related to the flow.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        color='secondary'
                        autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>)
}

export default DeleteFlowDialog
