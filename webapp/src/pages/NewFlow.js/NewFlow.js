import React, { useState } from "react";
import FlowForm from "./FlowForm";
import { postJSON } from "@acto/ajax";
import { Paper, Typography, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		height: "100vh",
		backgroundColor: '#f0f0f0',
		padding: "24px"
	},
	header: {
		padding: 8,
		backgroundColor: '#f5f5f5'
	},
	title: {
		fontWeight: 500
	},
});

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NewFlow = () => {
	const [snackOpen, setSnackOpen] = React.useState(false)
	const classes = useStyles()
	const history = useHistory()

	const handleSubmit = async values => {
		await postJSON("/api/flow", values).then(setSnackOpen(true))
			.catch(err => { if (err.status === 500) { console.log("yeah! error") } else { console.log(err) } });

	};

	const handleSnackClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackOpen(false);
		history.goBack();
	};


	return (
		<div className={classes.root}>
			<Paper>
				<Paper className={classes.header}>
					<Typography variant="h5" component="h5" color="primary" className={classes.title}>
						CREATE NEW FLOW
				</Typography>
				</Paper>
				<FlowForm handleSubmit={handleSubmit} handleCancel={history.goBack} />
			</Paper>
			<Snackbar open={snackOpen} autoHideDuration={1000} onClose={handleSnackClose}>
				<Alert onClose={handleSnackClose} severity="success">
					success!
        		</Alert>
			</Snackbar>
		</div>);
};

export default NewFlow;
