import { Router, Route } from 'react-router'
import { render } from 'react-dom'
import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'


var React = require('react');
var AvailabilityView = require('./components/AvailabilityView.jsx');
var ListManager = require('./components/ListManager.jsx');


const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

render((
		<Router history={appHistory}>
			<Route path="/parkings" component={ListManager}/>
			<Route path="/availability/:parkName" component={AvailabilityView}/>
		</Router>
	),document.getElementById('mainContainer'));
