import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {getPresenceParams} from "../../requests/credentials";
import ChartRepeatVisitors from "./ChartRepeatVisitors";


class RepeatVisitors extends Component {

	constructor(props) {
		super(props);
		this.state = {
			startDate: this.props.startDate,
			endDate: this.props.endDate,
			repeatVisitors: [],
			// countDwellTime: {}
		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({
				startDate: nextProps.startDate,
				endDate: nextProps.endDate,
				repeatVisitors: []
			},
			() => { this.fetchAll() });
	}

	buildQueryDateParams = () => {
		if (this.state.startDate === this.state.endDate) {
			return {date: this.state.startDate};
		} else {
			return {
				startDate: this.state.startDate,
				endDate: this.state.endDate
			};
		}
	};

	fetchAll = () => {
		this.fetchRepeatVisitors();
		// this.fetchCountDwellTime();
	};

	fetchRepeatVisitors() {
		let request = getPresenceParams();
		let timeSection = this.state.startDate === this.state.endDate ? 'hourly' : 'daily';
		request.data.params = {...request.data.params, ...this.buildQueryDateParams()};
		axios.get(request.baseUrl + 'api/presence/v1/repeatvisitors/' + timeSection, request.data)
			.then((result) => {
				this.setState({repeatVisitors: result.data});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	isRange = () => {
		return this.state.startDate !== this.state.endDate;
	};

// <TotalCount countDwellTime={this.state.countDwellTime} />

	render() {
		return (
			<div>
				<Grid container direction={"row"} spacing={24} className={"sm-no-spacing"}>
					<Grid item xs={12} md={8} className={"m-t-sm-24"}>
						<ChartRepeatVisitors range={this.isRange()} repeatVisitors={this.state.repeatVisitors} />
					</Grid>
					<Grid item xs={12} md={4} className={"m-t-sm-24"}>

					</Grid>
				</Grid>
			</div>
		);
	}
}

export default RepeatVisitors;