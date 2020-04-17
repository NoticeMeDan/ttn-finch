import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { withTheme } from '@rjsf/core'
import { Theme as MuiTheme } from '@rjsf/material-ui'
import omit from 'lodash/omit'
import { Typography } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import FormHelperText from '@material-ui/core/FormHelperText'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
    select: {
        width: '90%'
    }
})

function ResultForm ({ results, value, onChange, onBlur, touched, errors, isSubmitting, initialData }) {
    const Form = withTheme(MuiTheme)
    const classes = useStyles()

    const [dialog, setDialog] = useState({ kind: null, open: false })

    function handleInternalSubmit ({ formData }) {
        onChange('resultConfig', { kind: dialog.kind, config: formData })
        handleCloseDialog()
    }

    function handleOpenDialog (event) {
        setDialog({ kind: event.target.value, open: true })
    }

    function handleCloseDialog () {
        setDialog({ kind: null, open: false })
    }

    function renderDialog () {
        const result = results.find(x => x.kind === dialog.kind)
        const formData = initialData && initialData.kind === dialog.kind ? initialData.config : undefined
        return (
            <Dialog open={dialog.open} onClose={handleCloseDialog}>
                <DialogTitle>Configure {result.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {result.description}
                    </DialogContentText>
                    <Form
                        schema={omit(result.schema, '$schema')} liveValidate noHtml5Validate
                        onSubmit={handleInternalSubmit} showErrorList={false} formData={formData || undefined}>
                        <div style={{ float: 'right' }}>
                            <Button id='result-cancel' color='secondary' onClick={handleCloseDialog}>Cancel</Button>
                            <Button id='result-create' color='primary' type='submit'>Create</Button>
                        </div>
                    </Form>
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <>
            <Typography variant='h6' component='h2'>Result</Typography>
            <Typography variant='subtitle2' component='h2' color='textSecondary'>
                Choose the result of your flow below to configure it.
            </Typography>
            <FormControl error={touched && !!errors} className={classes.select}>
                <InputLabel>Result</InputLabel>
                <Select
                    disabled={isSubmitting}
                    value={value.kind}
                    onChange={handleOpenDialog}
                    onClose={() => onBlur('resultConfig', true)}>
                    {results.map(description => (
                        <MenuItem key={description.kind} value={description.kind}>{description.name}</MenuItem>
                    ))}
                </Select>
                {touched && errors && <FormHelperText>Required</FormHelperText>}
            </FormControl>
            {dialog.open && renderDialog()}
        </>
    )
}

ResultForm.propTypes = {
    errors: PropTypes.object,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired,
    touched: PropTypes.any,
    value: PropTypes.object.isRequired,
    isSubmitting: PropTypes.any,
    initialData: PropTypes.object
}

export default ResultForm
