import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
 
import image1 from "assets/img/establishment gallery/1.jpg";
const images = [
  {
    original: image1,
    thumbnail: image1,
  }
];
 
export default function MyGallery() {
  
  // return <div items={images}/>;
  return  (
    <div>
      <img src={image1} style={{width: "100%"}} style={{borderRadius: "12px", width: "100%"}} />
      {/* <div><ShoppingCartIcon /></div> */}
    </div>
  )

}