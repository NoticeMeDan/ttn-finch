import React, { useState } from 'react'
import { TableCell } from '@material-ui/core'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'

import PaginatedTable from '../../../components/PaginatedTable'
import useGetJson from '../../../hooks/useGetJson'
import Loading from '../../../components/Loading'

const FlowOverview = () => {
	const [page, setPage] = useState(0)

	const [data, isLoading, error] = useGetJson(`/api/flow/all/${page}`)

	function handleChange (key) {
		return setPage(key)
	}

	function getHeader () {
		return (
			<>
				<TableCell>Id</TableCell>
				<TableCell>Name</TableCell>
				<TableCell>ApplicationId</TableCell>
			</>
		)
	}

	function getRows () {
		return data.sort((a, b) => a.id - b.id).map(row => (
			<TableRow key={row.id}>
				<TableCell>{row.id}</TableCell>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell>{row.applicationId}</TableCell>
			</TableRow>
		))
	}

	return (
		<Grid container direction='column' spacing={1}>
			<Grid container justify='flex-end' spacing={2}>
			</Grid>
			{ isLoading ? <Loading /> : (
				<Grid item>
					<PaginatedTable
						onChangePage={handleChange('page')}
						page={page}
						totalPages={data.totalPages}
						head={getHeader()}
						body={getRows()} />
				</Grid>
			) }
		</Grid>
	)
}

export default FlowOverview
