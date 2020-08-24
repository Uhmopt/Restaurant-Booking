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
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionNavbars from "../MainPage/Sections/SectionNavbars.js";
import SectionExamples from "../Components/Sections/SectionExamples.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

import image1 from "assets/img/service1.png";
import image2 from "assets/img/service2.jpg";
import image3 from "assets/img/service3.png";

const useStyles = makeStyles(styles);
export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div style={{background: "#fff"}}>
      <Header
        brand="OnTabs"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
        changeColorOnScroll={{
          height: 100,
          color: "white"
        }}
        {...rest}
      />
      <div className={classes.container} style={{marginTop: "100px"}}>
        <SectionExamples />
        <GridContainer>
            <GridItem xs={12}>
              <h2 style={{color: "black", textAlign: "center"}}>About Our Services</h2>
            </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={8}>
            <h4 style={{color: "black", paddingTop: "27px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronicLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</h4>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <GridItem xs={12}>
              <h3 style={{color: "black", textAlign: "center",marginTop: "-10px"}}>Table Order</h3>
            </GridItem>
            
              <img
                src={image1}
                height={"300px"}
                alt="..."
                className={classes.imgRounded + " " + classes.imgFluid}
              />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4}>
            <GridItem xs={12}>
              <h3 style={{color: "black", textAlign: "center",marginTop: "-10px"}}>Click & Collect</h3>
            </GridItem>
            
              <img
                src={image2}
                height={"300px"}
                alt="..."
                className={classes.imgRounded + " " + classes.imgFluid}
              />
          </GridItem>
          <GridItem xs={12} sm={6} md={8}>
            <h4 style={{color: "black", paddingTop: "27px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronicLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</h4>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={6} md={8}>
            <h4 style={{color: "black", paddingTop: "27px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronicLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic</h4>
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <GridItem xs={12}>
              <h3 style={{color: "black", textAlign: "center",marginTop: "-10px"}}>Reserve a Table</h3>
            </GridItem>
            
              <img
                src={image3}
                height={"200px"}
                alt="..."
                className={classes.imgRounded + " " + classes.imgFluid}
              />
          </GridItem>
        </GridContainer>
      </div>
      <SectionNavbars />
      <Footer />
    </div>
  );
}
