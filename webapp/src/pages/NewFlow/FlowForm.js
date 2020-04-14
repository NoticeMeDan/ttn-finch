import PropTypes from 'prop-types'
import React from 'react'
import { Field, Formik } from 'formik'
import * as Yup from 'yup'
import { Button, Grid, Typography } from '@material-ui/core'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Link from '@material-ui/core/Link'
import ResultForm from './ResultForm'
import Divider from '@material-ui/core/Divider'

const SignUpSchema = Yup.object().shape({
    name: Yup.string()
        .max(50, 'Name is too long!')
        .required('Required'),
    applicationId: Yup.string()
        .max(50, 'Application ID is too long!')
        .required('Required'),
    schedule: Yup.string()
        .max(100, 'Schedule is too long!')
        .required('Required'),
    resultConfig: Yup.object().shape({
        kind: Yup.string(),
        config: Yup.object()
    }).required('Required')
})

const useStyles = makeStyles({
    container: {
        padding: 16
    },
    actionRow: {
        padding: 8,
        width: '100%'
    },
    column: {
        width: '48%'
    }
})

const FlowForm = ({ handleSubmit, handleCancel, results, flow }) => {
    const classes = useStyles()

    return (
        <Formik
            initialValues={{
                name: flow ? flow.name : '',
                applicationId: flow ? flow.applicationId : '',
                schedule: flow ? flow.schedule : '',
                resultConfig: flow ? flow.resultConfig : {
                    kind: '',
                    config: null
                },
                activityLogEnabled: flow ? flow.activityLogEnabled : false
            }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}>
            {({ errors, values, setFieldValue, setFieldTouched, handleSubmit, touched, isSubmitting }) => (
                <>
                    <Grid container justify='space-between' className={classes.container}>
                        <Grid item className={classes.column}>
                            <div>
                                <Typography variant='h6' component='h2'>
                                    Flow name
                                </Typography>
                                <Typography variant='subtitle2' component='h2' color='textSecondary'>
                                    The name will be used for identifying it at a later time.
                                </Typography>
                                <Field
                                    id='name-field' name='name' component={TextField} variant='outlined' size='small'
                                    margin='dense' placeholder='Flow name' />
                            </div>
                            <div>
                                <Typography variant='h6' component='h2'>
                                    Application ID
                                </Typography>
                                <Typography variant='subtitle2' component='h2' color='textSecondary'>
                                    Enter the ID of your application in TheThingsNetwork.
                                </Typography>
                                <Field
                                    id='application-field' name='applicationId' component={TextField} variant='outlined' size='small'
                                    margin='dense' placeholder='Application ID' />
                            </div>
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
                                    id='schedule-field' name='schedule' component={TextField} variant='outlined' size='small'
                                    margin='dense' placeholder='Cron Expression' fullWidth />
                            </Typography>
                        </Grid>
                        <Grid item className={classes.column}>
                            <ResultForm
                                results={results}
                                value={values.resultConfig}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                touched={touched.resultConfig}
                                errors={errors.resultConfig}
                                isSubmitting={isSubmitting} />
                            <Field id='log-field' name='activityLogEnabled' type='checkbox' component={CheckboxWithLabel} Label={{ label: 'Enable Activity Log' }} color='primary' />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container justify='flex-end' alignItems='center' className={classes.actionRow}>
                        <Grid item>
                            <Button id='form-cancel' onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button id='form-submit' color='primary' id='submit' onClick={handleSubmit}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </Formik>
    )
}

FlowForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired,
    flow: PropTypes.object
}

export default FlowForm
