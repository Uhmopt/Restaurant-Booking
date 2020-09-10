import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import SelectBox from "../MainPage/Sections/SelectBox";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16),
		},
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	// eslint-disable-next-line
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	}
}));

export default function SimpleCard() {

	const classes = useStyles();
	const [click, setClick] = React.useState("");
	const [distance, setDistance] = React.useState("");

	React.useEffect(() => {
		setClick(localStorage.getItem("lsClickSearch"));
		setDistance(localStorage.getItem("lsClickDistance"));
		setTimeout(() => {
			console.log( click, distance );
		}, 600);

	},
	// eslint-disable-next-line
	[]);

	function handleSearch () {
		const headers = {
			'Content-Type': 'application/json',
		};
		axios.get(`https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/establishment/getByLocationPostcode?postcode=${click}&distance=${distance}`, { headers })
			.then(res => {
					localStorage.setItem('restaurantList', JSON.stringify(res.data));
					localStorage.setItem('lsClickSearch', click);
					localStorage.setItem('lsClickDistance', distance);
					window.location.reload(true);
			}).catch(function (error) {
				toastr.error('Check you postcode and distance', error);
			});
	}
	return (
				<GridContainer justify="center">
					<GridItem md={8} sm={12}>
						<Card className={classes.root} style={{paddingTop: "220px",paddingBottom: "100px",boxShadow:" 0 0 0", background:"transparent"}}>

							<h2 style={{color: "white"}}>Click and Collect Results</h2>
							<CardContent style={{background: "#fff", margin:"10px 5px 10px", borderRadius: "6px", paddingTop: "0px"}}>
								<GridContainer>
									<GridItem sm={12} md={4}>
										<TextField
										id="standard-basic"
										multiline
										label="Search..."
										value={click}
										fullWidth
										onChange={(e)=>setClick(e.target.value)}
										style={{width: "100%",marginTop: "16px"}}
										/>
									</GridItem>
									<GridItem sm={12} md={4} style={{ marginTop: "8px"}}>
										<SelectBox value={distance} onClick={(e)=>setDistance(e)} width="100%" />
									</GridItem>
									<GridItem sm={12} md={4}>
										<Button
											variant="contained"
											color="secondary"
											size="medium"
											fullWidth
											style={{marginTop: "30px", width: "100%"}}
											className={classes.button}
											startIcon={<SearchIcon />}
											onClick={handleSearch}
										>
											Search
										</Button>
									</GridItem>
								</GridContainer>
							</CardContent>
						</Card>
					</GridItem>
				</GridContainer>
	);
}
