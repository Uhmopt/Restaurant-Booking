import React from "react";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionNavbars from "./Sections/SectionNavbars.js";
import SectionTabs from "./Sections/SectionTabs.js";
import SectionExamples from "./Sections/SectionExamples.js";

import BackgroundSlider from 'react-background-slider'
import image1 from "assets/img/image1.jpg";
import image2 from "assets/img/image2.jpg";
import image3 from "assets/img/image3.jpg";
import image4 from "assets/img/image4.jpg";
import image5 from "assets/img/image5.jpg";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
const useStyles = makeStyles(styles);

export default function Components(props) {
	const classes = useStyles();
	const { ...rest } = props;
	return (
		<div style={{background:"linear-gradient(0deg, #673AB7 0%, rgb(255, 255, 255) 54%, rgb(255, 255, 255) 100%)"}}>
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
			<Parallax filter>
				<BackgroundSlider
					images={[image2, image1, image3, image5, image4]}
					duration={10} transition={1}/>
				<div className={classes.container}>
					<GridContainer>
						<GridItem>
							<div className={classes.brand}>
								<SectionTabs/>
							</div>
						</GridItem>
					</GridContainer>
				</div>
			</Parallax>

			<div className={classes.container}>
				<SectionExamples/>
			</div>
			<SectionNavbars />
			<Footer />
		</div>
	);
}
