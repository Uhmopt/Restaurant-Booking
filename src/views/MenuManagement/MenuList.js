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
import MenuListComponent from './components/MenuListComponent';
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import AddIcon from '@material-ui/icons/Add';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from 'axios';
const useStyles = makeStyles(styles);

export default function Components(props) {
	const history = useHistory();
	const classes = useStyles();
	const { ...rest } = props;
	const [menuList, setMenuList] = React.useState([]);
	React.useEffect(() => {
		getMenulist()
	}, []);

	function getMenulist() {
		var config = {
			method: 'get',
			url: `https://cors-anywhere.herokuapp.com/http://ontab.co.uk/v1/menu/getByEstablishment/${localStorage.getItem("establishmentId")}`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("access_token")}`,
				'Content-Type': 'application/json'
			},
		};

		axios(config)
			.then(function (response) {
				setMenuList(response.data);

			})
			.catch(function (error) {
				console.log(error);
			});
	}
	function handleNew() {
		localStorage.setItem('menuFlag', true)
		history.push('menu-management')
	}
	function handleDelete() {
		getMenulist();
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
			<div className={classes.container} style={{ paddingTop: "150px" }}>
				<GridContainer spacing={1}>
					<GridItem md={8} xs={12}>
						<h2 style={{ color: "#757575" }}>Menu List</h2>
					</GridItem>
					<GridItem md={3} xs={9}>
						<Button
							variant="outlined"
							color="primary"
							className={classes.button}
							startIcon={<AddIcon />}
							onClick={handleNew}
							style={{ width: "100%", marginTop: "24px" }}>
							New Menu
					</Button>
					</GridItem>
					<GridItem md={1} xs={3}>
						<Link to="establishment-management">
							<Button
								variant="outlined"
								color="primary"
								className={classes.button}
								startIcon={<KeyboardReturnIcon />}
								style={{ width: "100%", marginTop: "24px" }}>
								Back
							</Button>
						</Link>
					</GridItem>
				</GridContainer>
				<GridContainer spacing={4} style={{ marginTop: "1px" }}>

					{menuList.map((element, i) => {
						return (
							<GridItem md={4} key={i}>
								<MenuListComponent key={i} data={element} onDelete={handleDelete} />
							</GridItem>
						)


					})}

				</GridContainer>
			</div>

		</div>
	);
}
