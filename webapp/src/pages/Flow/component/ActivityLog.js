import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { TableCell } from '@material-ui/core'
import { DateTimePicker } from '@material-ui/pickers'
import dayjs from 'dayjs'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'

import PaginatedTable from '../../../components/PaginatedTable'
import useGetJson from '../../../hooks/useGetJson'
import Loading from '../../../components/Loading'
import { formatDateTime } from '../../../util/time'
import Typography from "@material-ui/core/Typography";

function ActivityLog ({ flowId }) {
    const [state, setState] = useState({
        from: dayjs().hour(0).minute(0).second(0),
        to: dayjs(),
        page: 0
    })

    const [data, isLoading] = useGetJson(`/api/log/${flowId}/${state.from.unix()}/${state.to.unix()}/${state.page}`, [state])

    function handleChange (key) {
        return value => setState(prev => ({
            ...prev,
            [key]: value
        }))
    }

    function getHeader () {
        return (
            <>
                <TableCell>Time</TableCell>
                <TableCell>Event</TableCell>
            </>
        )
    }

    function getRows () {
        return data.pageData.map((event, index) => (
            <TableRow key={index}>
                <TableCell>{formatDateTime(event.time)}</TableCell>
                <TableCell>{event.message}</TableCell>
            </TableRow>
        ))
    }

    return (
        <Grid container direction='column' spacing={1}>
            <Grid container justify='space-between' style={{ padding: 8 }}>
                <Grid item style={{ marginLeft: 8 }}>
                    <Typography variant='h6' gutterBottom>Activity Log:</Typography>
                </Grid>
                <Grid item>
                    <Grid container justify='flex-end' spacing={2}>
                        <Grid item>
                            <DateTimePicker value={state.from} onChange={handleChange('from')} label='From' ampm={false} variant='inline' disableFuture />
                        </Grid>
                        <Grid item>
                            <DateTimePicker value={state.to} onChange={handleChange('to')} label='To' ampm={false} variant='inline' disableFuture  />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {isLoading ? <Loading /> : (
                <Grid item>
                    <PaginatedTable
                        onChangePage={handleChange('page')}
                        page={state.page}
                        totalPages={data.totalPages}
                        head={getHeader()}
                        body={getRows()} />
                </Grid>
            )}
        </Grid>
    )
}

ActivityLog.propTypes = {
    flowId: PropTypes.string.isRequired
}

export default ActivityLog
