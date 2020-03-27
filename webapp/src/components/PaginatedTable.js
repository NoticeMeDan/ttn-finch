import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { Table, TableHead, TableBody, TableRow, TableFooter, TablePagination } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    tableBody: {
        '& >*:nth-child(odd)': {
            backgroundColor: theme.palette.grey['50']
        }
    }
}))

function PaginatedTable ({ head, body, page, totalPages, onChangePage }) {
    const classes = useStyles()
    return (
        <Table>
            {head && (
                <TableHead>
                    <TableRow>
                        {head}
                    </TableRow>
                </TableHead>
            )}
            <TableBody className={classes.tableBody}>
                {body}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[30]}
                        labelDisplayedRows={({ from, to, count }) => `${from} of ${count}`}
                        count={totalPages}
                        onChangePage={(e, newPage) => onChangePage(newPage)}
                        page={page}
                        rowsPerPage={1} />
                </TableRow>
            </TableFooter>
        </Table>
    )
}

PaginatedTable.propTypes = {
    head: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    body: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired
}

export default PaginatedTable
