
import React, {useEffect} from 'react';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from "assets/jss/material-kit-react/views/components.js";
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import WeekDay from "./WeekDay.js";
const useStyles = makeStyles(styles);

export default function MaterialTableDemo( props ) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [normalDay, setNormalDay] = React.useState({});
	const [week, setWeek] = React.useState("");
	const [start, setStart] = React.useState("");
	const [end, setEnd] = React.useState("");

	useEffect(() => {
		PropsTimeToHMS();
	},
	// eslint-disable-next-line
	[props.data]);

	useEffect(() => {
		setWeek("MONDAY")
		setStart( "12:00" );
		setEnd( "20:00" );
	}, []);

	// Add time click event -> open dialog
	const handleClickOpen = () => {
		setOpen(true);
	};
	// Cancel click event -> close dialog
	const handleClose = () => {
		setOpen(false);
	};

	// Open time input change event -> set the open time state
	function handleStart (e) {
		setStart(e.target.value)
	}
	// End time input change event -> set the end time state
	function handleEnd (e) {
		setEnd(e.target.value)
	}
	function handleWeek (e) {
		setWeek(e);
	}

	// Add special day button click event -> add special day time and set the special day state
	function handleAddDay () {
		let fk_normalDay = {...normalDay};
		let flag = 0;
		let fk_day = week;
		for(
			// eslint-disable-next-line
			var i in fk_normalDay) {
			// If the insert special day is exist, add the work time
			if(fk_normalDay.hasOwnProperty(fk_day)) {
				fk_normalDay[fk_day].push({ "open": start, "close": end });
				flag = 1;
				break;
			}
		}
		// If the insert special day is none, add new work time
		if (flag===0) {
			let fk_day1 = {};
			fk_day1[fk_day] = [{ "open":start, "close": end }];
			fk_normalDay = Object.assign( fk_day1, fk_normalDay );
		}
		handleChange(fk_normalDay);
		setOpen(false);
	}
	// Update the time of the special date
	function updateTime (e) { 
		let fk_normalDay = normalDay;
		let value = e.target.id.split("||");
		Object.keys(fk_normalDay).forEach(function(key) {
			if (key === value[0]) { 
				delete fk_normalDay[value[0]][Number(value[1])][value[2]];
				fk_normalDay[value[0]][Number(value[1])][value[2]] = e.target.value; 
			} 
		}); 
		handleChange(fk_normalDay);
	}

	function handleDelete(date, flag) {
		let fk_normalDay = normalDay;
		if(flag === 1) {
			Object.keys(fk_normalDay).forEach(item => {
				if(date === item) {
					delete fk_normalDay[item];
				}
			})
		} else {
			let value = date.split("||");
			Object.keys(fk_normalDay).forEach(item => {
				if(item === value[0]) {
					delete fk_normalDay[item][value[1]];
				}
			})
		}
		handleChange(fk_normalDay);
	}

	//set the state seconds to time
	function PropsTimeToHMS () { 
		let fk_state = JSON.parse(props.data); 
		for(var key in fk_state) {
			// eslint-disable-next-line
			fk_state[key].forEach((element, i)=>{
				fk_state[key][i].open = secondsToHms(element.open);
				fk_state[key][i].close = secondsToHms(element.close);

			})
		}

		setNormalDay(fk_state);
	}

	function handleChange (data) { 
		Object.keys(data).forEach(function(key) {
			var array = [];
			data[key].forEach(element => { 
				element["open"] = 	TimeToSeconds( element["open"] );
				element["close"] = 	TimeToSeconds( element["close"] );
				array.push(element);
			});
			data[key] = array;
		})
		props.normalDay(data);
	}

	//set the state seconds to time
	function TimeToSeconds (time) {
		let val = time.split(":");
		var second = Number(val[0]) * 3600 + Number(val[1]) * 60;
		return second;
	}

	//Change seconds to time
	function secondsToHms(d) {

		var sec_num = Number(d) // don't forget the second param
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);
	
		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		return hours + ':' + minutes;
	}



	return (
		<GridContainer style={{marginBottom: "5px", padding:"5px", borderBottomLeftRadius: "12px"}}>
			<GridItem sm={4}>
				<h5 style={{fontWeight: "bold",fontSize: "20px", paddingTop: "12px"}}>Normal Day:</h5>
			</GridItem>
			<GridItem sm={4}>
				<WeekDay onSelect={handleWeek}/>
			</GridItem>
			<GridItem sm={4}>
				<Button
					variant="contained"
					color="primary"
					onClick={handleClickOpen}
					className={classes.button}
					style={{marginTop:"12px", width: "100%", paddingTop: "12px"}}
					startIcon={<AddIcon />}
				>
					Add Time
				</Button>
			</GridItem>
			<GridContainer style={{border: "1px solid", color: "#a9a9a9", borderRadius: "5px"}}>
				{
					Object.entries(normalDay).map((parent, i)=>{
						return(
							<GridContainer key = {i} style={{marginBottom: "5px", padding:"5px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px"}}>
									<GridItem sm={4}>
										<h5> {parent[0]} </h5>
									</GridItem>
									<GridItem sm={3}></GridItem>
									<GridItem sm={3}></GridItem>
									<GridItem sm={2}>
										<IconButton  onClick={ev => handleDelete(parent[0], 1)} >
											<Icon>delete</Icon>
										</IconButton>
									</GridItem>
									{
										parent[1].map((child, j)=>{
											return(
												<GridContainer key={j}>
													<GridItem sm={4}></GridItem>
													<GridItem sm={3}>
														<TextField
															id={ parent[0] + "||" + j + "||open" }
															label="Start"
															type="time"
															onChange={updateTime}
															value={child["open"]}
															className={classes.textField}
															InputLabelProps={{
																shrink: true,
															}}
														/>
													</GridItem>
													<GridItem sm={3}>
													<TextField
														id={ parent[0] + "||" + j + "||close" }
														label="End"
														type="time"
														value={child["close"]}
														className={classes.textField}
														onChange={updateTime}
														InputLabelProps={{
															shrink: true,
														}}
														inputProps={{
															step: 300, // 5 min
														}}
													/>
												</GridItem>
												<GridItem sm={2}>
													<IconButton  onClick={ev => handleDelete((parent[0] + "||" + j),2)} >
														<Icon>delete</Icon>
													</IconButton>
												</GridItem>
												</GridContainer>
											)
										})
									}
							</GridContainer>
						)
					})
				}


			</GridContainer>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				fullWidth={true}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Add Special Time
				</DialogTitle>
				<DialogContent dividers>
					<GridContainer>
						<GridItem sm={3}>
							<h4 style={{paddingTop: "4px"}}>open:</h4>
						</GridItem>
						<GridItem sm={9}>
							<TextField id="outlined-basic" defaultValue={start} label="" type="time" onChange={handleStart} variant="outlined" style={{width: "100%"}} />
						</GridItem>
						<GridItem sm={3} style={{marginTop: "20px"}}>
							<h4 style={{paddingTop: "4px"}}>close:</h4>
						</GridItem>
						<GridItem sm={9} style={{marginTop: "20px"}}>
							<TextField id="outlined-basic" defaultValue={end} label="" type="time" onChange={handleEnd} variant="outlined" style={{width: "100%"}} />
						</GridItem>
					</GridContainer>
				</DialogContent>
				<DialogActions>
					<Button autoFocus  variant="contained"  onClick={handleAddDay} color="primary">
						Add
					</Button>
					<Button autoFocus  variant="contained"  onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>

			</Dialog>

		</GridContainer>
	);
}