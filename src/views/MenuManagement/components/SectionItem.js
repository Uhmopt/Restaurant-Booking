import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "components/CustomButtons/Button.js";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Switch from "@material-ui/core/Switch";
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import { DialogTitle } from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import ImageUpload from './MenuImage.js';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';

import styles1 from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import styles2 from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import food1 from "assets/img/food/food1.png";

const useStyles1 = makeStyles(styles1);
const useStyles2 = makeStyles(styles2);

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);



export default function LoginPage(props) {
	const [state, setState] = React.useState({});	
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [openDeleteItem, setOpenDeleteItem] = React.useState(false);

	useEffect(() => {
		console.log(props.data)
		setState(props.data)
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDeleteItemClickOpen = () => {
		setOpenDeleteItem(true);
	};

	const handleDeleteItemClose = () => {
		setOpenDeleteItem(false);
	};

	const handleChange = (e) => {
		if (e.target.name == "item_price" || e.target.name == "number_of_kcal") {
			if (e.target.value < 0) {
				let fk_state = { ...state };
				fk_state[e.target.name] = 0;
				setState(fk_state);
			} else {
				let fk_state = { ...state };
				fk_state[e.target.name] = e.target.value;
				setState(fk_state);
			}
		} else {
			let fk_state = { ...state };
			fk_state[e.target.name] = e.target.value;
			setState(fk_state);
			console.log(state)
		}

	};

	const handleCheck = (e) => {
		let fk_state = { ...state };
		fk_state[e.target.name] = e.target.checked;
		setState(fk_state);
	};

	const handleAvailable = (e) => {
		let fk_state = { ...state };
		fk_state["available"] = !fk_state["available"];
		setState(fk_state);
	};

	function handleSave() {
		let number = props.no;
		props.onChange({ state, number })
		handleClose();
	};

	function handleDelete() {
		let number = props.no;
		props.onDelete({ number })
		handleClose();
	};

	const checkedA = props.data.gluten_free;
	const checkedB = props.data.vegetarian;
	const checkedC = props.data.locally_sourced;
	const checkedD = props.data.organic;
	const classes1 = useStyles1();
	const classes2 = useStyles2();

	return (
		<div>
			<GridContainer>
				<GridItem sm={4} style={{ minHeight: "250px", paddingLeft: "50px", paddingTop: "20px" }}>
					<img
						src={food1}
						alt="..."
						style={{ height: "150px" }}
						className={classes1.imgRounded + " " + classes1.imgFluid}
					/>
				</GridItem>
				<GridItem sm={8}>
					<GridContainer>
						<GridItem sm={2}>
							<h5 style={{ fontWeight: "bold" }}>Item Title:</h5>
						</GridItem>
						<GridItem sm={5}>
							<h5 style={{ wordBreak: "break-all" }}>{props.data.item_title}</h5>
						</GridItem>
						<GridItem sm={5}>
							{
								state.available ?
									<IconButton className={classes.margin} style={{ color: "#3f51b5" }} name="available" onClick={handleAvailable}>
										<CheckCircleOutlineIcon fontSize="small" />
									</IconButton> :
									<IconButton className={classes.margin} name="available" onClick={handleAvailable}>
										<CheckCircleOutlineIcon fontSize="small" />
									</IconButton>
							}

							<IconButton aria-label="delete" onClick={handleClickOpen} className={classes.margin}>
								<EditIcon fontSize="small" />
							</IconButton>
							<IconButton aria-label="delete" onClick={handleDeleteItemClickOpen} className={classes.margin}>
								<DeleteIcon fontSize="small" />
							</IconButton>
						</GridItem>
						<GridItem sm={3}>
							<h5 style={{ fontWeight: "bold" }}>Desription:</h5>
						</GridItem>
						<GridItem sm={9}>
							<h5 style={{ wordBreak: "break-all" }}>{props.data.item_desc}</h5>
						</GridItem>
						<GridItem sm={6}>
							<div>
								<FormControlLabel
									control={
										<Switch
											checked={checkedA}
											value="checkedA"
											classes={{
												switchBase: classes2.switchBase,
												checked: classes2.switchChecked,
												thumb: classes2.switchIcon,
												track: classes2.switchBar
											}}
										/>
									}
									classes={{
										label: classes2.label
									}}
									label="Gluten Free"
								/>
							</div>
						</GridItem>
						<GridItem sm={6}>
							<div>
								<FormControlLabel
									control={
										<Switch
											checked={checkedB}
											value="checkedB"
											classes={{
												switchBase: classes2.switchBase,
												checked: classes2.switchChecked,
												thumb: classes2.switchIcon,
												track: classes2.switchBar
											}}
										/>
									}
									classes={{
										label: classes2.label
									}}
									label="Vegetarian"
								/>
							</div>
						</GridItem>						
						<GridItem sm={6}>
							<div>
								<FormControlLabel
									control={
										<Switch
											checked={checkedD}
											value="checkedD"
											classes={{
												switchBase: classes2.switchBase,
												checked: classes2.switchChecked,
												thumb: classes2.switchIcon,
												track: classes2.switchBar
											}}
										/>
									}
									classes={{
										label: classes2.label
									}}
									label="Organic"
								/>
							</div>
						</GridItem>
						<GridItem sm={6}>
							<div>
								<FormControlLabel
									control={
										<Switch
											checked={checkedC}
											value="checkedC"
											classes={{
												switchBase: classes2.switchBase,
												checked: classes2.switchChecked,
												thumb: classes2.switchIcon,
												track: classes2.switchBar
											}}
										/>
									}
									classes={{
										label: classes2.label
									}}
									label="Locally Sourced"
								/>
							</div>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
			<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true} maxWidth={'md'}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Edit Item
				</DialogTitle>
				<DialogContent dividers>
					<GridContainer>
						<GridItem md={4}>
							<GridContainer>

								{
									props.data.item_title ?
									<ImageUpload data={props.no}/> : ""
								}
							</GridContainer>
						</GridItem>
						<GridItem md={8}>
							<GridContainer>
								<GridContainer style={{ marginTop: "30px" }}>
									<GridItem sm={4}>
										<h5 style={{ fontWeight: "bold", fontSize: "16px" }}>Title:</h5>
									</GridItem>
									<GridItem sm={8}>
										<TextField id="outlined-basic" value={state.item_title} label="Title" variant="outlined" style={{ width: "100%" }} name="item_title" onChange={handleChange} />
									</GridItem>
								</GridContainer>
								<GridContainer style={{ marginTop: "30px" }}>
									<GridItem sm={4}>
										<h5 style={{ fontWeight: "bold", fontSize: "16px" }}>Description:</h5>
									</GridItem>
									<GridItem sm={8}>
										<TextField multiline id="outlined-basic" value={state.item_desc} label="Description" variant="outlined" name="item_desc" style={{ width: "100%" }} onChange={handleChange} />
									</GridItem>
								</GridContainer>
							</GridContainer>
						</GridItem>
					</GridContainer>
					<GridContainer>
						<GridItem sm={4}>
							<GridContainer style={{ marginTop: "30px" }}>
								<GridItem sm={4}>
									<h5 style={{ fontWeight: "bold", fontSize: "16px" }}>Price (£):</h5>
								</GridItem>
								<GridItem sm={8}>
									<TextField
										id="outlined-number"
										label="Price"
										type="number"
										value={state.item_price}
										style={{ width: "100%" }}
										InputLabelProps={{
											shrink: true,
										}}
										name="item_price"
										onChange={handleChange}
										variant="outlined"
									/>
								</GridItem>
							</GridContainer>
							<GridContainer style={{ marginTop: "10px" }}>
								<GridItem sm={4}>
									<h5 style={{ fontWeight: "bold", fontSize: "16px" }}>Number of kcal:</h5>
								</GridItem>
								<GridItem sm={8}>
									<TextField
										id="outlined-number"
										label="kcal"
										type="number"
										value={state.number_of_kcal}
										style={{ width: "100%" }}
										InputLabelProps={{
											shrink: true,
										}}
										name="number_of_kcal"
										onChange={handleChange}
										variant="outlined"
									/>
								</GridItem>
							</GridContainer>
						</GridItem>
						<GridItem sm={8}>
							<GridContainer style={{ marginTop: "50px" }}>
								<GridItem sm={6}>
									<GridContainer>
										<GridItem sm={8}>
											<h5 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "0" }}>Gluten Free:</h5>
										</GridItem>
										<GridItem sm={4}>
											<Switch
												checked={state.gluten_free}
												color="primary"
												onChange={handleCheck}
												name="gluten_free"
												inputProps={{ 'aria-label': 'secondary checkbox' }}
											/>
										</GridItem>
									</GridContainer>
								</GridItem>
								<GridItem sm={6}>
									<GridContainer>
										<GridItem sm={8}>
											<h5 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "0" }}>Vegetarian:</h5>
										</GridItem>
										<GridItem sm={4}>
											<Switch
												checked={state.vegetarian}
												color="primary"
												onChange={handleCheck}
												name="vegetarian"
												inputProps={{ 'aria-label': 'secondary checkbox' }}
											/>
										</GridItem>
									</GridContainer>
								</GridItem>
								<GridItem sm={6}>
									<GridContainer style={{ marginTop: "28px" }}>
										<GridItem sm={8}>
											<h5 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "0" }}>Organic:</h5>
										</GridItem>
										<GridItem sm={4}>
											<Switch
												checked={state.organic}
												color="primary"
												onChange={handleCheck}
												name="organic"
												inputProps={{ 'aria-label': 'secondary checkbox' }}
											/>
										</GridItem>
									</GridContainer>
								</GridItem>
								<GridItem sm={6}>
									<GridContainer style={{ marginTop: "28px" }}>
										<GridItem sm={8}>
											<h5 style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "0" }}>Locally Sourced:</h5>
										</GridItem>
										<GridItem sm={4}>
											<Switch
												checked={state.locally_sourced}
												color="primary"
												onChange={handleCheck}
												name="locally_sourced"
												inputProps={{ 'aria-label': 'secondary checkbox' }}
											/>
										</GridItem>
									</GridContainer>
								</GridItem>
							</GridContainer>
						</GridItem>
					</GridContainer>
				</DialogContent>
				<DialogActions>
					<Button autoFocus variant="contained" onClick={handleSave} color="primary" style={{ textTransform: "capitalize" }}>
						Change Item
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={openDeleteItem}
				onClose={handleDeleteItemClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title" style={{ padding: "20px 20px 0px" }}>{"Are you sure you want to Delete this Item?"}</DialogTitle>
				<DialogActions>
					<Button autoFocus onClick={handleDeleteItemClose} color="success" size="sm" style={{ marginTop: "0px" }}>
						Cancel
					</Button>
					<Button onClick={handleDelete} color="info" size="sm" autoFocus style={{ marginTop: "0px" }}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
