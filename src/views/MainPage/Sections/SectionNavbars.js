import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import image from "assets/img/gradient.jpg";
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const Styles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 1180,
    background: "#00000000"
  },
  h1: {
    color: "#fff",
    marginTop: "40px"
  },
  h1c: {
    color: "#fff",
  },
  h4: {
    color: "#fff",
    paddingBotton: "30px"
  },
  span: {
    color: "#FFB800"
  },
  span1: {
    color: "#FFB800",
    fontSize: "60px"
  },
  span2: {
    color: "#FFB800",
    fontSize: "80px",
    textAlign: "right"
  },
  image: {
    width: 128,
    height: 128,
  }
}));

export default function SectionNavbars() {
  const classes = Styles();
  const classesa = useStyles();
  return (
    <div className={classes.section}>
      <div id="navbar" className={classes.navbar}>
        <div
          className={classes.navigation}
          style={{ backgroundImage: "url(" + image + ")" }}
        >
          <div className={classesa.root}>
            <Paper className={classesa.paper}>
              <Grid container spacing={2}>
                <Grid item lg={10} md={8} sm={7} container>
                  <Grid item container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <h1 className={classesa.h1}>Pricing</h1>
                      <h4 className={classesa.h4}>Free to join</h4>
                      <h4 className={classesa.h4}><span className={classesa.span}>No </span>upfront & <span className={classesa.span}>zero</span> monthly fees</h4>
                      <h4 className={classesa.h4}>Transparent, low transaction fee plans</h4>
                    </Grid>
                  </Grid>
                  <Grid item container direction="column" spacing={2}>
                    <Grid item md={12} xs={12}>
                      <h4 className={classesa.h1c}><span className={classesa.span1}>0.5%</span>If you get 5 others to join</h4>
                    </Grid>
                  </Grid>
                  <Grid item container direction="column" spacing={2}>
                    <Grid item md={12} xs={12}>
                      <h4 className={classesa.h1c}>Thats it. No other costs in anyway</h4>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={2} md={4} sm={5}>
                  <Typography variant="subtitle1" className={classesa.span2}>1%</Typography>
                </Grid>
              </Grid>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
