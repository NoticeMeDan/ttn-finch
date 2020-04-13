import PropTypes from 'prop-types'
import React from 'react'
import ActivityLog from './component/ActivityLog'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import useGetJson from '../../hooks/useGetJson'
import Loading from '../../components/Loading'
import { TextareaAutosize } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import DeleteFlowDialog from './component/DeleteFlowDialog'
import Divider from '@material-ui/core/Divider'
import UpdateFlowDialog from './component/UpdateFlowDialog'
import cronstrue from 'cronstrue'

function Flow ({ match }) {
    const [flow, isLoading] = useGetJson(`/api/flow/${match.params.flowId}`)

    return (
        <>
            {isLoading ? <Loading /> : (
                <>
                    <Grid container alignItems='flex-end' justify='space-between' style={{ padding: 16 }}>
                        <Grid item>
                            <Typography variant='h2'>{flow.name}</Typography>
                            <Typography variant='button' gutterBottom>{`Flow ID: ${flow.id}`}</Typography>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <UpdateFlowDialog flow={flow} />
                                </Grid>
                                <Grid item>
                                    <DeleteFlowDialog flow={flow} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Divider />
                    <div style={{ padding: 16 }}>
                        <Typography variant='h4' gutterBottom>General information</Typography>
                        <Grid container alignItems='flex-start' spacing={5} style={{ paddingTop: 8 }}>
                            <Grid item xs={5}>
                                <Grid container alignItems='center' justify='flex-start' direction='row'>
                                    <Grid item style={{ width: '250px' }}>
                                        <Typography variant='button' gutterBottom>Application ID:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='overline' display='block'>{flow.applicationId}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container alignItems='center' justify='flex-start' direction='row'>
                                    <Grid item style={{ width: '250px' }}>
                                        <Typography variant='button' gutterBottom>Schedule:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='overline' display='block'>{cronstrue.toString(flow.schedule)}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container alignItems='center' justify='flex-start' direction='row' spacing={5}>
                                    <Grid item style={{ width: '250px' }}>
                                        <Typography variant='button' gutterBottom>Activity log status:</Typography>
                                    </Grid>
                                    <Grid item>
                                        {flow.activityLogEnabled
                                            ? <Typography variant='overline' color='primary'>Active</Typography>
                                            : <Typography variant='overline' color='secondary'>Disabled</Typography>}

                                    </Grid>
                                </Grid>
                                <Grid container alignItems='flex-start' justify='flex-start' direction='row'>
                                    <Grid item style={{ width: '250px' }}>
                                        <Typography variant='button' gutterBottom>Result config:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextareaAutosize
                                            aria-label='Result-config'
                                            rowsMin={5}
                                            style={{ width: 300 }}
                                            defaultValue={JSON.stringify(flow.resultConfig, null, 2)}
                                            disabled />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={7}>
                                <Paper style={{ paddingTop: 8 }}>
                                    <Grid container justify='flex-start'>
                                        <Grid item style={{ width: '100%' }}>
                                            <ActivityLog flowId={match.params.flowId} />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </>
            )}
        </>
    )
}

Flow.propTypes = {
    match: PropTypes.object.isRequired
}

export default Flow
