import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// core components
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import image1 from "assets/img/mg1.jpg";
import image2 from "assets/img/mg2.jpg";
import image3 from "assets/img/mg3.jpg";
import { Link, useHistory } from "react-router-dom";

import toastr from 'toastr'
import 'toastr/build/toastr.min.css' 

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
const useStyles = makeStyles(styles);
const useStyles_service = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image1: {
    padding: theme.spacing(2),
    textAlign: "center",
    minHeight: "360px",
    backgroundImage: `url(${image1})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "sticky",
    color: theme.palette.text.secondary,
  },
  image2: {
    padding: theme.spacing(2),
    textAlign: "center",
    minHeight: "360px",
    backgroundImage: `url(${image2})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "sticky",
    color: theme.palette.text.secondary,
  },
  image3: {
    padding: theme.spacing(2),
    textAlign: "center",
    minHeight: "360px",
    backgroundImage: `url(${image3})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "sticky",
    color: theme.palette.text.secondary,
  },
  borderDetail1: {
    marginTop: "220px"
  },
  borderDetail2: {
    marginTop: "204px"
  },
  borderDetail3: {
    marginTop: "220px"
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function ProductSection() {
  const classes = useStyles();
  const classes_service = useStyles_service();
  const history = useHistory();

  function handleClickCollect() {
    if (localStorage.getItem("lsClickSearch")) {
      history.push( "click-collect" );
    } else {
      toastr.warning('Please fill the PostCode and click search.', 'Notification!');
    }
  }

  function handleReservation() {
    if (localStorage.getItem("bookPcode")) {
      history.push( "search-table" );
    } else {
      toastr.warning('Please fill the each field and click search.', 'Notification!');
    }
  }

  function handleTable() {
    toastr.warning('Not ready!', 'Notification!');
  }

  return (
    <div className={classes.container} style={{ marginTop: "55px" }}>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes_service.image1} onClick={handleTable}>
            <h3 style={{color: "white"}}>Table Order</h3>
            <h4 style={{color: "white"}} className={classes_service.borderDetail1}>Order at your Table</h4>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper className={classes_service.image2} onClick={handleClickCollect}>
            <h3 style={{color: "white"}}>Click & Collect</h3>
            <h4 style={{color: "white"}} className={classes_service.borderDetail2}>Order online and collect with no waiting. Easy, safe and just as tasty !!</h4>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
            <Paper className={classes_service.image3} onClick={handleReservation}>
              <h3 style={{color: "white"}}>Reserve a Table</h3>
              <h4 style={{color: "white"}} className={classes_service.borderDetail3}>Reserve a Table for your Enjoyment.</h4>
            </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
