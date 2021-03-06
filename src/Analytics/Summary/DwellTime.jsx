import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';

class DwellTime extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	peakHourFormat() {
		try {
			let time = this.props.data.peakSummary.peakHour;
			let next = this.props.data.peakSummary.peakHour + 1;
			let formattedTime = time < 10 ? '0' + time + ':00' : time + ':00';
			let formattedNext = next < 10 ? '0' + next + ':00' : next + ':00';
			return formattedTime + ' - ' + formattedNext;
		} catch (err) {

		}
	}

	averageDwelTime() {
		let hrs = parseInt(parseInt(this.props.data.averageDwellTime) / 60);
		let min = parseInt(this.props.data.averageDwellTime) % 60;
		return hrs + ' hrs ' + min + ' min';
	}

	renderContent() {
		if (this.props.ready) {
			return (
				<div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">Average Dwell Time:</Typography>
						<Typography gutterBottom variant="body1">{this.averageDwelTime()}</Typography>
					</div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">Peak Hour:</Typography>
						<Typography> {this.peakHourFormat()} </Typography>

					</div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">Users in peak hour:</Typography>
						<Typography>{this.props.data.peakSummary.peakHourCount}</Typography>
					</div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">5-30 min:</Typography>
						<Typography>{this.props.data.dwellLevels.FIVE_TO_THIRTY_MINUTES.count}</Typography>
					</div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">30-60 min:</Typography>
						<Typography>{this.props.data.dwellLevels.THIRTY_TO_SIXTY_MINUTES.count}</Typography>
					</div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">1-5 hrs:</Typography>
						<Typography>{this.props.data.dwellLevels.ONE_TO_FIVE_HOURS.count}</Typography>
					</div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">5-8 hrs:</Typography>
						<Typography>{this.props.data.dwellLevels.FIVE_TO_EIGHT_HOURS.count}</Typography>
					</div>
					<div className={"textRow"}>
						<Typography className={"rowTitle"} gutterBottom variant="caption">8+ hrs:</Typography>
						<Typography>{this.props.data.dwellLevels.EIGHT_PLUS_HOURS.count}</Typography>
					</div>
				</div>
			);
		}
	}

	render() {

		return (
			<Grid item xs={12} sm={6} md={3} className={"m-t-sm-24"}>
				<Card style={{height: "100%"}} className={"relative"}>
					<CardContent>
						<div className={"textRow"}>
							<Typography gutterBottom variant="headline">Dwell Time</Typography>
							<AccessTimeIcon style={{fontSize: 32}}/>
						</div>
						<hr/>
						{this.renderContent()}
					</CardContent>
				</Card>
			</Grid>
		);
	}
}

export default DwellTime;