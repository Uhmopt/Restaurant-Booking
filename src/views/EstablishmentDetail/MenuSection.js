import React from "react";
// sections for this page
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import MenuGallery from "./MenuGallery";

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
          marginBottom: "12px",
          marginTop: "24px"
        }}>
          {section.section_title}
        </GridItem>
        <GridItem sm={2}></GridItem> 
        <GridItem sm={12} style={{
          fontWeight: "400",
          wordBreak: "break-all",
          marginLeft: "12px",
          marginRight: "12px",
          marginBottom: "12px",
          textAlign: "-webkit-left"
          }}>
          {section.section_desc}
        </GridItem>
      </GridContainer>
      <GridContainer  style={{ overflow: "hidden", marginBottom: "12px" }}> 
        {
          section.section_contents!==undefined?
          section.section_contents.map((element, i)=>{
            return (
              <GridItem md={12} sm={12} key={i}>
                <MenuGallery data={ element } title={ props.title } count={handleCount}/>
              </GridItem>
            )
          }):''
        }
      </GridContainer>
    </GridContainer>
  );
}
