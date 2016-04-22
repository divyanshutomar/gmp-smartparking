var React = require('react');
var Path = require('../Path');
var _ = require('lodash');

var AvailabilityView = React.createClass({
	getInitialState: function () {
		return({CAR:"NA",BIKE:"NA",TRUCK:"NA",TRACTOR:"NA",parkingName: _.startCase(this.props.params.parkName)});
	},
	getDataset: function () {
		let AvailTYPES = ['CAR','BIKE','TRUCK','TRACTOR'];
		$.ajax({
	      url: Path.API_end+"SubOccasions/4/availability",
	      type: 'GET',
	      cache: false,
	      async:false,
	      success: function(dataAvail) {
	      	var parkings = _.groupBy(dataAvail,'parkingName');
	      	var parkingDetails = parkings[this.state.parkingName]
	      	for (var i = 0; i < parkingDetails.length; i++) {
	      		if(_.includes(AvailTYPES,parkingDetails[i].type))
	      			this.setState({[parkingDetails[i].type]:parkingDetails[i].availability});
	      	}
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
		this.loadInterval = setInterval(this.getDataset,90000);
	},
	componentWillUnmount () {
	    this.loadInterval && clearInterval(this.loadInterval);
	    this.loadInterval = false;
	},
	render: function () {
		return(
			<div>
				<div className="vert-Cont">
					<div className="black center paddingCont">
						<h3 className="white-text">{this.state.parkingName}</h3>
						<h4 className="white-text">Availability</h4>
					</div>
					<div className="white-text black horz-Cont paddingCont">
						<div className="center"><i className="fa fa-motorcycle iconSize" aria-hidden="true"></i></div>
						<div className="center"><i className="fa fa-car iconSize" aria-hidden="true"></i></div>
						<div className="center"><i className="fa fa-truck iconSize" aria-hidden="true"></i></div>
						<div className="center"><span className="icon-tractor iconSize"></span></div>
					</div>
					<div className="horz-Cont">
						<div className="center"><h2 className="iconSize">{this.state.BIKE}</h2></div>
						<div className="center"><h2 className="iconSize">{this.state.CAR}</h2></div>
						<div className="center"><h2 className="iconSize">{this.state.TRUCK}</h2></div>
						<div className="center"><h2 className="iconSize">{this.state.TRACTOR}</h2></div>
					</div>
				</div>
				<footer className="">
					<div className="">
						<div className="row removeBottomM">
							<div className="col s12 m7 paddingCont">
								<div className="row logoFooter removeBottomM">
									<div className="col l3 center"><span className="icon-logo"></span></div>
									<div className="green-text paddingCont col l9">
										<h6>Book Your Parking at</h6>
										<h5>GetMyParking.com</h5>
									</div>
								</div>
							</div>
							<div className="col s12 m5 black white-text paddingCont center">
								<h5 className="yellow-text">Kumbh Helpline Number : 1100</h5>
								<h6>Smart Parking Managed By :</h6>
								<h5>Dewas Transport Pvt. Ltd.</h5>
							</div>
						</div>
					</div>
				</footer>
			</div>	
			);
	}
});

module.exports = AvailabilityView;