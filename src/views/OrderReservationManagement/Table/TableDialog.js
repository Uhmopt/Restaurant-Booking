import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridContainer from 'components/Grid/GridContainer.js';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import GridItem from 'components/Grid/GridItem.js';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 340,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function FormDialog(props) {

	const classes = useStyles();
	const [stateOrder, setStateOrder] = React.useState("RQUESTED");

	React.useEffect(() => {
		// setStateOrder(props.selectedData.state)
	}, [props]);


	const handleClose = () => {
		localStorage.removeItem("selectedNum");
		props.onCloses();
	}

	function handleChange (e) {
		setStateOrder(e.target.value);
	}

	function handleSave() {
		var config = {
			method: 'put',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/order/update/state/${props.selectedData.id}?state=${stateOrder}`,
			headers: { }
		};

		axios(config)
		.then(function (response) {
			props.onCloses()
		})
		.catch(function (error) {
		});
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

	function objectToString (obj, v) {
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
	return (
		<div>
			{
				props.selectedData?
				<div>
					<Dialog aria-labelledby="customized-dialog-title" open={props.open} fullWidth={true} maxWidth = {'md'}>
						<DialogTitle id="customized-dialog-title" style={{ borderBottom: "2px solid #c5c5c5" }} >
							<FastfoodIcon />Table Order Manage
						</DialogTitle>
						<DialogContent>
							<GridContainer>
								
								<GridItem md={2} sm={4}>
									<h4 style={{ fontWeight: "bold" }}>Table NO:</h4>
								</GridItem>
								<GridItem md={4} sm={8}>
									<h4 style={{ fontWeight: "400" }}>{ props.selectedData.tableNo }</h4>
								</GridItem>
								<GridItem md={2} sm={4}>
									<h4 style={{ fontWeight: "bold" }}>State:</h4>
								</GridItem>
								<GridItem md={4} sm={8}>
									<h4 style={{ fontWeight: "400" }}>{props.selectedData.state}</h4>
								</GridItem>
								<GridItem md={2} sm={4}>
									<h4 style={{ fontWeight: "bold" }}>Date:</h4>
								</GridItem>
								<GridItem md={4} sm={8}>
									<h4 style={{ fontWeight: "400" }}>{secondsToHms( props.selectedData.time, "d" )}</h4>
								</GridItem>
								<GridItem md={2} sm={4}>
									<h4 style={{ fontWeight: "bold" }}>Time:</h4>
								</GridItem>
								<GridItem md={4} sm={8}>
									<h4 style={{ fontWeight: "400" }}>{secondsToHms( props.selectedData.time )}</h4>
								</GridItem>
								<GridItem md={8} sm={10} >
									<h4 style={{ fontWeight: "bold" }}>Orders:</h4>
								</GridItem>
								<GridItem md={4} sm={2}>
								</GridItem>
									{
										props.selectedData.orders?props.selectedData.orders.map((element)=>{
											return (
												<GridContainer style={{ backgroundColor: "#ececec", borderRadius: "6px" }} >
													<GridItem md={1} sm={2}>
													</GridItem>
													<GridItem md={2} sm={4}>
														<h4 style={{ fontWeight: "bold" }}>OrderID:</h4>
													</GridItem>
													<GridItem md={3} sm={6}>
														<h4 style={{ fontWeight: "400" }}>{element.id}</h4>
													</GridItem>
													<GridItem md={1} sm={2}>
													</GridItem>
													<GridItem md={2} sm={4}>
														<h4 style={{ fontWeight: "bold" }}>Time:</h4>
													</GridItem>
													<GridItem md={3} sm={6}>
														<h4 style={{ fontWeight: "400" }}>{secondsToHms(element.time)}</h4>
													</GridItem>
													<GridItem md={1} sm={2}>
													</GridItem>
													<GridItem md={2} sm={4}>
														<h4 style={{ fontWeight: "bold" }}>Comment:</h4>
													</GridItem>
													<GridItem md={3} sm={6}>
														<h4 style={{ fontWeight: "400" }}>{element.comments}</h4>
													</GridItem>
													<GridItem md={1} sm={2}>
													</GridItem>
													<GridItem md={2} sm={4}>
														<h4 style={{ fontWeight: "bold" }}>Total:</h4>
													</GridItem>
													<GridItem md={3} sm={6}>
														<h4 style={{ fontWeight: "400" }}>{element.total}</h4>
													</GridItem>
													<GridItem md={1} sm={2}>
													</GridItem>
													<GridItem md={2} sm={4}>
														<h4 style={{ fontWeight: "bold" }}>Items:</h4>
													</GridItem>
													<GridItem md={9} sm={6}>
														<h4 style={{ fontWeight: "400" }}>{objectToString(element.items, 0)}</h4>
													</GridItem>
												</GridContainer>

											)
										}):""
									}
																	
								<GridItem md={2} sm={4}>
									<h4 style={{ fontWeight: "bold" }}>Updates:</h4>
								</GridItem>
								<GridItem md={4} sm={8}>
									<h4 style={{ fontWeight: "400" }}>{props.selectedData.updates}</h4>
								</GridItem>
								<GridItem md={2} sm={4}>
									<h4 style={{ fontWeight: "bold" }}>Total:</h4>
								</GridItem>
								<GridItem md={4} sm={8}>
									<h4 style={{ fontWeight: "400" }}>{props.selectedData.total}£</h4>
								</GridItem>
							</GridContainer>
						</DialogContent>
						<DialogActions>
							<GridContainer style={{ paddingTop: "0px" }}>
								<GridItem sm={6}>
									<div style={{ width: "100%"}}>
										<FormControl className={classes.formControl}>
											<InputLabel id="demo-simple-select-label">State</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={stateOrder}
												onChange={handleChange}
											>
												<MenuItem value={"ACCEPT"}>ACCEPT </MenuItem>
												<MenuItem value={"DECLINE"}>DECLINE</MenuItem>
												<MenuItem value={"SETTLETAB"}>SETTLETAB</MenuItem>
												<MenuItem value={"CLOSE"}>CLOSE</MenuItem>
											</Select>

											</FormControl>
									</div>
								</GridItem>
								<GridItem sm={6}>
									<GridContainer style={{ marginTop: "22px" }}>
										<GridItem sm={6}>
											<Button autoFocus  variant="contained" color="primary" onClick={handleSave} style={{textTransform: "capitalize", width: "100%"}}>
												Save
											</Button>
										</GridItem>
										<GridItem sm={6}>
											<Button autoFocus  variant="contained" color="primary" onClick={handleClose} style={{textTransform: "capitalize",  width: "100%"}}>
												Cancel
											</Button>
										</GridItem>
									</GridContainer>


								</GridItem>
							</GridContainer>
						</DialogActions>
					</Dialog>
				</div>
				:""
			}
		</div>

	);
}


// [
//   {
//     "id": "5f0752a70bd4e36ad6b98d1c",
//     "establishmentID": "5f06e67f35ecd501c7eee85f",
//     "customerID": "5ee750990151944e48cf2b09",
//     "tableNo": 7,
//     "state": "OPEN",
//     "updates": [],
//     "time": 1594234800,
//     "orders": [
//       {
//         "id": 2,
//         "time": 1594234800,
//         "state": "RECEIVED",
//         "items": {
//           "burger": 2
//         },
//         "total": 22.5,
//         "comments": "Medium Rare"
//       }
//     ],
//     "total": 45,
//     "createdDate": "2020-07-09T17:23:51.791+0000",
//     "createdBy": "anonymousUser",
//     "lastModifiedDate": "2020-07-09T17:36:10.652+0000",
//     "lastModifiedBy": "anonymousUser"
//   }
// ]