import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import "react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "components/GallerySlider/ImageGallery.js";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import MenuDetabe from "./MenuTabs.js";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import KitchenIcon from '@material-ui/icons/Kitchen';
import Button from '@material-ui/core/Button';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import Switch from '@material-ui/core/Switch';

// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import styles from "assets/jss/material-kit-react/views/components.js";
import axios from "axios"
// import Skeleton from "react-skeleton-loading";

import './establish.css'


const useStyles = makeStyles(styles);

export default function Components(props) {
	const classes = useStyles();
	const { ...rest } = props;
	const [establishmentDetail, setEstablishment] = React.useState({});
	const [todayOpen, setTodayOpen] = React.useState([]);
	const [btnFlag, setBtnFlag] = React.useState(false);

	React.useEffect(() => {
		initGetData();
	},
	// eslint-disable-next-line
	[]);

	function initGetData() {
		var Id = localStorage.getItem("selectedEstablishmentId");
		var config = {
			method: 'get',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/establishment/getByID/${Id}`,
			headers: {}
		};

		axios(config)
			.then((response) => {
				localStorage.setItem("orderAddress", response.data.address);
				setEstablishment(response.data);
				getTodayOpenClose(response.data);
			})
			.catch((error) => {
			});
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

	function secondsToHms(d) {
		var sec_num = Number(d) // don't forget the second param
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

		if (hours < 10) { hours = "0" + hours; }
		if (minutes < 10) { minutes = "0" + minutes; }
		if (seconds < 10) { seconds = "0" + seconds; }
		return hours + ':' + minutes;
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

	function getTodayOpenClose(data) {
		var special = getToday("day");
		var normal = getToday().toUpperCase();
		if (data.operatingHours.specialDays[special] !== undefined) {
			setTodayOpen(data.operatingHours.specialDays[special]);
		} else {
			if (data.operatingHours.normalDays[normal] !== undefined) {
				setTodayOpen(data.operatingHours.normalDays[normal]);
			} else {
				setTodayOpen([]);
			}
		}
	}
	return (
		<div style={{ background: "#fff" }}>
			<Header
				brand="OnTab"
				rightLinks={<HeaderLinks />}
				fixed
				color="dark"
				changeColorOnScroll={{
					height: 100,
					color: "white"
				}}
				{...rest}
			/>
			<div className={classes.container} style={{ marginTop: "30px" }}>
				<GridContainer style={{ paddingTop: "100px" }}>
					<GridItem md={8} style={{ paddingLeft: "0" }}>
						<GridContainer>
							<GridItem sm={12}>
								<GridContainer>
									<GridItem md={12} style={{ paddingLeft: "0" }}>
										<h2>{establishmentDetail.name}</h2>
									</GridItem>
									<GridItem md={12} style={{ paddingLeft: "0" }}>
										<h5 style={{ fontSize: "22px", fontWeight: "400" }}>{objectToString(establishmentDetail.address, 1)}<IconButton aria-label="settings">
											<LocationOnIcon />
										</IconButton></h5>
									</GridItem>
									<GridContainer>
										<GridItem sm={6} style={{ paddingLeft: "0" }}>
											<h4 style={{ fontWeight: "400", display: "flex", alignItem: "center" }}><MailIcon /> {establishmentDetail.email}</h4>
										</GridItem>
										<GridItem sm={6} style={{ paddingLeft: "0" }}>
											<h4 style={{ fontWeight: "400", display: "flex", alignItem: "center" }}><PhoneIcon /> {establishmentDetail.telephone}</h4>
										</GridItem>
										<GridItem sm={12} style={{ paddingLeft: "0" }}>
											<h5 style={{ fontWeight: "400" }}>Site: <a href={establishmentDetail.www}>{establishmentDetail.www}</a></h5>
										</GridItem>
										<GridItem sm={12} style={{ paddingLeft: "0", marginBottom: "15px" }}>
											{
												establishmentDetail.cuisines !== undefined ? establishmentDetail.cuisines.map((element, i) => {
													return (
														<font key={i} style={{
															backgroundColor: "#e8e8e8",
															margin: "4px",
															borderRadius: "6px",
															padding: "3px"
														}}>{element}</font>
													)
												}) : ""
											}
										</GridItem>

									</GridContainer>
								</GridContainer>
							</GridItem>
						</GridContainer>
						<GridContainer>
							<MenuDetabe />
						</GridContainer>
					</GridItem>
					{
						establishmentDetail.reservationConfiguration !== undefined ?
							<GridItem md={4}>
								<GridContainer>
									<GridItem sm={12} style={{padding: "0px", marginBottom: "24px", marginTop: "32px", borderRadius: "6px"}}>
										{
											establishmentDetail.logoURL&&<ImageGallery url={establishmentDetail.logoURL&&establishmentDetail.logoURL.replace("<sizeHere>", "desktop")} />
										}
									</GridItem>
								</GridContainer>
								<GridContainer spacing={3}>
									<GridItem sm={12}>
										<div style={{ padding: "15px", border: "1px solid rgb(51 122 183)", borderRadius: "5px" }}>
											<h5 style={{ fontWeight: "500" }}>
												Operating Hours:
										</h5>
											<GridContainer>
												<GridItem sm={12} style={{ paddingLeft: "0" }}>
													<h5 style={{ fontWeight: "400", borderBottom: "1px solid #cfcfcf" }}>Today:</h5>
												</GridItem>

												<GridItem sm={12} style={{ paddingLeft: "12" }}>
													<h4 style={{ fontWeight: "400" }}>{getToday("day") + " " + getToday()}</h4>
												</GridItem>
												{
													todayOpen.length > 0 ? todayOpen.map((element, i) => {
														return (
															<GridContainer key={i}>

																<GridItem sm={3}>
																	<h4 style={{ fontWeight: "400" }}>Open</h4>
																</GridItem>

																<GridItem sm={3}>
																	<h4 style={{ fontWeight: "400" }}>{secondsToHms(element.open)}</h4>
																</GridItem>

																<GridItem sm={3}>
																	<h4 style={{ fontWeight: "400" }}>Close</h4>
																</GridItem>

																<GridItem sm={3}>
																	<h4 style={{ fontWeight: "400" }}>{secondsToHms(element.close)}</h4>
																</GridItem>

															</GridContainer>
														)
													}) : ""
												}
											</GridContainer>
											{
												btnFlag ?
													<GridContainer>
														<h5 style={{ paddingBottom: "8px", borderBottom: "1px solid #cfcfcf", fontWeight: "400", width: "100%" }}>
															Special:<br />
														</h5>
														{
															Object.entries(establishmentDetail.operatingHours.specialDays).map((parent, i) => {
																return (
																	<GridContainer key={i} style={{ fontWeight: "400" }}>
																		<GridItem sm={12} style={{ backgroundColor: "#9f9f9f17", borderRadius: "4px" }}>
																			- {parent[0]}
																		</GridItem>
																		{
																			parent[1].map((child, j) => {
																				return (
																					<GridContainer key={j}>
																						<GridItem sm={1}></GridItem>
																						<GridItem sm={2}>Open:</GridItem>
																						<GridItem sm={3}>
																							{secondsToHms(child["open"])}
																						</GridItem>
																						<GridItem sm={2}>Close:</GridItem>
																						<GridItem sm={3}>
																							{secondsToHms(child["close"])}
																						</GridItem>
																					</GridContainer>
																				)
																			})
																		}
																	</GridContainer>
																)
															})
														}
														<h5 style={{ fontWeight: "400", borderBottom: "1px solid #cfcfcf", lineHeight: "30px", width: "100%" }}> Normal:<br />
														</h5>
														{
															Object.entries(establishmentDetail.operatingHours.normalDays).map((parent, i) => {
																return (
																	<GridContainer key={i} style={{ fontWeight: "400" }}>
																		<GridItem sm={12} style={{ backgroundColor: "#9f9f9f17", borderRadius: "4px" }}>
																			- {parent[0]}
																		</GridItem>
																		{
																			parent[1].map((child, j) => {
																				return (
																					<GridContainer key={j}>
																						<GridItem sm={1}></GridItem>
																						<GridItem sm={2}>Open:</GridItem>
																						<GridItem sm={3}>
																							{secondsToHms(child["open"])}
																						</GridItem>
																						<GridItem sm={2}>Close:</GridItem>
																						<GridItem sm={3}>
																							{secondsToHms(child["close"])}
																						</GridItem>
																					</GridContainer>
																				)
																			})
																		}
																	</GridContainer>
																)
															})
														}
													</GridContainer> : ""

											}

											{
												!btnFlag ?
												<Button
													variant="outlined"
													color="primary"
													className={classes.button}
													startIcon={<ExpandMoreIcon />}
													onClick={() => setBtnFlag(true)}
													style={{ width: "100%" }}>
													More Info...
												</Button> :
												<Button
													variant="outlined"
													color="primary"
													className={classes.button}
													startIcon={<ExpandLessIcon />}
													onClick={() => setBtnFlag(false)}
													style={{ width: "100%" }}>
													Back
												</Button>
											}

										</div>
									</GridItem>
									{console.log(establishmentDetail)}
									<GridItem sm={12}>
										<div style={{ padding: "15px", border: "1px solid rgb(51 122 183)", borderRadius: "5px" }}>
											<div style={{ alignItems: "center", display: "flex", fontWeight: "400", paddingBottom: "8px", borderBottom: "1px solid #cfcfcf" }}>
												<GridItem style={{ display: "flex" }} sm={8}><EmojiFoodBeverageIcon style={establishmentDetail.takeawayAvailable ? { color: "#337ab7" } : {}} />Click and collect:</GridItem>
												<GridItem style={{ float: "right" }} sm={4}>
												<Switch
													checked={establishmentDetail.takeawayAvailable}
													color="primary"
												/>
												</GridItem>
											</div>
											<div style={{ alignItems: "center", display: "flex", fontWeight: "400", paddingBottom: "8px", borderBottom: "1px solid #cfcfcf" }}>
												<GridItem style={{ display: "flex" }} sm={8}>
												<FastfoodIcon style={establishmentDetail.tableOrderingAvailable ? { color: "#337ab7" } : {}} />Table ordering:
												</GridItem>
												<GridItem style={{ float: "right" }} sm={4}>
												<Switch
													checked={establishmentDetail.tableOrderingAvailable}
													color="primary"
												/>
												</GridItem>
											</div>
											<div style={{ alignItems: "center", display: "flex", fontWeight: "400", paddingBottom: "8px" }}>
												<GridItem style={{ display: "flex" }} sm={8}>
													<KitchenIcon style={establishmentDetail.reservationAvailable ? { color: "#337ab7" } : {}} />Reservations:
												</GridItem>
												<GridItem style={{ float: "right" }} sm={4}>
													<Switch
														checked={establishmentDetail.reservationAvailable}
														color="primary"
													/>
												</GridItem>
											</div>
										</div>
									</GridItem>
								</GridContainer>
							</GridItem> : ""

					}
				</GridContainer>
			</div>
		</div>
	);
}
