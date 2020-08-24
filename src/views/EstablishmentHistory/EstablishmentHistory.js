import React from 'react';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Component1 from './ClickHistoryComponent'
import Component2 from './ReservationHistoryComponent'
import Component3 from './TableHistoryComponent'
import TextField from '@material-ui/core/TextField';
import styles from "assets/jss/material-kit-react/views/landingPage.js";
const useStyles1 = makeStyles(styles);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const classes1 = useStyles1();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [customer, setCustomer] = React.useState("");
  const [startDate, setStartDate] = React.useState("2020-04-04");
  const [endDate, setEndDate] = React.useState((new Date()).toISOString().substr(0, 10));
  const [sendData, setSendData] = React.useState({startDate: "2020-04-04", endDate:(new Date()).toISOString().substr(0, 10), customer: "" });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function handleStart (e) {
    setStartDate(e.target.value);
    setSendData({ startDate, endDate, customer })
  }
  
  function handleEnd (e) {
    setEndDate(e.target.value);
    setSendData({ startDate, endDate, customer })
  }
  
  function handleCustomer (e) {
    setCustomer(e.target.value);
    setSendData({ startDate, endDate, customer })
  }

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
        <GridItem md={12}  style={{paddingTop: "150px"}}><h2 align={"center"}>Order and Reservation History</h2></GridItem>
        <div className={classes1.container} >
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Click & Collect" {...a11yProps(0)} />
              <Tab label="Reservation" {...a11yProps(1)} />
              <Tab label="Table Order" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
            <GridItem sm={12} style={{ paddingTop: "30px" }}>
              <GridContainer style={{ paddingBottom: "12px", borderRadius: "6px" }}>
                  <GridItem sm={4}>
                      <TextField style={{ width: "100%" }} onChange={handleStart} label="Start Date" type="date" value={startDate} id="standard-size-small" size="small" />
                  </GridItem>
                  <GridItem sm={4}>
                      <TextField style={{ width: "100%" }} onChange={handleEnd} label="End Date" type="date" value={endDate} id="standard-size-small" size="small" />
                  </GridItem>
                  <GridItem sm={4}>
                      <TextField style={{ width: "100%" }} onChange={handleCustomer} label="Customer Id" value={customer} id="standard-size-small" size="small" />
                  </GridItem>

              </GridContainer>
            </GridItem>          
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <GridItem value={value} index={0} dir={theme.direction} style={{ padding: "0px", paddingTop: "2px" }}>
              <Component1  data={sendData} />
            </GridItem>
            <GridItem  value={value} index={1} dir={theme.direction} style={{ padding: "0px", paddingTop: "2px" }} >
              <Component2  data={sendData} />
            </GridItem>
            <GridItem  value={value} index={2} dir={theme.direction} style={{ padding: "0px", paddingTop: "2px" }} >
              <Component3  data={sendData} />
            </GridItem>
          </SwipeableViews>
        </div>

      </GridContainer>
         </div>
  );
}
