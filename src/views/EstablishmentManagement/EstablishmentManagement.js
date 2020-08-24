import React from "react";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import EstablishmentListComponent from './components/EstablishmentListComponent';
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";

import axios from "axios";
const useStyles = makeStyles(styles);

export default function Components(props) {
	const history = useHistory();
	const [establishment, setEstablishment] = React.useState([]);
	const classes = useStyles();
	const { ...rest } = props;
	const[authority] = React.useState(localStorage.getItem("authority"));

	React.useEffect(() => {
		getEstablishment()
	}, []);

	// Get establishment by user Token
	function getEstablishment() {

		var token = localStorage.getItem("access_token");
		if (!token) {
			history.push("main-page")
		}
		var config = {
			method: 'get',
			url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/establishment/getByToken',
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
		};

		axios(config)
			.then(function (response) {
				console.log(response.data)
				setEstablishment(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});

	}
	function handleInsert() {
		localStorage.setItem('insertEstablishmentFlag', true);
		history.push('establishment-submit')
	}
	function handleDelete() {
		getEstablishment();
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
			<div className={classes.container} style={{ paddingTop: "150px" }} spacing={1}>
				<GridContainer>
					<GridItem md={9} xs={12}>
						<h2 style={{ color: "#757575" }}>Establishment Management</h2>
					</GridItem>
					<GridItem md={3} xs={12}>
						{
							authority=="MANAGER"?
							<Button
								variant="outlined"
								color="primary"
								className={classes.button}
								onClick={handleInsert}
								startIcon={<AddIcon />}
								style={{ width: "100%", marginTop: "24px" }}>
								New Establishment
							</Button>:""
						}
						
					</GridItem>
				</GridContainer>
				<GridContainer spacing={4} style={{ paddingRight: "15px", paddingLeft: "15px" }}>
					{
						typeof establishment != undefined ? establishment.map((element, i) => {
							return (
								<GridItem md={6} key={i} style={{ marginTop: "5px" }}>
									<EstablishmentListComponent data={element} onDelete={handleDelete} />
								</GridItem>
							)
						}) : ""
					}
				</GridContainer>
			</div>

		</div>
	);
}
