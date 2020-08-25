import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Switch from '@material-ui/core/Switch';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
}));

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

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

export default function CustomizedDialogs(props) {

	const [state, setState] = React.useState({
			"item_title": "",
			"item_desc": "",
			"item_price": 0,
			"number_of_kcal": 0,	
			"gluten_free": false,
			"vegetarian": false,
			"locally_sourced": false,
			"organic": false,
			"available": true
		});

	const handleChange = (e) => {
		if (e.target.name === "item_price" || e.target.name === "number_of_kcal") {
			if (e.target.value < 0) {
				let fk_state = {...state};
				fk_state[e.target.name] = 0;
				setState(fk_state);
			} else {
					let fk_state = {...state};
					fk_state[e.target.name] = e.target.value;
					setState(fk_state);
			}
		} else {
			let fk_state = {...state};
			fk_state[e.target.name] = e.target.value;
			setState(fk_state);
		}

	};
	const handleCheck = (e) => {
		let fk_state = {...state};
		fk_state[e.target.name] = e.target.checked;
		setState(fk_state);
	};
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	function handleSave () {
		let number = props.no;
		props.onChange({state, number})
		handleClose();
	};

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				onClick={handleClickOpen}
				className={classes.button}
				style={{marginTop:"3px", width: "100%"}}
				startIcon={<AddIcon />}
			>
				Add Item
			</Button>
			<Dialog aria-labelledby="customized-dialog-title" open={open} fullWidth={true} maxWidth = {'md'}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Section Item Create
				</DialogTitle>
				<DialogContent dividers>
					<GridContainer>
						<GridItem md={12}>
							<GridContainer>
								<GridContainer style={{marginTop: "30px"}}>
									<GridItem sm={2}>
										<h5 style={{fontWeight: "bold", fontSize: "16px"}}>Title:</h5>
									</GridItem>
									<GridItem sm={10}>
										<TextField id="outlined-basic" multiline label="Title" variant="outlined" style={{width: "100%"}} name="item_title" onChange={handleChange}/>
									</GridItem>
								</GridContainer>
								<GridContainer style={{marginTop: "30px"}}>
									<GridItem sm={2}>
										<h5 style={{fontWeight: "bold", fontSize: "16px"}}>Description:</h5>
									</GridItem>
									<GridItem sm={10}>
										<TextField multiline id="outlined-basic" label="Description" variant="outlined" name="item_desc" style={{width: "100%"}} onChange={handleChange}/>
									</GridItem>
								</GridContainer>
							</GridContainer>
						</GridItem>
					</GridContainer>
					<GridContainer>
						<GridItem sm={4}>
							<GridContainer style={{marginTop: "30px"}}>
									<GridItem sm={4}>
										<h5 style={{fontWeight: "bold", fontSize: "16px"}}>Price (£):</h5>
									</GridItem>
									<GridItem sm={8}>
										<TextField
											id="outlined-number"
											label="Price"
											type="number"
											value={state.item_price}
											style={{width: "100%"}}
											InputLabelProps={{
												shrink: true,
											}}
											name="item_price"
											onChange={handleChange}
											variant="outlined"
										/>
									</GridItem>
								</GridContainer>
								<GridContainer style={{marginTop: "10px"}}>
									<GridItem sm={4}>
										<h5 style={{fontWeight: "bold", fontSize: "16px"}}>Number of kcal:</h5>
									</GridItem>
									<GridItem sm={8}>
										<TextField
											id="outlined-number"
											label="kcal"
											type="number"
											value={state.number_of_kcal}
											style={{width: "100%"}}
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
							<GridContainer style={{marginTop: "50px"}}>
								<GridItem sm={6}>
									<GridContainer>
										<GridItem sm={8}>
											<h5 style={{fontSize: "15px",fontWeight: "bold", marginBottom: "0"}}>Gluten Free:</h5>
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
											<h5 style={{fontSize: "15px",fontWeight: "bold", marginBottom: "0"}}>Vegetarian:</h5>
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
									<GridContainer style={{marginTop: "28px"}}>
										<GridItem sm={8}>
											<h5 style={{fontSize: "15px",fontWeight: "bold", marginBottom: "0"}}>Organic:</h5>
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
									<GridContainer style={{marginTop: "28px"}}>
										<GridItem sm={8}>
											<h5 style={{fontSize: "15px",fontWeight: "bold", marginBottom: "0"}}>Locally Sourced:</h5>
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
					<Button autoFocus  variant="contained"  onClick={handleSave} color="primary" style={{textTransform: "capitalize"}}>
						Save Item
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
