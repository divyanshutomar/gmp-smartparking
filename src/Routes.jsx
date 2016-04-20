import { Router, Route, Link } from 'react-router'
import { render } from 'react-dom'


var React = require('react');
var Companies = require('./pages/Companies.jsx');
var Parkings = require('./pages/Parkings.jsx');
var ParkingLots = require('./pages/ParkingLots.jsx');
var ParkingSublots = require('./pages/ParkingSublots.jsx')
var PricingSlots = require('./pages/PricingSlots.jsx')
var PricingGrid = require('./pages/PricingGrid.jsx')
var ReceiptContent = require('./pages/ReceiptContent.jsx')
var Reason = require('./pages/Reason.jsx')

import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

 render((
		<Router history={appHistory}>
			<Route path="/companies" component={Companies}/>
			<Route path="/companies/:compId/parkings" component={Parkings}/>
			<Route path="/parkings/:parkId/parkinglots" component={ParkingLots}/>
			<Route path="/parkinglots/:parkLotId/parkingsublots" component={ParkingSublots}/>
			<Route path="/parkingsublots/:parksubLotId/pricingslots" component={PricingSlots}/>
			<Route path="/pricingslots/:pricingId/pricingGrid" component={PricingGrid}/>
			<Route path="/parkingsublots/:receiptId/receiptcontents" component={ReceiptContent}/>
			<Route path="/parkingsublots/:reasonId/reason" component={Reason}/>
		</Router>
	),document.getElementById('mainContainer'));
