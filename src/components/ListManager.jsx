var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var Path = require('../Path');
var _ = require('lodash');
import {Link} from 'react-router'


var ListManager = React.createClass({
	getInitialState: function () {
		return({parkingsList :[],parkingsData:[]});
	},
	getDataset: function () {
		$.ajax({
	      url: Path.API_end+"SubOccasions/4/availability",
	      type: 'GET',
	      cache: false,
	      async:false,
	      success: function(dataAvail) {
	      	var parkings = _.groupBy(dataAvail,'parkingName');
	      	this.setState({parkingsData:parkings});
	      	var pList = Object.keys(parkings); 
	        this.setState({parkingsList: pList});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	},
	componentWillMount: function () {
		this.getDataset();
	},
	componentDidMount: function () {
	},
	render: function () {
		var parkingItems = this.state.parkingsList.map(function (parking) {
			return(
				<Link to={`/availability/${parking}`} className="collection-item" key={parking+"12"}>
				{parking}
				</Link>
				);
		});
		return(
			<div className="container">
				<h3>Parkings</h3>
				<div className="collection parkingList">
				{parkingItems}
				</div> 
			</div>	
			);
	}

});

module.exports = ListManager;

