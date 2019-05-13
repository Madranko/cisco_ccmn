import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import Datepicker from "../Shared/Datepicker";
import moment from "moment";
import '../css/Datepicker.css';


const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
		width: "100%"
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
});

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			floor: 0,
			startDate: moment(new Date()).format('Y-MM-DD'),
			endDate: moment(new Date()).format('Y-MM-DD')
		};
	}

	handleChangeFloor = event => {
		// this.setState({floor: event.target.value});
		// let params = {
		// 	date: this.state.date,
		// 	floor: event.target.value
		// };
		// this.props.handleParams(params);
	};

	handleChangeDate = date => {
		this.setState({
			startDate: date.start,
			endDate: date.end
		});
		let params = {
			startDate: date.start,
			endDate: date.end,
			// floor: this.state.floor
		};
		this.props.handleParams(params);
	};





	render() {
		const { classes } = this.props;

		return (
			<Grid container direction={"row"} className={"wrapper-24"}>
				<Grid item xs={5} md={2}>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="select-floor">Floor</InputLabel>
						<Select
							value={this.state.floor}
							onChange={this.handleChangeFloor}
							inputProps={{name: 'floor', id: 'select-floor'}}
						>
							<MenuItem value={0}><em>All</em></MenuItem>
							<MenuItem value={1}>First</MenuItem>
							<MenuItem value={2}>Second</MenuItem>
							<MenuItem value={3}>Third</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={5} md={2}>
					<Datepicker changeDate={this.handleChangeDate}/>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Header);