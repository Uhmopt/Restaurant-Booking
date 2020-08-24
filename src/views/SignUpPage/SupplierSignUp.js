import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
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
import axios from "axios";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import image from "assets/img/image2.jpg";

const useStyles_landing = makeStyles(styles);

export default function LoginPage(props) {
 
  const classes = useStyles_landing();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const { ...rest } = props;

  const history = useHistory();
  
  const [uname, setName] = useState("");
  const [upassword, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  function handleName(e) {
    e.preventDefault()
    setName(e.target.value)
  }

  function handlePassword(e) {
    e.preventDefault()
    setPassword(e.target.value)
  }
  
  function handleFirstname(e) {
    e.preventDefault()
    setFirstname(e.target.value)
  }

  function handleSurname(e) {
    e.preventDefault()
    setSurname(e.target.value)
  }

  function handleEmail(e) {
    e.preventDefault()
    setEmail(e.target.value)
  }
  function handlePhone(e) {
    e.preventDefault()
    setPhone(e.target.value)
  }  

  function submitRegister(e) {

    var userdata = {
      "firstName": firstname,
      "surname": surname,
      "phone": phone,
      "email": email,
      "username": uname,
      "password": upassword,
      "roles": [
          "SUPPLIER"
      ]
    }
    var config = {
    method: 'post',
    url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/user/register',
    headers: { },
    data : userdata
    };

    const request = axios(config); 
    request
    .then(response => {
      if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          history.push('/account-confirm');
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
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h3>Suppiler SignUp</h3>
                </CardHeader>
                <CardBody style={{paddingBottom: "0"}}>
                  <ValidatorForm
                        onSubmit={submitRegister}
                        onError={errors => console.log(errors)}
                    >
                    <GridContainer>
                      <GridItem md={6} xs={12}>
                        
                        <TextValidator
                          label="Firstname"
                          onChange={handleFirstname}
                          name="firstname"
                          value={firstname}
                          style={{width: "100%", marginBottom: "30px"}}
                          validators={['required']}
                          errorMessages={['this field is required', 'Firstname is not valid']}
                        />
                      </GridItem>
                      <GridItem md={6} xs={12}>
                        
                        <TextValidator
                          label="Surname"
                          onChange={handleSurname}
                          name="surname"
                          value={surname}
                          style={{width: "100%", marginBottom: "30px"}}
                          validators={['required']}
                          errorMessages={['this field is required', 'Surname is not valid']}
                        />
                      </GridItem>
                      <GridItem xs={12}>
                        
                        <TextValidator
                          label="Email"
                          onChange={handleEmail}
                          name="email"
                          value={email}
                          style={{width: "100%", marginBottom: "30px"}}
                          validators={['required', 'isEmail']}
                          errorMessages={['this field is required', 'Email is not valid']}
                        />
                      </GridItem>
                      <GridItem md={6} xs={12}>
                        <TextValidator
                          label="Username"
                          onChange={handleName}
                          name="uname"
                          value={uname}
                          style={{width: "100%", marginBottom: "30px"}}
                          validators={['required']}
                          errorMessages={['this field is required', 'Username is not valid']}
                        />
                      </GridItem>
                      <GridItem md={6} xs={12}>
                        <TextValidator
                          label="Phone"
                          onChange={handlePhone}
                          name="phone"
                          value={phone}
                          style={{width: "100%", marginBottom: "30px"}}
                          validators={['required']}
                          errorMessages={['this field is required', 'Phone is not valid']}
                        />
                      </GridItem>
                      <GridItem md={6} xs={12}>
                        <TextValidator
                            label="Password"
                            onChange={handlePassword}
                            name="upassword"
                            type="password"
                            value={upassword}
                            style={{width: "100%", marginBottom: "40px"}}
                            validators={['required']}
                            errorMessages={['this field is required', 'Password is not valid']}
                        />
                      </GridItem>
                      <GridItem md={6} xs={12}>
                        <Button color="primary" size="lg" style={{margin:"0", width: "100%"}} type="submit">
                          SignUp
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </ValidatorForm>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        {/* <Footer whiteFont /> */}
      </div>
    </div>
  );
}
