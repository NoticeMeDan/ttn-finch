import PropTypes from 'prop-types'
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Typography, Button, Grid } from '@material-ui/core'
import {
	TextField
} from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles'

const SignUpSchema = Yup.object().shape({
	name: Yup.string()
		.max(50, 'Too Long!')
		.required('Required'),
	applicationId: Yup.string()
		.max(50, 'Too Long!')
		.required('Required')
})

const useStyles = makeStyles({
	row: {
		padding: 8,
		width: '100%'
	}
})

const FlowForm = ({ handleSubmit, handleCancel }) => {
	const classes = useStyles()
	return (
		<div>
			<Formik
				initialValues={{
					name: '',
					applicationId: ''
				}}
				validationSchema={SignUpSchema}
				onSubmit={handleSubmit}>
				{({ errors, touched }) => (
					<Form>
						<div style={{ margin: '8px' }}>
							<Typography variant='h6' component='h2'>
								Flow name
							</Typography>
							<Typography variant='subtitle2' component='h2' color='textSecondary'>
								This name will be used for identifying it at a later time.
							</Typography>
							<Field name='name' component={TextField} variant='outlined' size='small' margin='dense' placeholder='Flow name' />

						</div>
						<div style={{ margin: '8px' }}>
							<Typography variant='h6' component='h2'>
								Application ID
							</Typography>
							<Typography variant='subtitle2' component='h2' color='textSecondary'>
								Enter the ID of your application in TheThingsNetwork.
							</Typography>
							<Field name='applicationId' component={TextField} variant='outlined' size='small' margin='dense' placeholder='Application ID' />
						</div>
						<Grid container justify='center' alignItems='center' className={classes.row} spacing={1}>
							<Grid item>
								<Button variant='outlined' color='primary' onClick={handleCancel}>
									Cancel
								</Button>
							</Grid>
							<Grid item>
								<Button type='submit' variant='contained' color='primary'>
									Save
								</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	)
}

FlowForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleCancel: PropTypes.func.isRequired
}

export default FlowForm
