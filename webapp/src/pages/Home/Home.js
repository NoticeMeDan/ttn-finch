import React from 'react'
import { Button } from '@material-ui/core'

function Home (props) {
	return (
		<div>
			<h1>Så tager det fart!</h1>
			<Button variant='contained' color='primary' href='/newflow'>
				Create New Flow
			</Button>
		</div>
	)
}

export default Home
