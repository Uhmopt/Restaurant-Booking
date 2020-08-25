import React from "react";
// nodejs library that concatenates classes
// @material-ui/core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import MenuSection from "./MenuSection";

export default function Components(props) {
  const [menu, setMenu] = React.useState([]);
  React.useEffect(() => {
    setMenu(props.data);
  },
  // eslint-disable-next-line
  []);
  function handleCount () {
    props.count()
  }
  return (
    <GridContainer spacing={2}>
        <GridItem sm={12} >
        <h5 style={{fontWeight: "400"}}>{menu.desc}</h5>
        </GridItem>
        {
          menu.sections!==undefined?
          menu.sections.map((element, i)=>{
            return (
              <GridItem sm={12} key={i}>
                <MenuSection data={ element } key={i} count={handleCount}/>
              </GridItem>
            )
            
          }):''
        }
    </GridContainer>
  );
}
