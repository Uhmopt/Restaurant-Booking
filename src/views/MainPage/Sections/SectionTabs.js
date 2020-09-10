import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Button from "components/CustomButtons/Button.js";
import SearchIcon from '@material-ui/icons/Search';
import CustomInput from "components/CustomInput/CustomInput.js";
// core components
import TextField from '@material-ui/core/TextField';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import orange from "@material-ui/core/colors/orange";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import SelectBox from "./SelectBox";
import SelectTime from "./SelecetTime";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import styles from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
// toastr
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import axios from 'axios';

const useStyles = makeStyles(styles);
const defaultMaterialTheme = createMuiTheme({
	palette: {
		primary: orange,
	},
});

function CssThemeExample() {
	const classes = useStyles();
	const history = useHistory();
	const [collect, setCollect] = useState("");
	const [distance, setDistance] = useState(5);
	const [bookPcode, setBookPcode] = useState("");
	const [bookDistance, setBookDistance] = useState(5);
	const [bookDate, setBookDate] = useState("");
	const [sendDate, setSendDate] = useState("");
	const [bookTime, setBookTime] = useState("12:00");
	const [bookCover, setBookCover] = useState("");

	useEffect(() => {
		setBookDate( (new Date()).toISOString() );
	}, []);

	function collectSearch() {
		if (!collect) {
			toastr.warning("Please input Post Code first", "Notification");
			return false;
		}
		var config = {
			method: 'get',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/establishment/getByLocationPostcode?postcode=${collect}&distance=${distance}`,
			headers: { }
			};
	
			axios(config)
			.then(function (res) {
				localStorage.setItem('restaurantList', JSON.stringify(res.data));
				localStorage.setItem('lsClickSearch', collect);
				localStorage.setItem('lsClickDistance', distance);
				history.push('/click-collect');
			})
			.catch(function (error) {
			console.log(error);
				toastr.error("Sorry, we couldn't find any results that matched your search", "Try going to find more restaurants.");
			});
	}

	function bookSearch() {
		console.log(bookDistance, "hey this iss the distance");
		if (!bookPcode||!bookCover) {
			toastr.warning("Please input Post Code and People first", "Notification");
			return false;
		}
		setSendDate(bookDate + "T" + bookTime)
		localStorage.setItem("bookPcode", bookPcode);
		localStorage.setItem("bookDistance", bookDistance);
		localStorage.setItem("bookDate", sendDate);
		localStorage.setItem("bookCover", bookCover);
		

		var date = new Date(sendDate);
		var seconds = date.getTime() / 1000;
		console.log(date, seconds);
		var config = {
			method: 'get',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/establishment/getEstablishmentsReservationByLocationPostcode?postcode=${bookPcode}&distance=${bookDistance}&time=${Math.ceil(seconds)}&covers=${bookCover}`, //this is the complete url			
			headers: { }
		};
		axios(config)
		.then(function (response) {
			console.log(response.data)
			
			if (response.data.length===0) {
				toastr.error("No establishments were found to match your reservation requirements", "Try going to find more restaurants.");
			} else {
				localStorage.setItem('bookList', JSON.stringify(Object.entries(response.data)));
				history.push('search-table')
			}
		})
		.catch(function (error) {
			toastr.error("Sorry, we couldn't find any results that matched your search", "Try going to find more restaurants.");
		});
	}

	function handleCollect(e) {
		setCollect(e.target.value)
	}

	function handledistance(e) {
		setDistance(e)
		setBookDistance(e);
	}

	function handleBookPost(e) {
		setBookPcode(e.target.value)
	}

	function handleBookDate(e) {
		setSendDate(e.toISOString().substr(0, 10) + "T" + bookTime)
		setBookDate(e.toISOString().substr(0, 10))
	}

	function handleBookTime(e) {
		setBookTime(e)
		setSendDate( bookDate + "T" + e )
	}

	function handleBookCover(e) {
		if(e.target.value >= 0) {
			setBookCover(e.target.value)
		}
	}

	return (
		<div className={classes.section} style={{marginTop: "163px"}}>
			<div className={classes.container}>
				<div id="nav-tabs">
					<GridContainer>
						<GridItem xs={12} sm={12} md={12}>
							<CustomTabs
								headerColor="warning"
								tabs={[
									{
										tabName: "Click & Collect",
										tabContent: (
											<GridContainer>
												<GridItem xs={12} md={6}>
													<CustomInput
														id="postcode"
														error
														inputProps={{
															placeholder: "Post Code",
															onChange: (event) => handleCollect(event),
														}}
														value={collect}
														formControlProps={{
															fullWidth: true
														}}
													/>
												</GridItem>
												<GridItem xs={12} md={3}>
													<SelectBox value={distance} onClick={handledistance}/>
												</GridItem>
												<GridItem xs={12} md={3}>
													<Button color="warning" round onClick={collectSearch} >
														<SearchIcon className={classes.icons}/> Search...
													</Button>
												</GridItem>
											</GridContainer>
										)
									},
									{
										tabName: "Book a Table",
										tabContent: (
											<GridContainer>
												<GridItem xs={12} md={2}>
													<CustomInput
														id="postcode"
														error
														inputProps={{
															placeholder: "Post Code",
															onChange: (event) => handleBookPost(event),
														}}
														value={ bookPcode }
														formControlProps={{
															fullWidth: true
														}}
													/>
												</GridItem>
												<GridItem sm={12} md={2} style={{marginTop: "2px"}}>

													<MuiPickersUtilsProvider utils={MomentUtils} style={{ width: "100%" }}>
														<ThemeProvider theme={defaultMaterialTheme}>
															<KeyboardDatePicker
																disableToolbar
																variant="inline"
																format="MM/DD/yyyy"
																margin="normal"
																id="date"
																label="Date"
																value={bookDate}
																style={{ width: "100%", marginTop: "10px" }}
																onChange={(event) =>
																	handleBookDate(event)
																}
																KeyboardButtonProps={{
																	'aria-label': 'change date',
																}}
															/>	
														</ThemeProvider>
													</MuiPickersUtilsProvider>
												</GridItem>

												<GridItem sm={12} md={2} style={{paddingTop: "12px"}}>
													<SelectTime value={bookTime} onClick={handleBookTime}/>
												</GridItem>

												<GridItem sm={12} md={2}>
													<SelectBox value={distance} onClick={handledistance}/>
												</GridItem>

												<GridItem sm={12} md={2} style={{ marginTop: "12px" }}>
													<TextField
														label="people"
														onChange = {(event) => handleBookCover(event)}
														type="number"
														value={bookCover}
													/>
												</GridItem>
												
												<GridItem sm={12} md={2}>
													<Button color="warning" style={{textAlign: "center"}} onClick={bookSearch} round>
														<SearchIcon className={classes.icons} /> Search...
													</Button>
												</GridItem>
											</GridContainer>
										)
									},
								]}
							/>
						</GridItem>
					</GridContainer>
				</div>
			</div>
		</div>
	);
}
export default CssThemeExample;
