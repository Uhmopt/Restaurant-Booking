import React from 'react';
import image1 from "assets/img/establishment gallery/1.jpg";
 
export default function MyGallery() {
  
  return  (
    <div>
      {/* eslint-disable-next-line */}
      <img src={image1} style={{width: "100%"}} style={{borderRadius: "12px", width: "100%"}} />
    </div>
  )

}