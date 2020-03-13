import React from "react";
import FlowForm from "./FlowForm";
import { postJSON } from "@acto/ajax";

const NewFlow = () => {
	const handleSubmit = values => {
		postJSON("/api/flow", values).json(console.log);
	};

	return <FlowForm handleSubmit={handleSubmit} />;
};

export default NewFlow;
