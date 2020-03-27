import React, { useState } from 'react'
import { TableCell } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import AssignmentIcon from '@material-ui/icons/Assignment'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'

import PaginatedTable from '../../../components/PaginatedTable'
import Loading from '../../../components/Loading'
import { makeStyles } from '@material-ui/core/styles'
import useGetJson from '../../../hooks/useGetJson'

const useStyles = makeStyles({
    cell: {
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 16,
        paddingRight: 16
    }
})

const FlowTable = () => {
    const classes = useStyles()
    const [page, setPage] = useState(0)

    const [data, isLoading] = useGetJson(`/api/flow/all/${page}`, [page])

    function getHeader () {
        return (
            <>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Application Id</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell align='right'>Activity Log</TableCell>
            </>
        )
    }

    function getRows () {
        return data.pageData.map(flow => (
            <TableRow key={flow.id}>
                <TableCell className={classes.cell}>{flow.id}</TableCell>
                <TableCell className={classes.cell} component='th' scope='row'>
                    {flow.name}
                </TableCell>
                <TableCell className={classes.cell}>{flow.applicationId}</TableCell>
                <TableCell className={classes.cell}>{flow.schedule}</TableCell>
                <TableCell align='right' className={classes.cell}>
                    <IconButton aria-label='activity-log' href={`/flow/${flow.id}`}>
                        <AssignmentIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        ))
    }

    return (
        <Grid container direction='column' spacing={1}>
            {isLoading ? <Loading /> : (
                <Grid item>
                    <PaginatedTable
                        onChangePage={setPage}
                        page={page}
                        totalPages={data.totalPages}
                        head={getHeader()}
                        body={getRows()} />
                </Grid>
            )}
        </Grid>
    )
}

export default FlowTable
