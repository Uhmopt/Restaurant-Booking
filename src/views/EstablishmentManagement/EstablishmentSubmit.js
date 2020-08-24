import React, { useState, useRef } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Checkbox from "@material-ui/core/Checkbox";
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import BackButton from '@material-ui/core/Button';
import MultiSelect from "./components/MutiSelect.js";
import TimeZone from "./components/TimeZone.js";
import EditTable from "./components/EditTable.js"
import SpecialDay from "./components/SpecialDay.js";
import NormalDay from "./components/NormalDay.js";
import EstablishmentImage from "./components/EstablishmentImage.js";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import PrintIcon from '@material-ui/icons/Print';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import styles1 from "assets/jss/material-kit-react/views/components.js";
import styles2 from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import QrCode from "./components/QrCode"
// print the image
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";

// toastr
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import axios from 'axios';

const useStyles = makeStyles(styles1);
const useStyles_basic = makeStyles(styles2);
export default function LoginPage() {
	establishment = JSON.parse(localStorage.getItem("establishment"));
	const history = useHistory();
	const classes = useStyles();
	const classes_bb = useStyles_basic();

	const [TakeAwayAvailable, setTakeAwayAvailable] = useState(false);
	const [TableOrderingAvailable, setTableOrderingAvailable] = useState(false);
	const [ReservationAvailable, setReservationAvailable] = useState(false);

	const [cuisines, setCuisines] = useState([]);

	function handleTakeAwayAvailable(e) {
		setTakeAwayAvailable(!TakeAwayAvailable);
	}

	function handleTableOrderingAvailable(e) {
		setTableOrderingAvailable(!TableOrderingAvailable);
	}

	function handleReservationAvailable(e) {
		setReservationAvailable(!ReservationAvailable);
	}

	function handlePublished(e) {
		setPublished(!published);
	}
	const [eid, setId] = useState("");
	const [name, setName] = useState("");
	const [streetOne, setStreetOne] = useState("");
	const [streetTwo, setStreetTwo] = useState("");
	const [city, setCity] = useState("");
	const [county, setCounty] = useState("");
	const [postcode, setPostcode] = useState("");
	const [countryCode, setCountryCode] = useState("");
	const [phone, setPhone] = useState("");
	const [timezone, setTimeZone] = useState("Europe/London");
	const [email, setEmail] = useState("");
	const [image, setImage] = useState({});
	const [table, setTable] = useState([]);
	const [special, setSpecial] = useState({});
	const [normal, setNormal] = useState({});
	const [tuesDuration, setTuesDuration] = useState([]);
	const [wedDuration, setWedDuration] = useState([]);
	const [monDuration, setMonDuration] = useState([]);
	const [thursDuration, setThursDuration] = useState([]);
	const [friDuration, setFriDuration] = useState([]);
	const [satDuration, setSatDuration] = useState([]);
	const [sunDuration, setSunDuration] = useState([]);
	const [www, setWWW] = useState("");
	const [published, setPublished] = useState(false);
	const [lastOrderAsMinutesFromClose, setLastOrderAsMinutesFromClose] = useState("");
	const [lastReservationAsMinutesFromClose, setLastReservationAsMinutesFromClose] = useState("");

	const qrCodeImage = useRef(null);

	let establishment = null

	function handleName(e) {
		e.preventDefault()
		setName(e.target.value)
	}
	function handleStreetOne(e) {
		e.preventDefault()
		setStreetOne(e.target.value)
	}
	function handleStreetTwo(e) {
		setStreetTwo(e.target.value)
	}
	function handlePostcode(e) {
		e.preventDefault()
		setPostcode(e.target.value)
	}
	function handleCounty(e) {
		e.preventDefault()
		setCounty(e.target.value)
	}
	function handleCity(e) {
		e.preventDefault()
		setCity(e.target.value)
	}
	function handleCountryCode(e) {
		e.preventDefault()
		setCountryCode(e.target.value)
	}
	function handleEmail(e) {
		e.preventDefault()
		setEmail(e.target.value)
	}
	function handlePhone(e) {
		e.preventDefault()
		setPhone(e.target.value)
	}
	function handleTimeZone(e) {
		setTimeZone(e)
	}
	function handleUpload(e) {
		console.log(e)
		setImage(e)
	}
	function handleTable(e) {
		console.log(e)
		setTable(e);
	}
	function handleSpecial(e) {
		setSpecial(e);
	}
	function handleNormal(e) {
		console.log(JSON.stringify(e), "setnormal");
		setNormal(e);
	}
	function handleSiteUrl(e) {
		setWWW(e.target.value);
	}
	// console.log(JSON.stringify(normal),"json")
	function registerEstablishment() {


		console.log("tableOrderingAvailable", TableOrderingAvailable, "reservationAvailable", ReservationAvailable, "clickCollectAvailable", TakeAwayAvailable)
		var token = localStorage.getItem("access_token");

		var data = {
			"name": name,
			"address": {
				"streetOne": streetOne,
				"streetTwo": streetTwo,
				"city": city,
				"county": county,
				"postcode": postcode,
				"countryCode": countryCode
			},
			"timezone": timezone,
			"logoURL": "",
			"telephone": phone,
			"email": email,
			"www": www,
			"tableOrderingAvailable": TableOrderingAvailable,
			"reservationAvailable": ReservationAvailable,
			"clickCollectAvailable": TakeAwayAvailable,
			"reservationConfiguration": {
				"tables": table,
				"monDuration": monDuration,
				"tuesDuration": tuesDuration,
				"wedDuration": wedDuration,
				"thursDuration": thursDuration,
				"friDuration": friDuration,
				"satDuration": satDuration,
				"sunDuration": sunDuration
			},
			"operatingHours": {
				"specialDays": special,
				"normalDays": normal,
				"lastOrderAsMinutesFromClose": lastOrderAsMinutesFromClose,
				"lastReservationAsMinutesFromClose": lastReservationAsMinutesFromClose
			},

			"cuisines": cuisines
		}
		if (localStorage.getItem('insertEstablishmentFlag') == "false") {
			data["id"] = eid;
			data["published"] = published;
			var config = {
				method: 'put',
				url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/establishment/update',
				headers: {
					"Authorization": `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: data
			};

			axios(config)
				.then(function (response) {
					history.push("establishment-management");
				})
				.catch(function (error) {
					console.log(error);
				});
				
		} else {
			var config = {
				method: 'post',
				url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/establishment/register',
				headers: {
					"Authorization": `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				data: data,

			};

			axios(config)
				.then(function (response) {
					history.push("establishment-management");
				})
				.catch(function (error) {
					toastr.error('Check you establishment infomation and insert correctly', 'Submit error');
				});
		}

	}

	function handleDuration(e) {
		switch (e.target.id) {
			case "monDuration":
				setMonDuration(e.target.value)
				break;
			case "tuesDuration":
				setTuesDuration(e.target.value)
				break;
			case "wedDuration":
				setWedDuration(e.target.value)
				break;
			case "thursDuration":
				setThursDuration(e.target.value)
				break;
			case "friDuration":
				setFriDuration(e.target.value)
				break;
			case "satDuration":
				setSatDuration(e.target.value)
				break;
			default:
				setSunDuration(e.target.value)
				break;
		}

	}

	function handlePrint() {
		exportComponentAsPNG(qrCodeImage);
	}

	React.useEffect(() => {
		if (localStorage.getItem('insertEstablishmentFlag') == "false") {
			establishment = JSON.parse(localStorage.getItem("establishment"));
			console.log(establishment)
			setId(establishment.id);
			setName(establishment.name);
			setStreetOne(establishment.address.streetOne);
			setCity(establishment.address.city);
			setCounty(establishment.address.county);
			setPostcode(establishment.address.postcode);
			setCountryCode(establishment.address.countryCode);
			setPhone(establishment.telephone);
			setTimeZone(establishment.timezone);
			setEmail(establishment.email);
			setImage(establishment.logoURL);
			setTable(establishment.reservationConfiguration.tables);
			setSpecial(establishment.operatingHours.specialDays);
			setNormal(establishment.operatingHours.normalDays);
			setTuesDuration(establishment.reservationConfiguration.tuesDuration);
			setWedDuration(establishment.reservationConfiguration.wedDuration);
			setMonDuration(establishment.reservationConfiguration.monDuration);
			setThursDuration(establishment.reservationConfiguration.thursDuration);
			setFriDuration(establishment.reservationConfiguration.friDuration);
			setSatDuration(establishment.reservationConfiguration.satDuration);
			setSunDuration(establishment.reservationConfiguration.sunDuration);
			setPublished(establishment.published);
			setWWW(establishment.www);
			setTakeAwayAvailable(establishment.clickCollectAvailable == true);
			setTableOrderingAvailable(establishment.tableOrderingAvailable == true);
			setReservationAvailable(establishment.reservationAvailable == true);
			setCuisines(establishment.cuisines);
			setLastOrderAsMinutesFromClose(establishment.operatingHours.lastOrderAsMinutesFromClose)
			setLastReservationAsMinutesFromClose(establishment.operatingHours.lastReservationAsMinutesFromClose)
		}
	}, []);
	return (
		<div>
			<Header
				absolute
				color="dark"
				brand="OnTab"
				rightLinks={<HeaderLinks />}
			/>
			<div className={classNames(classes.main, classes.mainRaised)} style={{ marginTop: "100px" }}>
				<div className={classes.container}>
					<GridContainer justify="center">
						<GridItem xs={12} sm={12} md={9}>
							<GridContainer style={{ marginTop: "100px" }}>
								<GridItem sm={9}>
									<h2 style={{borderLeft: "4px solid #8BC34A", paddingLeft: "10px" }}>Establishment Management</h2>
								</GridItem>							
								<GridItem sm={3} style={{ marginTop: "31px" }}>
									<Link to="establishment-management">
										<BackButton
											variant="outlined"
											color="primary"
											className={classes.button}
											startIcon={<KeyboardReturnIcon />}
											style={{ width: "100%"}}>
											Back
										</BackButton>
									</Link>
								</GridItem>
							</GridContainer>
							
							<GridItem xs={12}>
								{
									localStorage.getItem("insertEstablishmentFlag") == "false" ?
										<EstablishmentImage imageUrl={image} image={handleUpload} /> : ""
								}

							</GridItem>
							<ValidatorForm
								onSubmit={registerEstablishment}
								onError={errors => console.log(errors)}
							>
								<GridContainer>
									<GridItem sm={8} md={10}>
										<TextValidator
											label="Establishment Name*"
											onChange={handleName}
											name="name"
											value={name}
											style={{ width: "100%", marginBottom: "10px" }}
											validators={['required']}
											errorMessages={['this field is required', 'Username is not valid']}
										/>
									</GridItem>

									<GridItem sm={4} md={2}>
										<FormControlLabel
											control={
												<Checkbox
													tabIndex={-1}
													onClick={() => handlePublished()}
													checked={published}
													checkedIcon={<Check className={classes_bb.checkedIcon} />}
													icon={<Check className={classes_bb.uncheckedIcon} />}
												/>
											}
											classes={{ label: classes_bb.label, root: classes_bb.labelRoot }}
											label="Published"
										/>
									</GridItem>
									<GridItem xs={12}>
										<h3 style={{ color: "#444", borderLeft: "4px solid #8BC34A", paddingLeft: "10px" }}>Address</h3>
									</GridItem>
									{/*Establishment Address start */}
									<GridContainer style={{ paddingLeft: "15px", paddingRight: "15px" }}>
										<GridItem sm={4} md={3}>
											<TextValidator
												label="Street One*"
												onChange={handleStreetOne}
												name="streetOne"
												value={streetOne}
												style={{ width: "100%", marginBottom: "10px" }}
												validators={['required']}
												errorMessages={['this field is required', 'Street One is not valid']}
											/>
										</GridItem>
										<GridItem sm={4} md={3}>
											<TextField
												id="standard-basic"
												onChange={handleStreetTwo}
												style={{ width: "100%", marginBottom: "10px" }}
												label="Street Two" />
										</GridItem>
										<GridItem sm={4} md={3}>
											<TextValidator
												label="City*"
												onChange={handleCity}
												name="city"
												value={city}
												style={{ width: "100%", marginBottom: "10px" }}
												validators={['required']}
												errorMessages={['this field is required', 'City is not valid']}
											/>
										</GridItem>
										<GridItem sm={4} md={3}>
											<TextValidator
												label="Post Code*"
												onChange={handlePostcode}
												name="postcode"
												value={postcode}
												style={{ width: "100%", marginBottom: "10px" }}
												validators={['required']}
												errorMessages={['this field is required', 'Post Code is not valid']}
											/>
										</GridItem>
										<GridItem sm={4}>
											<TextValidator
												label="County*"
												onChange={handleCounty}
												name="county"
												value={county}
												style={{ width: "100%", marginBottom: "10px" }}
												validators={['required']}
												errorMessages={['this field is required', 'County is not valid']}
											/>
										</GridItem>
										<GridItem sm={4}>
											<TextValidator
												label="Country Code*"
												onChange={handleCountryCode}
												name="countryCode"
												value={countryCode}
												style={{ width: "100%", marginBottom: "10px" }}
												validators={['required']}
												errorMessages={['this field is required', 'Country Code is not valid']}
											/>
										</GridItem>
										<GridItem sm={4}>
											<TimeZone data={timezone} onChange={handleTimeZone} />
										</GridItem>
										<GridItem sm={4}>
											<TextValidator
												label="Email*"
												onChange={handleEmail}
												name="email"
												value={email}
												style={{ width: "100%", marginBottom: "10px" }}
												validators={['required', 'isEmail']}
												errorMessages={['this field is required', 'Email is not valid']}
											/>
										</GridItem>
										<GridItem sm={4}>
											<TextValidator
												id="standard-basic"
												value={www}
												onChange={handleSiteUrl}
												validators={['required']}
												errorMessages={['this field is required', 'Site URL is not valid']}
												style={{ width: "100%", marginBottom: "10px" }}
												label="Site URL" />
										</GridItem>
										<GridItem sm={4}>
											<TextValidator
												label="Phone*"
												onChange={handlePhone}
												name="phone"
												value={phone}
												style={{ width: "100%", marginBottom: "10px" }}
												validators={['required']}
												errorMessages={['this field is required', 'Phone is not valid']}
											/>
										</GridItem>
										<GridItem sm={4}>
											<div
												className={
													classes.checkboxAndRadio +
													" " +
													classes.checkboxAndRadioHorizontal
												}
											>
												<FormControlLabel
													control={
														<Checkbox
															tabIndex={-1}
															onClick={() => handleTakeAwayAvailable()}
															checked={TakeAwayAvailable}
															checkedIcon={<Check className={classes_bb.checkedIcon} />}
															icon={<Check className={classes_bb.uncheckedIcon} />}
															classes={{
																checked: classes_bb.checked,
																root: classes_bb.checkRoot
															}}
														/>
													}
													classes={{ label: classes_bb.label, root: classes_bb.labelRoot }}
													label="Click And Collect Available"
												/>
											</div>
										</GridItem>
										<GridItem sm={4}>
											<div
												className={
													classes.checkboxAndRadio +
													" " +
													classes.checkboxAndRadioHorizontal
												}
											>
												<FormControlLabel
													control={
														<Checkbox
															tabIndex={-1}
															onClick={() => handleTableOrderingAvailable()}
															checked={TableOrderingAvailable}
															checkedIcon={<Check className={classes_bb.checkedIcon} />}
															icon={<Check className={classes_bb.uncheckedIcon} />}
															classes={{
																checked: classes_bb.checked,
																root: classes_bb.checkRoot
															}}
														/>
													}
													classes={{ label: classes_bb.label, root: classes_bb.labelRoot }}
													label="Table Ordering Available"
												/>
											</div>
										</GridItem>
										<GridItem sm={4}>
											<div
												className={
													classes.checkboxAndRadio +
													" " +
													classes.checkboxAndRadioHorizontal
												}
											>
												<FormControlLabel
													control={
														<Checkbox
															tabIndex={-1}
															onClick={() => handleReservationAvailable()}
															checked={ReservationAvailable}
															checkedIcon={<Check className={classes_bb.checkedIcon} />}
															icon={<Check className={classes_bb.uncheckedIcon} />}
															classes={{
																checked: classes_bb.checked,
																root: classes_bb.checkRoot
															}}
														/>
													}
													classes={{ label: classes_bb.label, root: classes_bb.labelRoot }}
													label="Reservation Available"
												/>
											</div>
										</GridItem>
									</GridContainer>
									{/*Establishment Address end */}

									<GridContainer style={{ paddingTop: "34px"}}>

										<GridItem sm={3}>
											<h3 style={{ color: "#444", borderLeft: "4px solid #8BC34A", paddingLeft: "10px" }}>QR Code:</h3>
										</GridItem>
										<GridItem sm={3}>
											{
												www?
												<BackButton
													variant="outlined"
													color="primary"
													className={classes.button}
													startIcon={<PrintIcon />}
													style={{ width: "100%", marginTop: "20px"}}
													onClick={handlePrint}
												>
													Print
												</BackButton>:""
											}
											
										</GridItem>
										
										{
											www?
											<GridItem sm={6} style={{ textAlign: "right" }}>
												<QrCode ref={qrCodeImage} id="qrCode" data={www} />
											</GridItem>:""
										}
										
										
									</GridContainer>
									
									<GridItem sm={12}>
										<h3 style={{ color: "#444", borderLeft: "4px solid #8BC34A", paddingLeft: "10px" }}>Reservation Configuration</h3>
									</GridItem>
									<GridItem>
										<GridItem sm={12} style={{ marginTop: "20px", marginBottom: "20px" }}>
											<EditTable data={table} table={handleTable} />
										</GridItem>
										<GridContainer style={{ marginBottom: "30px", marginTop: "30px", paddingLeft: "13px", paddingRight: "13px" }} spacing={1}>
											<GridItem md={6} sm={12} >
												<GridContainer spacing={1}>
													<GridItem md={3} sm={3}><h5 style={{ textAlign: "center", textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>Duration:</h5></GridItem>
													<GridItem md={3} sm={3}>
														<TextField id="monDuration" label="Mon" value={monDuration} variant="outlined" onChange={handleDuration} />
													</GridItem>
													<GridItem md={3} sm={3}>
														<TextField id="tuesDuration" label="Tue" value={tuesDuration} variant="outlined" onChange={handleDuration} />
													</GridItem>
													<GridItem md={3} sm={3} style={{ paddingRight: "0px" }}>
														<TextField id="wedDuration" label="Wed" value={wedDuration} variant="outlined" onChange={handleDuration} />
													</GridItem>
												</GridContainer>
											</GridItem>
											<GridItem md={6} sm={12} >
												<GridContainer spacing={1}>
													<GridItem md={3} sm={3}>
														<TextField id="thursDuration" label="Thurs" value={thursDuration} variant="outlined" onChange={handleDuration} />
													</GridItem>
													<GridItem md={3} sm={3}>
														<TextField id="friDuration" label="Fri" value={friDuration} variant="outlined" onChange={handleDuration} />
													</GridItem>
													<GridItem md={3} sm={3}>
														<TextField id="satDuration" label="Sat" value={satDuration} variant="outlined" onChange={handleDuration} />
													</GridItem>
													<GridItem md={3} sm={3}>
														<TextField id="sunDuration" label="Sun" value={sunDuration} variant="outlined" onChange={handleDuration} />
													</GridItem>
												</GridContainer>
											</GridItem>
										</GridContainer>
									</GridItem>
									<GridItem sm={12}>
										<h3 style={{ color: "#444", borderLeft: "4px solid #8BC34A", paddingLeft: "10px" }}>Operating Hours</h3>
									</GridItem>
									<GridItem>
										<GridItem sm={12} style={{ marginTop: "20px", marginBottom: "20px" }}>
											<SpecialDay data={JSON.stringify(special)} specialDay={handleSpecial} />
										</GridItem>
										<GridItem sm={12} style={{ marginTop: "20px", marginBottom: "20px" }}>
											<NormalDay data={JSON.stringify(normal)} normalDay={handleNormal} />
										</GridItem>
									</GridItem>
									<GridItem sm={12} style={{ marginTop: "20px" }}>
										<GridContainer spacing={2} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
											<GridItem sm={12} md={6}>
												<TextValidator id="thursDuration" fullWidth type="number" label="LastOrderAsMinutesFromClose" value={lastOrderAsMinutesFromClose ? lastOrderAsMinutesFromClose : ""} variant="outlined" onChange={(e) => setLastOrderAsMinutesFromClose(e.target.value)} validators={['required']} errorMessages={['this field is required']} />
											</GridItem>
											<GridItem sm={12} md={6}>
												<TextValidator id="thursDuration" fullWidth type="number" label="LastReservationAsMinutesFromClose" value={lastReservationAsMinutesFromClose ? lastReservationAsMinutesFromClose : ""} variant="outlined" onChange={(e) => setLastReservationAsMinutesFromClose(e.target.value)} validators={['required']} errorMessages={['this field is required']} />
											</GridItem>
										</GridContainer>
									</GridItem>

									<GridItem sm={12} style={{ marginTop: "20px", paddingLeft: "36px", paddingRight: "36px" }}>
										<MultiSelect val={cuisines} data={(e) => setCuisines(e)} />
									</GridItem>

									<GridItem sm={12}>
										<Button color="info" size="lg" style={{ marginTop: "40px", marginBottom: "80px", width: "100%" }} type="submit">
											SUBMIT
										</Button>
									</GridItem>
								</GridContainer>
							</ValidatorForm>
						</GridItem>
					</GridContainer>
				</div>
			</div>
		</div>
	);
}
