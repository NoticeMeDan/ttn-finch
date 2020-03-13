import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import NewFlow from './pages/NewFlow.js/NewFlow'

const App = () => (
	<React.StrictMode>
		<Router>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/newflow' component={NewFlow} />
			</Switch>
		</Router>
	</React.StrictMode>
)

export default hot(App)
