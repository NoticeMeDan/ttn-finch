import React, { useState } from 'react'
import { TableCell } from '@material-ui/core'
import { DateTimePicker } from '@material-ui/pickers'
import dayjs from 'dayjs'
import TableRow from '@material-ui/core/TableRow'
import Grid from '@material-ui/core/Grid'

import PaginatedTable from '../../../components/PaginatedTable'
import useGetJson from '../../../hooks/useGetJson'
import Loading from '../../../components/Loading'

function ActivityLog ({ flowId }) {
	const [state, setState] = useState({
		from: dayjs().hour(0).minute(0).second(0),
		to: dayjs(),
		page: 0
	})

	const [data, isLoading, error] = useGetJson(`/api/log/${flowId}/${state.from.unix()}/${state.to.unix()}/${state.page}`, [state])

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
				<TableCell>{dayjs.unix(event.time).format('DD/MM/YYYY H:mm:ss')}</TableCell>
				<TableCell>{event.message}</TableCell>
			</TableRow>
		))
	}

	return (
		<Grid container direction='column' spacing={1}>
			<Grid container justify='flex-end' spacing={2}>
				<Grid item>
					<DateTimePicker value={state.from} onChange={handleChange('from')} label='From' ampm={false} variant='inline' disableFuture />
				</Grid>
				<Grid item>
					<DateTimePicker value={state.to} onChange={handleChange('to')} label='To' ampm={false} variant='inline' disableFuture />
				</Grid>
			</Grid>
			{ isLoading ? <Loading /> : (
				<Grid item>
					<PaginatedTable
						onChangePage={handleChange('page')}
						page={state.page}
						totalPages={data.totalPages}
						head={getHeader()}
						body={getRows()} />
				</Grid>
			) }
		</Grid>
	)
}

export default ActivityLog
