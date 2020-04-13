import PropTypes from 'prop-types'
import React, { useState } from 'react'
import ActivityLog from './component/ActivityLog'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import useGetJson from "../../hooks/useGetJson";
import Loading from "../../components/Loading";
import {TextareaAutosize, TextField} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteFlowDialog from "./component/DeleteFlowDialog";
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import UpdateFlowDialog from "./component/UpdateFlowDialog";

function Flow ({ match }) {
    const [flow, isLoading] = useGetJson(`/api/flow/${match.params.flowId}`)

    function InfoField ({label, value}) {
        return (
            <Grid container alignItems='center' justify='flex-start' direction="row" spacing={5}>
                <Grid item style={{ width: '300px'}}>
                    <Typography variant="h6" gutterBottom>{label}</Typography>
                </Grid>
                <Grid item>
                    <TextField id={`outlined-${label}-field`} variant="outlined" disabled defaultValue={value}/>
                </Grid>
            </Grid>
        )
    }

    function ActivityLogField ({ active }) {
        return (
            <Grid container alignItems='center' justify='flex-start' direction="row" spacing={5}>
                <Grid item style={{ width: '300px'}}>
                    <Typography variant="h6" gutterBottom>Activity log status:</Typography>
                </Grid>
                <Grid item>
                    { active ?
                        <Typography variant='subtitle1' color='primary' style={{ width: 210 }}>Active</Typography>
                        : <Typography variant='subtitle1' color='secondary' style={{ width: 210 }}>Disabled</Typography>
                    }

                </Grid>
            </Grid>
        )
    }

    function ResultConfigField () {
        return (
            <Grid container alignItems='flex-start' justify='flex-start' direction="row" spacing={5}>
                <Grid item style={{ width: '300px'}}>
                    <Typography variant="h6" gutterBottom>Result config:</Typography>
                </Grid>
                <Grid item>
                    <TextareaAutosize
                        aria-label="Result-config"
                        rowsMin={5}
                        style={{width: 300}}
                        defaultValue={JSON.stringify(flow.resultConfig, null, 2)}
                        disabled
                    />
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            { isLoading ? <Loading /> : (
                <>
                    <Grid container alignItems='flex-end' justify='space-between' style={{ padding: 16 }}>
                        <Grid item>
                                <Typography variant="h3">{flow.name}</Typography>
                                <Typography variant="subtitle1" gutterBottom>{`Flow ID: ${flow.id}`}</Typography>
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
                        <Typography variant="h4" gutterBottom>General information</Typography>
                        <Grid container alignItems='flex-start' spacing={3}>
                            <Grid item xs={5}>
                                <InfoField label='Application ID:' value={flow.applicationId} />
                                <InfoField label='Schedule:' value={flow.schedule} />
                                <ActivityLogField active={flow.activityLogEnabled} />
                                <ResultConfigField/>
                            </Grid>
                            <Grid item xs={7}>
                                <Paper style={{ paddingTop: 16 }}>
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
