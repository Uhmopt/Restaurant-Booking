/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// material-ui core components
import { makeStyles } from "@material-ui/core/styles";
import MobileStoreButton from 'react-mobile-store-button';
import image from "assets/img/gradient1.jpg";

// @material-ui/icons
import styles from "assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

const useStyles_service = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  image: {
    padding: theme.spacing(2),
    textAlign: "center",
    minHeight: "300px",
    backgroundImage: `url(${image})`,
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
    marginTop: "216px"
  },
  borderDetail3: {
    marginTop: "220px"
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const classes_service = useStyles_service();

  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });

  const iOSUrl = '';

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper style={{background:"linear-gradient(0deg, rgba(4,2,59,1) 0%, rgba(211,148,233,1) 100%)", minHeight: "300px", padding:"15px"}}>
                <h3 style={{color: "white", textAlign: "left"}}>About Us</h3>
                <h4 style={{color: "white", textAlign: "left"}}>At our core, we believe that great hospitality starts with building authentic relationships. Whether that’s you catching up with your favourite people over a .</h4>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper style={{background:"linear-gradient(0deg, rgba(4,2,59,1) 0%, rgba(211,148,233,1) 100%)", minHeight: "300px", padding:"15px"}}>
                <h3 style={{color: "white", textAlign: "left"}}>Legal</h3>
                <h4 style={{color: "white", textAlign: "left"}}>At our core, we believe that great hospitality starts with building authentic relationships. Whether that’s you catching up with guests.</h4>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper style={{background:"linear-gradient(0deg, rgba(4,2,59,1) 0%, rgba(211,148,233,1) 100%)", minHeight: "300px", padding:"15px"}}>
                <h3 style={{color: "white", textAlign: "left"}}>Help</h3>
                <h4 style={{color: "white", textAlign: "left"}}>Whether that’s you catching up with your favourite people over a great meal at Earls or the connections made </h4>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper style={{background:"linear-gradient(0deg, rgba(4,2,59,1) 0%, rgba(211,148,233,1) 100%)", minHeight: "300px", padding:"15px"}}>
                <h3 style={{color: "white", textAlign: "left"}}>App</h3>
                <MobileStoreButton
                  store="ios"
                  url={iOSUrl}
                  style={{height: "50px", marginLeft: "30px"}}
                  linkProps={{ title: 'iOS Store Button' }}
                />
                <MobileStoreButton
                  store="android"
                  url={iOSUrl}
                  style={{height: "75px", marginLeft: "18px"}}
                  linkProps={{ title: 'Android Store Button' }}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
