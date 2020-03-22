import PropTypes from 'prop-types'
import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Typography, Button, Grid } from '@material-ui/core'
import {
	TextField
} from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from '@material-ui/core/Link'

const SignUpSchema = Yup.object().shape({
	name: Yup.string()
		.max(50, 'Name is too long!')
		.required('Required'),
	applicationId: Yup.string()
		.max(50, 'Application ID is too long!')
		.required('Required'),
	schedule: Yup.string()
		.max(100, 'Schedule is too long!')
		.required('Required')
})

const useStyles = makeStyles({
	container: {
		padding: 8,
		width: '70%'
	},
	actionRow: {
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
								The name will be used for identifying it at a later time.
							</Typography>
							<Field
								name='name' component={TextField} variant='outlined' size='small'
								margin='dense' placeholder='Flow name' />

						</div>
						<div style={{ margin: '8px' }}>
							<Typography variant='h6' component='h2'>
								Application ID
							</Typography>
							<Typography variant='subtitle2' component='h2' color='textSecondary'>
								Enter the ID of your application in TheThingsNetwork.
							</Typography>
							<Field
								name='applicationId' component={TextField} variant='outlined' size='small'
								margin='dense' placeholder='Application ID' />
						</div>
						<div className={classes.container}>
							<Typography variant='h6' component='h2'>Schedule</Typography>
							<Typography variant='subtitle2' component='h2' color='textSecondary'>
								The schedule consists of a <Link href='https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/scheduling/support/CronSequenceGenerator.html'>Spring Cron expression</Link>.
								<br />
								The expression is a list of six single space-separated fields: representing second, minute, hour, day, month, weekday.
								<br />
								Month and weekday names can be given as the first three letters of the English names.
								<br />
								Example patterns:
								<br />
								<List>
									<ListItem>"0 0 * * * *" = the top of every hour of every day.</ListItem>
									<ListItem>"0 0 * * * *" = the top of every hour of every day.</ListItem>
									<ListItem>"*/10 * * * * *" = every ten seconds.</ListItem>
									<ListItem>"0 0 8-10 * * *" = 8, 9 and 10 o'clock of every day.</ListItem>
									<ListItem>"0 0 6,19 * * *" = 6:00 AM and 7:00 PM every day.</ListItem>
									<ListItem>"0 0/30 8-10 * * *" = 8:00, 8:30, 9:00, 9:30, 10:00 and 10:30 every day.</ListItem>
									<ListItem>"0 0 9-17 * * MON-FRI" = on the hour nine-to-five weekdays</ListItem>
									<ListItem>"0 0 0 25 12 ?" = every Christmas Day at midnight</ListItem>
								</List>
								<Field
									name='schedule' component={TextField} variant='outlined' size='small'
									margin='dense' placeholder='Cron expression' fullWidth />
							</Typography>
						</div>
						<Grid container justify='center' alignItems='center' className={classes.actionRow} spacing={1}>
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
