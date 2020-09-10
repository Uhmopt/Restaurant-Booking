import React from "react";
// nodejs library that concatenates classes
// @material-ui/core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import MenuSection from "./MenuSection";

// accordion
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';


export default function Components(props) {
  const [menu, setMenu] = React.useState([]);
  React.useEffect(() => {
    setMenu(props.data);
  },
    // eslint-disable-next-line
    []);
  function handleCount() {
    props.count()
  }
  return (
    <GridContainer spacing={2} style={{ marginBottom: "12px" }}>
      <GridItem sm={12}>
        <h5 style={{ fontWeight: "400", float: "left" }}>{menu.desc}</h5>
      </GridItem>
      <Accordion style={{ width: "100%" }}>
        {
          menu.sections !== undefined ?
            menu.sections.map((element, i) => {
              return (
                <AccordionItem key={i} style={{ textAlign: "-webkit-center" }}>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <div className="menu-section-header" style={{ borderRadius: "30px", width: "95%", height: "54px" }}>
                        <h4>{element.section_title}</h4>
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className="menu-section-body" style={{ border: "1px solid white", marginTop: "10px", marginBottom: "10px" }}>
                    <GridContainer>
                      <GridItem sm={12} key={i}>
                        <MenuSection data={element} title={props.title} key={i} count={handleCount} />
                      </GridItem>
                    </GridContainer>
                  </AccordionItemPanel>
                </AccordionItem>
              )
            })
            : ""
        }
      </Accordion>
    </GridContainer>
  );
}




