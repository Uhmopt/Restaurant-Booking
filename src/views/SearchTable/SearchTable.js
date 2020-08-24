import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionTabs from "../SearchTable/SectionTabs.js";
import RestaurantList from "../SearchTable/RestaurantList.js";
import CategoryFilter from "components/CategoryFilter/CategoryFilter.js";
import BackgroundSlider from 'react-background-slider'
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import styles_nav from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import styles_com from "assets/jss/material-kit-react/views/components.js";
import image1 from "assets/img/image1.jpg";
import image2 from "assets/img/image2.jpg";
import image3 from "assets/img/image3.jpg";
import image4 from "assets/img/image4.jpg";
import image5 from "assets/img/image5.jpg";

const useStyles_com = makeStyles(styles_com);
const useStyles_nav = makeStyles(styles_nav);

export default function Components(props) {
	const classes_com = useStyles_com();
	const classes_nav = useStyles_nav();
	const [restaurantList, setRestaurant] = React.useState(null);
	const [cuisines, setCuisines] = React.useState([]);
	const { ...rest } = props;

	React.useEffect(() => {
		initGetEstablishments();
	}, []);

	function initGetEstablishments () {
		setRestaurant(JSON.parse(localStorage.getItem('bookList')));
		console.log(JSON.parse(localStorage.getItem('bookList')))
	}

	function handleFilter (e) {
		setCuisines(e.fk_cuisines);
		filterData(e.fk_cuisines, e.fk_diets)
	}

	function filterData (cuisines, diets) {

		let fk_restaurantList = JSON.parse(localStorage.getItem('bookList'))
		console.log(fk_restaurantList)
		let fk_cuisines = cuisines.filter( function (element) {
			return element.value == true;
		});

		let fk_diets = diets.filter( function (element) {
			return element.value == true;
		});

		console.log(fk_cuisines, fk_diets)

		if( fk_cuisines.length != 0 || fk_diets.length != 0 ){
			fk_restaurantList = fk_restaurantList.filter( function (parent) {
				var flag = false;
				if (parent[1].cuisines) {
					parent[1].cuisines.forEach((child)=> {
						fk_cuisines.forEach((cuisine) => {
							if( cuisine.name==child ){
								flag = true;
							}
						})
					})
				}
				if (parent[1].diets) {
					parent[1].diets.forEach((child)=> {
						fk_diets.forEach((diet) => {
							if( diet.name==child ){
								flag = true;
							}
						})
					})
				}
				return flag;
			})
		}
		setRestaurant( fk_restaurantList );
	}

	return (
		<div style={{background: "#fff"}}>
			<Header
				brand="OnTab"
				rightLinks={<HeaderLinks/>}
				fixed
				color="dark"
				changeColorOnScroll={{
					height: 100,
					color: "white"
				}}
				{...rest}
			/>
			<div id="navbar" className={classes_nav.navbar}>
				<BackgroundSlider
					images={[image1, image2, image3, image4, image5]}
					duration={10} transition={2}/>
					<SectionTabs/>
			</div>
			<div className={classes_com.container}>
				<GridContainer>
					<GridItem md={2}>
						<CategoryFilter onSelect={ handleFilter } />
					</GridItem>

					<GridItem md={10}>
						<GridContainer spacing={3} style={{marginTop: "40px"}} >
							{
								cuisines.map((element, i) => {
									if (element.value==true) {
										return(<Button
											variant="contained"
											color="default"
											size="small"
											style={{textTransform: "capitalize", margin: "10px"}}
											key={i}
										> {element.name}
										</Button>)
									}
								})
							}
						</GridContainer>
						<div className={classes_com.container} style={{marginTop: "30px"}}>
							{
								restaurantList?
								restaurantList.map((element, i) => {
									return ( <RestaurantList data={element} key={i}/> )
								}) : ""
							}
						</div>
					</GridItem>
				</GridContainer>
			</div>
			<Footer />
		</div>
	);
}
