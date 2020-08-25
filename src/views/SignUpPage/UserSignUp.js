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
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import image from "assets/img/bg7.jpg";

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';



import axios from 'axios';

const useStyles_landing = makeStyles(styles);

const useStyles = makeStyles((theme) => ({
	formControl: {
	  width: "100%"
	},
	selectEmpty: {
	  marginTop: theme.spacing(1),
	},
  }));

export default function LoginPage(props) {

  const [role, setRole] = useState("CUSTOMER");
  const history = useHistory();
  const classSelect = useStyles();
  const classes = useStyles_landing();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const { ...rest } = props;
  
  const [uname, setName] = useState("");
  const [upassword, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+44");

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  React.useEffect(() => {
    handleValidationRule();
  }, []);
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
          role
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
          history.push('/account-confirm');
      }
    });

  }

  function handleValidationRule() {
		ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
			if (value !== document.getElementById('standard-adornment-password').value) {
					return false;
			}
			return true;
		});

      ValidatorForm.addValidationRule('phone', (value) => {
        if (value.length < 12) {
            return false;
        }
        return true;
      });

      ValidatorForm.addValidationRule('password', (value) => {
        if (value.length < 8) {
            return false;
        }
        return true;
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
                <CardHeader color="info" className={classes.cardHeader}>
                  <h3>User SignUp</h3>
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
                          validators={['phone', 'required']}
                          errorMessages={['Phone number should be over 11 letters', 'Phone is not valid']}
                        />
                      </GridItem>
                      <GridItem md={12} xs={12}>
                        <TextValidator
                          id="standard-adornment-password"
                          value={upassword}
                          label="Password"
                          fullWidth={true}
                          onChange={handlePassword}
                          validators={['password', 'required']}
                          errorMessages={['Password length should be over 8 letters', 'Password is not valid']}
                          type={values.showPassword ? 'text' : 'password'}
                          style={{width: "100%", marginBottom: "30px"}}
                          InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                      >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                      </IconButton>
                                  </InputAdornment>
                                )
                          }}
                        />
                      </GridItem>

                      <GridItem md={12} xs={12}>
                          <TextValidator
                            id="standard-adornment-password"
                            value={repassword}
                            label="Confirm Password"
                            fullWidth={true}
                            validators={['isPasswordMatch', 'required']}
                            errorMessages={['Password not matched', 'Confirm the password']}
                            style={{width: "100%", marginBottom: "30px"}}
                            onChange={(e)=>setRepassword(e.target.value)}
                            type={values.showPassword ? 'text' : 'password'}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                      </GridItem>
                      <GridItem sm={12}>
												<FormControl className={classSelect.formControl}>
													<InputLabel id="demo-simple-select-label">Role</InputLabel>
													<Select
													style={{ marginBottom: "30px", width: "100%" }}
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													fullWidth={true}
													value={role}
													onChange={(e)=>setRole(e.target.value)}
													>
														<MenuItem value={'MANAGER'}>MANAGER</MenuItem>
														<MenuItem value={'CUSTOMER'}>CUSTOMER</MenuItem>
													</Select>
												</FormControl>
											</GridItem>
                      <GridItem md={12} xs={12} style={{ paddingTop: "16px" }}>
                        <Button color="info" size="lg" style={{margin:"0", width: "100%"}} type="submit">
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
      </div>
    </div>
  );
}
