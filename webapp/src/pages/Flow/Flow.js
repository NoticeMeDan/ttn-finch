import React from 'react'
import ActivityLog from './component/ActivityLog'
import Grid from '@material-ui/core/Grid'

function Flow ({ match }) {
	return (
		<>
			<h1>Hvor er mit flow bare pænt</h1>
			<Grid container justify='space-evenly'>
				<Grid item style={{ width: '80%' }}>
					<ActivityLog flowId={match.params.flowId} />
				</Grid>
			</Grid>
		</>
	)
}

export default Flow
