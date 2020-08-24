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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useHistory } from "react-router-dom";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/image4.jpg";

import axios from 'axios';

const useStyles_landing = makeStyles(styles);

export default function LoginPage(props) {
	const history = useHistory();
	const classes_basic = useStyles_landing();
	const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
	const [upassword, setPassword] = useState("");
	const [repassword, setRepassword] = useState("");
	const upasswordRef = React.useRef(null)
	const { ...rest } = props;
	const [passCode, setPass] = useState("");
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
		
	setTimeout(function () {
		setCardAnimation("");
	}, 700);
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

	function handleName(e) {
		e.preventDefault()
		setPass(e.target.value)
	}

	function submitLogin(e) {

		var data = {
			"token": passCode,
			"password": upassword
		};

		var config = {
			method: 'put',
			url: ' https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/user/reset-password',
			headers: {},
			data: data
		};

		axios(config)
			.then(function (response) {
				history.push("user-login")
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function handlePassword(e) {
    e.preventDefault()
		setPassword(e.target.value)
	}

	function handleValidationRule() {
		ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
			if (value !== document.getElementById('standard-adornment-password').value) {
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
									<h3>Account Confirm</h3>
								</CardHeader>
								<CardBody style={{ paddingBottom: "0" }}>
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
													style={{ width: "100%", marginBottom: "30px" }}
													validators={['required']}
													errorMessages={['this field is required', 'Username is not valid']}
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
														ref={upasswordRef}
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
										</GridContainer>
										<CardFooter className={classes_basic.cardFooter}>
											<Button color="info" size="lg" style={{ margin: "0" }} type="submit">
												Reset password
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
