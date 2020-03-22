import React from "react";
import { Button } from "@material-ui/core";
import FlowOverview from "./component/FlowOverview";
import Grid from "@material-ui/core/Grid";

function Home() {
	return (
		<div style={{padding: 24}}>
			<h1>Så tager det fart!</h1>
			<Grid container direction='column' spacing={2}>
				<Grid container justify='flex-end'>
					<Grid item>
						<Button variant="contained" color="primary" href="/newflow">
							Create New Flow
						</Button>
					</Grid>
				</Grid>
					<Grid item>
						<FlowOverview/>
					</Grid>
			</Grid>
		</div>
	);
}

export default Home;
