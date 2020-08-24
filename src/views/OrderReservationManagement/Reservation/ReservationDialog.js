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
	const [stateOrder, setStateOrder] = React.useState("RESERVED");

	React.useEffect(() => {
		setStateOrder(props.selectedData.state)
	}, []);


	const handleClose = () => {
		localStorage.removeItem("selectedNum");
		props.onCloses();
	}

	function handleChange(e) {
		setStateOrder(e.target.value);
	}

	function handleSave() {
		var config = {
			method: 'put',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/order/update/state/${props.selectedData.id}?state=${stateOrder}`,
			headers: {}
		};

		axios(config)
			.then(function (response) {
				props.onCloses()
			})
			.catch(function (error) {
			});
	}

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

		// seconds as 2 digits (ss)
		var seconds = ("0" + date_ob.getSeconds()).slice(-2);

		if(type=="d"){
			return( year + "-" + month + "-" +  date);
		} else {
			return( hours + ":" + minutes);
		}

	}

	return (
		<div>
			{
				props.selectedData ?
					<div>
						<Dialog aria-labelledby="customized-dialog-title" open={props.open} fullWidth={true} maxWidth={'md'}>
							<DialogTitle id="customized-dialog-title" style={{ borderBottom: "2px solid #c5c5c5" }} >
								<FastfoodIcon />Table Ordering
						</DialogTitle>
							<DialogContent>
								<GridContainer>
									<GridItem md={1} sm={4}>
										<h4 style={{ fontWeight: "bold" }}>Name:</h4>
									</GridItem>
									<GridItem md={3} sm={8}>
										<h4 style={{ fontWeight: "400" }}>{props.selectedData.name}</h4>
									</GridItem>
									<GridItem md={1} sm={4}>
										<h4 style={{ fontWeight: "bold" }}>Date:</h4>
									</GridItem>
									<GridItem md={3} sm={8}>
										<h4 style={{ fontWeight: "400" }}>{secondsToHms(props.selectedData.reservationTime, "d")}</h4>
									</GridItem>
									<GridItem md={1} sm={4}>
										<h4 style={{ fontWeight: "bold" }}>Time:</h4>
									</GridItem>
									<GridItem md={3} sm={8}>
										<h4 style={{ fontWeight: "400" }}>{secondsToHms(props.selectedData.reservationTime, "t")}</h4>
									</GridItem>
									<GridItem md={3} sm={3}>
										<h4 style={{ fontWeight: "bold" }}>Table Id:</h4>
									</GridItem>
									<GridItem md={3} sm={3}>
										<h4 style={{ fontWeight: "400" }}>{props.selectedData.tableID}</h4>
									</GridItem>
									<GridItem md={3} sm={3}>
										<h4 style={{ fontWeight: "bold" }}>Covers:</h4>
									</GridItem>
									<GridItem md={3} sm={3}>
										<h4 style={{ fontWeight: "400" }}>{props.selectedData.covers}</h4>
									</GridItem>
									<GridItem md={2} sm={2}>
										<h4 style={{ fontWeight: "bold" }}>Creator:</h4>
									</GridItem>
									<GridItem md={10} sm={10}>
										<h4 style={{ fontWeight: "400" }}>{props.selectedData.createdBy}</h4>
									</GridItem>
								</GridContainer>
							</DialogContent>
							<DialogActions>
								<GridContainer style={{ paddingTop: "0px" }}>
									<GridItem sm={6}>
										<div style={{ width: "100%" }}>
											<FormControl className={classes.formControl}>
												<InputLabel id="demo-simple-select-label">State</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={stateOrder}
													onChange={handleChange}
												>
													<MenuItem value={"CANCELLED"}>CANCELLED </MenuItem>
													<MenuItem value={"SEATED"}>SEATED</MenuItem>
													<MenuItem value={"ABSENT"}>ABSENT</MenuItem>
													<MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
													<MenuItem value={"RESERVED"}>RESERVED</MenuItem>
												</Select>
											</FormControl>
										</div>
									</GridItem>
									<GridItem sm={6}>
										<GridContainer style={{ marginTop: "22px" }}>
											<GridItem sm={6}>
												<Button autoFocus variant="contained" color="primary" onClick={handleSave} style={{ textTransform: "capitalize", width: "100%" }}>
													Save
											</Button>
											</GridItem>
											<GridItem sm={6}>
												<Button autoFocus variant="contained" color="primary" onClick={handleClose} style={{ textTransform: "capitalize", width: "100%" }}>
													Cancel
											</Button>
											</GridItem>
										</GridContainer>
									</GridItem>
								</GridContainer>
							</DialogActions>
						</Dialog>
					</div>
					: ""
			}
		</div>
	);
}
