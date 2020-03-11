import React from "react";
import FlowForm from "./FlowForm";

const NewFlow = () => {
	const handleSubmit = values => {
		console.log(values);
	};

	return <FlowForm handleSubmit={handleSubmit} />;
};

export default NewFlow;
