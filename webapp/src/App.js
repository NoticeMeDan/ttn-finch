import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DayjsUtils from '@date-io/dayjs'

import Home from './pages/Home'
import Flow from './pages/Flow'

const App = () => (
    <React.StrictMode>
		<MuiPickersUtilsProvider utils={DayjsUtils}>
			<Router>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/flow/:flowId' component={Flow} />
				</Switch>
			</Router>
		</MuiPickersUtilsProvider>
    </React.StrictMode>
)

export default hot(App)
