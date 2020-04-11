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

function Flow ({ match }) {
    const [enableEdit, setEnableEdit] = useState(false)
    const [activityLogEnabled, setActivityLogEnabled] = useState(false)

    const [flow, isLoading] = useGetJson(`/api/flow/${match.params.flowId}`)

    if (!isLoading) console.log(flow)

    function InfoField ({label, value}) {
        return (
            <Grid container alignItems='center' justify='flex-start' direction="row" spacing={5}>
                <Grid item style={{ width: '300px'}}>
                    <Typography variant="h6" gutterBottom>{label}</Typography>
                </Grid>
                <Grid item>
                    <TextField id={`outlined-${label}-field`} variant="outlined" disabled={!enableEdit} defaultValue={value}/>
                </Grid>
            </Grid>
        )
    }

    function ActivityLogField () {
        return (
            <Grid container alignItems='center' justify='flex-start' direction="row" spacing={5}>
                <Grid item style={{ width: '300px'}}>
                    <Typography variant="h6" gutterBottom>Activity log status:</Typography>
                </Grid>
                <Grid item>
                    { enableEdit ? <Checkbox
                        checked={activityLogEnabled}
                        onChange={() => setActivityLogEnabled(!activityLogEnabled)}
                    /> :
                        <>
                            { activityLogEnabled ?
                                <Typography variant='subtitle' color='primary'>Active</Typography>
                                : <Typography variant='subtitle' color='secondary'>Disabled</Typography>
                            }
                        </>
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
                        disabled={!enableEdit}
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
                                <Typography variant="subtitle" gutterBottom>{`Flow ID: ${flow.id}`}</Typography>
                        </Grid>
                        <Grid item>
                            { !enableEdit ?
                                <Button
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    onClick={() => setEnableEdit(true)}
                                    size='small'
                                >
                                    Edit
                                </Button> :
                                <DeleteFlowDialog flow={flow}/> }
                        </Grid>
                    </Grid>
                    <Paper style={{padding: 16}}>
                        <Grid container alignItems='flex-start' spacing={3}>
                            <Grid item xs={5}>
                                <Typography variant="h4" gutterBottom>General information</Typography>
                                <InfoField label='Application ID:' value={flow.applicationId} />
                                <InfoField label='Schedule:' value={flow.schedule}/>
                                <InfoField label='Created At:' value='42-42-2042 42:42:42 CET' />
                                <ActivityLogField/>
                                <ResultConfigField/>
                                { enableEdit &&
                                <Grid item>
                                    <Grid container justify='center' alignItems='center' spacing={2} style={{marginTop: 16}}>
                                        <Grid item>
                                            <button onClick={ () => setEnableEdit(false) }>cancel</button>
                                        </Grid>
                                        <Grid item>
                                            <button>save</button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                }
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
                    </Paper>
                </>
            )}
        </>
        )
}

Flow.propTypes = {
    match: PropTypes.object.isRequired
}

export default Flow
