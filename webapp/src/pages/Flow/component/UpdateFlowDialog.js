import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { putJSON } from '@acto/ajax'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router-dom'
import useGetJson from '../../../hooks/useGetJson'
import EditIcon from '@material-ui/icons/Edit'
import FlowForm from '../../../components/FlowForm'
import Loading from '../../../components/Loading'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'

const UpdateFlowDialog = ({ flow }) => {
    const [open, setOpen] = React.useState(false)
    const { enqueueSnackbar } = useSnackbar()
    const history = useHistory()

    const [results, loading] = useGetJson('/api/result/description')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    function handleSubmit (values, actions) {
        const update = { ...values, id: flow.id }

        putJSON('/api/flow', update)
            .json(() => {
                enqueueSnackbar('Flow updated', { variant: 'success' })
                handleClose()
                history.push('/')
            })
            .catch(err => {
                if (err.status === 400) {
                    actions.setFieldError('schedule', 'Invalid ResultConfig or Cron Expression!')
                } else if (err.status === 409) {
                    actions.setFieldError('name', 'Name already exist!')
                } else if (err.status === 504) {
                    enqueueSnackbar('Connection error!', { variant: 'error' })
                } else {
                    console.error(err)
                }
            })
            .finally(actions.setSubmitting(false))
    }

    return (
        <div>
            <Button
                id='update-init'
                variant='contained'
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
                size='small'>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='lg'>
                <DialogTitle id='update-dialog-title'>UPDATE FLOW</DialogTitle>
                <Divider />
                <DialogContent>
                    {loading
                        ? <Loading />
                        : <FlowForm handleSubmit={handleSubmit} handleCancel={handleClose} results={results} flow={flow} />}
                </DialogContent>
            </Dialog>
        </div>)
}

UpdateFlowDialog.propTypes = {
    flow: PropTypes.object.isRequired
}

export default UpdateFlowDialog
