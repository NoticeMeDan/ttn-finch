import React from 'react'
import FlowForm from './FlowForm'
import { postJSON } from '@acto/ajax'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from "notistack";

const useStyles = makeStyles({
	root: {
		height: '100vh',
		backgroundColor: '#f0f0f0',
		padding: '24px'
	},
	header: {
		padding: 8,
		backgroundColor: '#f5f5f5'
	},
	title: {
		fontWeight: 500
	}
})

function NewFlow () {
	const classes = useStyles()
	const history = useHistory()
	const {enqueueSnackbar} = useSnackbar()

	const handleSubmit = async (values, actions) => {
		postJSON('/api/flow', values)
			.json(() => {
				enqueueSnackbar("Flow added", {variant: 'success'})
				new Promise(r => setTimeout(r, 1000)).then(() => history.push('/'))
			})
			.catch(err => {
				if (err.status === 409) {
					actions.setFieldError("name", "Name already exist!")
				} else if (err.status === 504) {
					enqueueSnackbar("Connection error!", {variant: 'error'})
				} else {
					console.error(err)
				}
			})
			.finally(actions.setSubmitting(false))
	}

	return (
		<div className={classes.root}>
			<Paper>
				<Paper className={classes.header}>
					<Typography variant='h5' component='h5' color='primary' className={classes.title}>
						CREATE NEW FLOW
					</Typography>
				</Paper>
				<FlowForm handleSubmit={handleSubmit} handleCancel={history.goBack}/>
			</Paper>
		</div>)
}

export default NewFlow
