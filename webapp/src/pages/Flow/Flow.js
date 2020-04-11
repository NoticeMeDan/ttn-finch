import PropTypes from 'prop-types'
import React from 'react'
import ActivityLog from './component/ActivityLog'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import useGetJson from "../../hooks/useGetJson";
import Loading from "../../components/Loading";
import {TextareaAutosize, TextField} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';

function Flow ({ match }) {

    const [flow, isLoading] = useGetJson(`/api/flow/${match.params.flowId}`)

    if (!isLoading) console.log(flow)

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

    return (
        <>
            { isLoading ? <Loading /> : (
                <>
                    <div style={{ padding: 16 }}>
                        <Typography variant="h3">{flow.name}</Typography>
                        <Typography variant="subtitle" gutterBottom>{`Flow ID: ${flow.id}`}</Typography>
                    </div>
                    <Paper style={{padding: 16}}>
                        <Grid container alignItems='flex-start' spacing={3}>
                            <Grid item xs={5}>
                                <Typography variant="h4" gutterBottom>General information</Typography>
                                <InfoField label='Application ID:' value={flow.applicationId}></InfoField>
                                <InfoField label='Schedule:' value={flow.schedule}></InfoField>
                                <InfoField label='Created At:' value='42-42-2042 42:42:42 CET'></InfoField>
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
