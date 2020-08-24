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
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { useHistory } from "react-router-dom";
import image from "assets/img/image3.jpg";
import axios from "axios";

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

const useStyles_landing = makeStyles(styles);

export default function LoginPage(props) {
  const history = useHistory();
  const classes_basic = useStyles_landing();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const { ...rest } = props;
  
  const [uname, setName] = useState("");

  function handleName(e) {
    e.preventDefault()
    setName(e.target.value)
  }
  function submitLogin(e) {
    e.preventDefault()
    var config = {
      method: 'get',
      url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/user/forgot-password?username=${uname}`,
      headers: { }
    };
    axios(config)
    .then(function (response) {
      alert(response.data)
      if(response) {
        history.push("password-confirm")
      }
    })
    .catch(function (error) {
      toastr.error('Insert the username correctly', 'Incorrect username');
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
                  <h3>Password Forgot</h3>
                </CardHeader>
                <CardBody style={{paddingBottom: "0"}}>
                  <ValidatorForm
                      onSubmit={submitLogin}
                      onError={errors => console.log(errors)}
                  >
                    <GridContainer>
                      <GridItem xs={12}>
                        <TextValidator
                          label="Username"
                          onChange={handleName}
                          name="uname"
                          value={uname}
                          style={{width: "100%", marginBottom: "60px", marginTop: "20px"}}
                          validators={['required']}
                          errorMessages={['this field is required', 'Username is not valid']}
                      />
                      </GridItem>
                    </GridContainer>
                    <CardFooter className={classes_basic.cardFooter}>
                      <Button color="info" size="lg" style={{margin:"0"}} type="submit">
                        Reset Password
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
