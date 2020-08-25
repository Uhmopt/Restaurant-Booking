import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { ThemeProvider } from "@material-ui/styles";
import MomentUtils from '@date-io/moment';
import { createMuiTheme } from "@material-ui/core";
import orange from "@material-ui/core/colors/orange";
import SelectBox from "./SelectBox";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import toastr from 'toastr'
// toastr
import 'toastr/build/toastr.min.css'
import axios from 'axios';
import {
	MuiPickersUtilsProvider,
	DateTimePicker
} from '@material-ui/pickers';



const defaultMaterialTheme = createMuiTheme({
	palette: {
		primary: orange,
	},
});

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
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function SimpleCard() {
	const classes = useStyles();

	const [bookPcode, setBookPcode] = React.useState("");
	const [bookDistance, setBookDistance] = React.useState("");
	const [bookDate, setBookDate] = React.useState("");
	const [bookCover, setBookCover] = React.useState("");

	React.useEffect(() => {
		setBookPcode(localStorage.getItem("bookPcode"));
		setBookDistance(localStorage.getItem("bookDistance"));
		setBookDate(localStorage.getItem("bookDate"));
		setBookCover(localStorage.getItem("bookCover"));
	}, []);

	function bookSearch() {
		localStorage.setItem("bookPcode", bookPcode);
		localStorage.setItem("bookDistance", bookDistance);
		localStorage.setItem("bookDate", bookDate);
		localStorage.setItem("bookCover", bookCover); 
		var date = new Date(bookDate);
		var seconds = date.getTime() / 1000; 
		var config = {
			method: 'get',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/establishment/getEstablishmentsReservationByLocationPostcode?postcode=${bookPcode}&distance=${Number(bookDistance)}&time=${Math.ceil(seconds)}&covers=${bookCover}`,
			headers: { }
		};
		axios(config)
		.then(function (response) {
			console.log(response.data);
			localStorage.setItem('bookList', JSON.stringify(Object.entries(response.data)));
			window.location.reload(true);
		})
		.catch(function (error) {
			toastr.error("Sorry, we couldn't find any results that matched your search", "Try going to find more restaurants.");
			console.log(error);
		});
	}

	function handleBookPost(e) {
		setBookPcode(e.target.value)
	}

	function handleBookDate(e) {
		setBookDate(e._d)
	}

	function handleBookDistance(e) {
		setBookDistance(e)
	}

	function handleBookCover(e) {
		setBookCover(e.target.value)
	}
	return (
				<GridContainer justify="center">
					<GridItem md={10} sm={12}>
						<Card className={classes.root} style={{paddingTop: "220px",paddingBottom: "100px",boxShadow:" 0 0 0", background:"transparent"}}>

							<h2 style={{color: "white"}}>Search Tables</h2>

							<CardContent style={{background: "#fff", margin:"10px 5px 10px", borderRadius: "6px", paddingTop: "0px"}}>
								<GridContainer>

									<GridItem sm={6} md={3}>
										<TextField
										id="standard-basic"
										multiline
										value={bookPcode}
										onChange={handleBookPost}
										label="Post Code"
										style={{width: "100%",marginTop: "16px"}}
										/>
									</GridItem>

									<GridItem sm={6} md={3}>
											<MuiPickersUtilsProvider utils={MomentUtils}>
												<ThemeProvider theme={defaultMaterialTheme}>
													<DateTimePicker
														variant="inline"
														label="Select Data & Time"
														onChange={handleBookDate}
														value={bookDate}
														style={{marginTop: "17px"}}
														fullWidth
													/>
												</ThemeProvider>
											</MuiPickersUtilsProvider>
									</GridItem>

									<GridItem sm={6} md={2}>
										<SelectBox value={bookDistance} onClick={handleBookDistance}/>
									</GridItem>

									<GridItem sm={6} md={2}>
											<TextField
											id="standard-basic"
											multiline
											value={bookCover}
											onChange={handleBookCover}
											label="People"
											style={{width: "100%",marginTop: "16px"}}
											/>
									</GridItem>

									<GridItem sm={12} md={2}>
											<Button
												variant="contained"
												color="secondary"
												size="medium"
												style={{marginTop: "26px", width: "100%"}}
												className={classes.button}
												startIcon={<SearchIcon />}
												onClick={bookSearch}
												fullWidth
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
