import React from "react";
import FlowForm from "./FlowForm";
import { postJSON } from "@acto/ajax";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		height: "100vh",
		backgroundColor: '#f0f0f0',
		padding: "24px"
	},
	header: {
		backgroundColor: '#f5f5f5'
	},
	title: {
		margin: 8,
		fontWeight: 500
	},
});

const NewFlow = () => {
	const classes = useStyles();
	const history = useHistory()

	const handleSubmit = values => {
		postJSON("/api/flow", values).json(console.log);
		history.goBack()
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
			</Paper></div>);
};

export default NewFlow;
