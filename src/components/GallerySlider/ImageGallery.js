import React from 'react';
import Card from "components/Card/Card.js";
import Carousel from "react-slick";

export default function MyGallery(props) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };
  
  return  (
    <div>
      {/* eslint-disable-next-line */}
      {/* <img src={props.url} style={{width: "100%"}} style={{borderRadius: "6px", width: "100%"}} /> */}
            <Card carousel>
              <Carousel {...settings} style={{width: "100%"}}>
                <div>
                  <img src={props.url} alt="Third slide" className="slick-image" style={{maxHeight: "267px"}} />
                  <div className="slick-caption">
                  </div>
                </div>
                <div>
                  <img src={props.url} alt="Third slide" className="slick-image" style={{maxHeight: "267px"}} />
                  <div className="slick-caption">
                  </div>
                </div>
              </Carousel>
            </Card>
    </div>
  )

}