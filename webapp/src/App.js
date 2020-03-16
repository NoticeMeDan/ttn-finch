import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'

import Home from './pages/Home'
import NewFlow from './pages/NewFlow/NewFlow'
import Flow from './pages/Flow'
import {SnackbarProvider} from "notistack";

const App = () => (
	<React.StrictMode>
		<SnackbarProvider maxSnack={3}>
			<MuiPickersUtilsProvider utils={DayjsUtils}>
				<Router>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/newflow' component={NewFlow} />
						<Route exact path='/flow/:flowId' component={Flow} />
					</Switch>
				</Router>
			</MuiPickersUtilsProvider>
		</SnackbarProvider>
	</React.StrictMode>
)

export default hot(App)
