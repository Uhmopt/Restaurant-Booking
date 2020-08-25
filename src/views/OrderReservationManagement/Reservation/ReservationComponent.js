import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import Dialog from './ReservationDialog.js'
import axios from 'axios'

export default function MediaCard(props) {

	const request = {
		backgroundColor: "#72a0ff",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}
	const complete = {
		backgroundColor: "#66f7c5",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}
	const cancel = {
		backgroundColor: "#f76684",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}
	const seatedStyle = {
		backgroundColor: "#52d3ff",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}

	const [seated, setSeated] = React.useState([]);
	const [upcoming, setUpcoming] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [select, setSelect] = React.useState({});

	React.useEffect(() => {
		initGetDate()
	},
	// eslint-disable-next-line
	[]);

	React.useEffect(() => {
		filterData();
	}, [props]);

	function initGetDate() {
		localStorage.getItem("establishmentId")
		var config = {
			method: 'get',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/reservation/establishment/${localStorage.getItem("establishmentId")}`,
			headers: {}
		};

		axios(config)
			.then(function (response) {
				localStorage.setItem("reservationList", JSON.stringify(response.data));
				filterData()
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function filterData() {
		var data = JSON.parse(localStorage.getItem("reservationList"));
		if(data === null)return[];
		if (data.length !== 0) {
			data = data.filter(function (item) {
				return item.state === "SEATED";
			})
			setSeated(data);
			var data2 = JSON.parse(localStorage.getItem("reservationList"));
			data2 = data2.filter(function (item) {
				return item.state !== "SEATED";
			})
			setUpcoming(data2);
		}

	}

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

		if(type==="d"){
			return( year + "-" + month + "-" +  date);
		} else {
			return( hours + ":" + minutes);
		}

	}

	function handleClick(selectedData) {
		setSelect(selectedData);
		setOpen(true);
	}
	function handleColse() {
		setOpen(false);
	}

	return (
		<GridItem sm={12}>
			<GridItem sm={12} style={{ paddingTop: "30px", color: "black", textAlign: "-webkit-right" }}><h4 ><BookmarksIcon /> <font>Reservations: 13</font></h4></GridItem>
			<GridItem sm={12}>
				<GridContainer spacing={2}>
					<GridItem sm={12} md={6} style={{ color: "black" }}><h3>Upcoming</h3>
						<GridItem sm={12} style={{ padding: "0px" }}>
							{upcoming.length !== 0 ? upcoming.map((element, i) => {
								return (
									<GridItem sm={12} key={i} style={{ paddingTop: "3px" }}>
										<Card onClick={() => handleClick(element)} >
											<CardActionArea>
												<CardContent spacing={5} style={{ fontSize: "16px", backgroundColor: "#f1f1f1" }}>
													<GridContainer>
														<GridItem sm={12} md={2} style={{ padding: "5px", textAlignLast: "center" }}>{element.tableID}</GridItem>
														<GridItem sm={12} md={3} style={{ padding: "5px", textAlignLast: "center" }}>{element.name}</GridItem>
														<GridItem sm={12} md={2} style={{ padding: "5px", textAlignLast: "center" }}>{secondsToHms(element.reservationTime, "t")}</GridItem>
														<GridItem sm={12} md={2} style={{ padding: "5px", textAlignLast: "center" }}>{element.cover}</GridItem>
														{
															(
																// eslint-disable-next-line
																[].concat(element.state)).map((child, i) => {
																switch (child) {
																	case "CANCELLED":
																		return (<GridItem key={i} sm={3} md={3} style={request} >{element.state}</GridItem>)
																	case "ABSENT":
																		return (<GridItem key={i} sm={3} md={3} style={cancel}>{element.state}</GridItem>)
																	case "COMPLETED":
																		return (<GridItem key={i} sm={3} md={3} style={complete}>{element.state}</GridItem>)
																	default:
																		break;
																}
															})
														}												
													</GridContainer>
												</CardContent>
											</CardActionArea>
										</Card>
									</GridItem>
								)
							}) : ""}
						</GridItem>
					</GridItem>
					<GridItem sm={12} md={6} style={{ color: "black"}}><h3>Seated</h3>
						<GridItem sm={12}  style={{ paddingTop: "30px", padding: "0px" }}	>
							{seated.length !== 0 ? seated.map((element, i) => {
								return (
									<GridItem sm={12} key={i}  style={{ paddingTop: "3px"}}>
										<Card onClick={() => handleClick(element)} style={{ backgroundColor: "#f1f1f1" }} >
											<CardActionArea style={{backgroundColor: "#f1f1f1"}}>
												<CardContent spacing={5}>
													<GridContainer style={{ fontSize: "16px"}}>
														<GridItem sm={6} md={2} style={{ padding: "5px", textAlignLast: "center" }}>{element.tableID}</GridItem>
														<GridItem sm={6} md={3} style={{ padding: "5px", textAlignLast: "center" }}>{element.name}</GridItem>
														<GridItem sm={6} md={2} style={{ padding: "5px", textAlignLast: "center" }}>{secondsToHms(element.reservationTime, "t")}</GridItem>
														<GridItem sm={6} md={2} style={{ padding: "5px", textAlignLast: "center" }}>{element.covers}</GridItem>
														<GridItem sm={6} md={3} style={seatedStyle}>{element.state}</GridItem>
														
													</GridContainer>
												</CardContent>
											</CardActionArea>
										</Card>
									</GridItem>
								)
							}) : ""}
						</GridItem>
					</GridItem>
							
					<Dialog open={open} selectedData={select} onCloses={handleColse} />
				</GridContainer>
			</GridItem>
		</GridItem>
	);
}
