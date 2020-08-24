import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import { useHistory } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/image4.jpg";

import axios from 'axios';

const useStyles_landing = makeStyles(styles);

export default function LoginPage(props) {
  const history = useHistory();
  const classes_basic = useStyles_landing();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const { ...rest } = props;
  const [passCode, setPass] = useState("");
  function handleName(e) {
    e.preventDefault()
    setPass(e.target.value)
  }

  function submitLogin(e) {

    var config = {
      method: 'get',
      url: `https://ontab.co.uk/v1/user/account-confirmation?${passCode}`,
      headers: { }
    };

    const request = axios(config); 
    request
    .then(response => {
      if (response.data) {
        localStorage.setItem('access_token', response.data.token);
        history.push("main-page")
      } else {
        // localStorage.removeItem('access_token');
      }
    });
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="OnTab"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes_basic.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes_basic.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes_basic[cardAnimaton]}>
                <CardHeader color="info" className={classes_basic.cardHeader}>
                  <h3>Authentication</h3>
                </CardHeader>
                <CardBody style={{paddingBottom: "0"}}>
                  <ValidatorForm
                      onSubmit={submitLogin}
                      onError={errors => console.log(errors)}
                  >
                    <GridContainer>
                      <GridItem xs={12}>
                        <TextValidator
                          label="PassCode"
                          onChange={handleName}
                          name="passCode"
                          value={passCode}
                          style={{width: "100%", marginBottom: "30px"}}
                          validators={['required']}
                          errorMessages={['this field is required', 'Username is not valid']}
                      />
                      </GridItem>
                     </GridContainer>
                    <CardFooter className={classes_basic.cardFooter}>
                      <Button color="info" size="lg" style={{margin:"0"}} type="submit">
                        Get started
                      </Button>
                    </CardFooter>
                  </ValidatorForm>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
