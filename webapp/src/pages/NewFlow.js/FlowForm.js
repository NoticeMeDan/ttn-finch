import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Typography } from "@material-ui/core";

const SignupSchema = Yup.object().shape({
	name: Yup.string()
		.max(50, "Too Long!")
		.required("Required"),
	applicationId: Yup.string()
		.max(50, "Too Long!")
		.required("Required")
})

const FlowForm = ({ handleSubmit }) => {
	return (
		<div>
			<h1>New Flow</h1>
			<Formik
				initialValues={{
					name: "",
					applicationId: ""
				}}
				validationSchema={SignupSchema}
				onSubmit={handleSubmit}
			>
				{({ errors, touched }) => (
					<Form>
						<Typography variant="h1" component="h2">
							h1. Heading
						</Typography>
						<Typography variant="h2" component="h2">
							h2. Heading
						</Typography>
						<Field name="name" />
						{errors.name && touched.name ? (
							<div>{errors.name}</div>
						) : null}
						<Field name="applicationId" />
						{errors.applicationId && touched.applicationId ? (
							<div>{errors.applicationId}</div>
						) : null}
						{errors.email && touched.email ? (
							<div>{errors.email}</div>
						) : null}
						<button type="submit">Submit</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FlowForm;
