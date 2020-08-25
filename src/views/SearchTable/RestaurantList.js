import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Button from "components/CustomButtons/Button.js";
import RoomIcon from '@material-ui/icons/Room';
import IconButton from '@material-ui/core/IconButton';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DetailSlider from '../SearchTable/DetailSlider.js';
import styles from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import BookTable from "./BookTable";

import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles(styles);
export default function SectionTabs(props) {
	const [times, setTimes] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [time, setTime] = React.useState("");
	React.useEffect(() => {
		setTimes(Object.entries(props.data[1].timeslots))
	},
	// eslint-disable-next-line
	[]);

	//Change seconds to time
	function secondsToHms(d, type) {
		// unix timestamp
		var ts = Number(d);

		// convert unix timestamp to milliseconds
		var ts_ms = ts * 1000;

		// initialize new Date object
		var date_ob = new Date(ts_ms);

		// year as 4 digits (YYYY)
		var year = date_ob.getFullYear();

		// month as 2 digits (MM)
		var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

		// date as 2 digits (DD)
		var date = ("0" + date_ob.getDate()).slice(-2);

		// hours as 2 digits (hh)
		var hours = ("0" + date_ob.getHours()).slice(-2);

		// minutes as 2 digits (mm)
		var minutes = ("0" + date_ob.getMinutes()).slice(-2);

		if (type === "d") {
			return (year + "-" + month + "-" + date);
		} else {
			return (hours + ":" + minutes);
		}

	}

	function getToday(element) {

		var d = new Date();
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		if (element === "day") {
			return (d.toISOString().substr(0, 10))
		} else {
			return (days[d.getDay()]);
		}
	}


	function objectToString(obj, v) {
		var string = "";
		if (v === 0) {
			for (const key in obj) {
				// eslint-disable-next-line
				string = string + key + ":" + " " + obj[key] + ", ";
			}
		} else {
			for (const key in obj) {
				// eslint-disable-next-line
				string = string + obj[key] + ", ";
			}
		}
		string = string.substr(0, string.length - 2);
		return string
	}

	function handleClick(t) {
		setTime(t);
		setOpen(true);

	}


	const classes = useStyles();
	return (
		<div className={classes.section}>
			<div className={classes.container}>
				<div id="nav-tabs">
					<GridContainer>
						<GridItem xs={12}>
							<Card className={classes.root}>
								<CardContent>
									<GridContainer>
										<GridItem md={8} sm={12}>
											<GridContainer>
												<GridItem xs={12} md={12} sm={12} style={{ paddingLeft: "0px" }}>
													<h3 style={{ wordBreak: "break-all" }}>{props.data[1].name}
														<IconButton aria-label="settings">
															<RoomIcon />
														</IconButton></h3>
												</GridItem>
												<GridItem xs={8} md={3} sm={4}>
												</GridItem>
											</GridContainer>
											<GridContainer style={{ fontSize: "16px", fontWeight: "400" }}>

												<GridItem sm={12}>
													<h5>{objectToString(props.data[1].address, 1)}</h5>
												</GridItem>
												<GridContainer>
													<GridItem sm={6} style={{ display: "flex", alignItem: "center" }}><MailIcon />{props.data[1].email}</GridItem>
													<GridItem sm={6} style={{ display: "flex", alignItem: "center" }}><PhoneIcon />{props.data[1].phone}</GridItem>
												</GridContainer>
												<GridContainer>
													<GridItem sm={3}>Date:</GridItem>
													{console.log(times)}
													<GridItem sm={6}>{times.length > 0 ? secondsToHms(times[0][0], "d") : ""} {getToday(secondsToHms(times[0], "d"))}</GridItem>
												</GridContainer>

											</GridContainer>
										</GridItem>
										<GridItem md={4} sm={12}>
											<DetailSlider />
										</GridItem>
										<GridItem md={12} sm={12} style={{ marginLeft: "11px" }}>
											{
												props.data[1]&&props.data[1].cuisines?props.data[1].cuisines.map((element, i) => {
													return (
														<font key={i} style={{
															backgroundColor: "#dcdcdc",
															margin: "4px",
															borderRadius: "6px",
															padding: "3px"
														}}>{element}</font>
													)
												}):''
											}
										</GridItem>
										<GridContainer>
											{
												times.map((element, i) => {
													let time = secondsToHms(element[0])
													return (
														<GridItem sm={4} md={2} xs={4} key={i}>
															<Button variant="outlined" color="warning" className={classes.margin} style={{ padding: "7px 20px" }} onClick={() => handleClick(element[0])}>
																{time}
															</Button>
														</GridItem>
													)
												})
											}
										</GridContainer>
									</GridContainer>
								</CardContent>
							</Card>
						</GridItem>
						<BookTable data={props.data} dialogOpen={open} time={time} dialogClose={() => setOpen(false)} />
					</GridContainer>
				</div>
			</div>
		</div>

	);
}
