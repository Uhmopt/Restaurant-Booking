import React from 'react';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Component1 from './ClickCollect/ClickComponent'
import Component3 from './Table/TableComponent'
import Component2 from './Reservation/ReservationComponent'
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import { Link } from "react-router-dom";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import BackButton from '@material-ui/core/Button';

const useStyles1 = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  slide: {
    overflowX: "hidden",
    overflowY: "hidden",
  }
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const classes1 = useStyles1();
  const theme = useTheme();
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header
        brand="OnTab"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
        changeColorOnScroll={{
          height: 100,
          color: "white"
        }}
      />
      <GridContainer>

        <GridItem sm={12}>
          <GridContainer style={{ marginTop: "150px" }} className={classes1.container}>
            <GridItem sm={9}>
              <h2 style={{ color: "#4c4c4c" }}>Order & Reservation Management</h2>
            </GridItem>							
            <GridItem sm={3} style={{ marginTop: "31px" }}>
              <Link to="establishment-management">
                <BackButton
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  startIcon={<KeyboardReturnIcon />}
                  style={{ width: "100%"}}>
                  Back
                </BackButton>
              </Link>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem sm={12}>
        <div className={classes1.container} >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"

            >
              <Tab label="Click & Collect" />
              <Tab label="Reservation" />
              <Tab label="Table Order" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            className={classes.slide}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
          >
            <GridItem value={value} index={0} dir={theme.direction} style={{
              padding: "3px", paddingTop: "2px", overflow: "hidden", border: "1px solid #bfbfbf", borderRadius: "6px"
            }}>
              <GridContainer>
                <Component1 />
              </GridContainer>
            </GridItem>
            <GridItem value={value} index={0} dir={theme.direction} style={{ padding: "3px", paddingTop: "2px", overflow: "hidden", border: "1px solid #bfbfbf", borderRadius: "6px" }}>
              <GridContainer>
                <Component2 />
              </GridContainer>
            </GridItem>
            <GridItem value={value} index={0} dir={theme.direction} style={{ padding: "3px", paddingTop: "2px", overflow: "hidden", border: "1px solid #bfbfbf", borderRadius: "6px" }}>
              <GridContainer>
                <Component3 />
              </GridContainer>
            </GridItem>

          </SwipeableViews>
        </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
