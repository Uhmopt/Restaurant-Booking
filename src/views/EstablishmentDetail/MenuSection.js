import React from "react";
// nodejs library that concatenates classes
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// sections for this page
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import MenuGallery from "./MenuGallery";
const useStyles = makeStyles(styles);

export default function Components(props) {
  const [section, setSection] = React.useState([]);
  React.useEffect(() => {
    setSection(props.data);
  }, [props.data]);
  function handleCount () {
    props.count()
  }
  return (
    <GridContainer spacing={2} >
      <GridContainer spacing={2}>
        <GridItem sm={2}></GridItem> 
        <GridItem sm={8} style={{
          fontWeight: "500",
          fontSize: "24px",
          textAlignLast: "center",
          borderBottom: "3px solid #337ab7",
          marginBottom: "12px"
        }}>
          {section.section_title}
        </GridItem>
        <GridItem sm={2}></GridItem> 
        <GridItem sm={12} style={{
          fontWeight: "400",
          wordBreak: "break-all",
          marginLeft: "12px",
          marginRight: "12px",
          marginBottom: "12px"
          }}>
          {section.section_desc}
        </GridItem>
      </GridContainer>
      <GridContainer  style={{ overflow: "hidden" }}> 
        {
          section.section_contents!==undefined?
          section.section_contents.map((element, i)=>{
            return (
              <GridItem md={12} sm={12} key={i}>
                <MenuGallery data={ element } count={handleCount}/>
              </GridItem>
            )
            
          }):''
        }
      </GridContainer>
    </GridContainer>
  );
}
