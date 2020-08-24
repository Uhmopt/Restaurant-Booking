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
import { Link, useHistory } from "react-router-dom";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


import image from "assets/img/image4.jpg";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import axios from 'axios';

const useStyles_landing = makeStyles(styles);

export default function LoginPage(props) {
	const history = useHistory();
	const classes_basic = useStyles_landing();
	const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
	const { ...rest } = props;
	const [uname, setName] = useState("");
	const [upassword, setPassword] = useState("");

	const [values, setValues] = React.useState({
		amount: '',
		password: '',
		weight: '',
		weightRange: '',
		showPassword: false,
	  });

	setTimeout(function() {
		setCardAnimation("");
	}, 700);

	function handleName(e) {
		e.preventDefault()
		setName(e.target.value)
	}
	function handlePassword(e) {
		e.preventDefault()
		setPassword(e.target.value)
	}
	function submitLogin(e) {
		// console.log(state);
			var data = JSON.stringify({"username": uname,"password": upassword});
			var config = {
			method: 'post',
			url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/authenticate',
			headers: {
				'Content-Type': 'application/json'
			},
			data : data
			};
			const request = axios(config);
			request
			.then(response => {
				console.log(response.data.username)
				if (response.data.token) {
					localStorage.setItem('authority', response.data.authorities[0].authority);
					localStorage.setItem('access_token', response.data.token);
					localStorage.setItem('username', response.data.username);
					if(response.data.authorities[0].authority=="CUSTOMER"){
						history.push("main-page");
					} else {
						history.push("establishment-management");
					}
				}
			}).catch(function (error) {
				toastr.error('Check you login infomation and insert correctly', 'Login error');
			});
	}

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

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
									<h3>User Login</h3>
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
													style={{width: "100%", marginBottom: "30px"}}
													validators={['required']}
													errorMessages={['this field is required', 'Username is not valid']}
											/>
											</GridItem>
											<GridItem xs={12}>
												<TextValidator
													id="standard-adornment-password"
													value={upassword}
													label="Password"
													fullWidth={true}
													onChange={handlePassword}
													validators={['required']}
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
											
										</GridContainer>
										<CardFooter className={classes_basic.cardFooter}>
											<Button color="info" size="lg" style={{margin:"0"}} type="submit">
												Login
											</Button>
										</CardFooter>
									</ValidatorForm>
								</CardBody>
								<CardFooter className={classes_basic.cardFooter}>
									<Link to="/forgot-password">
										<Button simple color="info" style={{margin:"0", padding: "0", paddingBottom: "10px"}}>
											Forgot your password?
										</Button>
									</Link>
								</CardFooter>
								<CardFooter className={classes_basic.cardFooter}>
									<Link to="/user-signup">
										<Button simple color="info" style={{margin:"0", paddingTop: "0px", paddingBottom: "20px"}}>
											Don't you have an account? SignUp
										</Button>
									</Link>
								</CardFooter>
							</Card>
						</GridItem>
					</GridContainer>
				</div>
			</div>
		</div>
	);
}
