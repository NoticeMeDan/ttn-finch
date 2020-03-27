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
		padding: 0
	}
})

const FlowTable = () => {
	const classes = useStyles()
	const [state, setState] = useState({
		page: 0
	})

	const [data, isLoading] = useGetJson(`/api/flow/all/${state.page}`, [state])

	function handleChange (key) {
		return value => setState(prev => ({
			...prev,
			[key]: value
		}))
	}

	function getHeader () {
		return (
			<>
				<TableCell>Id</TableCell>
				<TableCell>Name</TableCell>
				<TableCell>Application Id</TableCell>
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
			<Grid container justify='flex-end' spacing={2} />
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

export default FlowTable
