import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";

import image1 from "assets/img/slider/image1.jpg";
import image2 from "assets/img/slider/image2.jpg";
import image3 from "assets/img/slider/image6.jpg";

import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };
  return (
    <div className={classes.section}>
      <GridContainer>
        <Card carousel>
          <Carousel {...settings}>
            <div>
              <img src={image1} width="auto" alt="First slide" className="slick-image" />
              <div className="slick-caption">
                <h4>
                </h4>
              </div>
            </div>
          </Carousel>
        </Card>
      </GridContainer>
    </div>
  );
}
