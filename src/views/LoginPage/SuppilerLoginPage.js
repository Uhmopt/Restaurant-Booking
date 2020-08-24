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

import image from "assets/img/bg7.jpg";
import axios from "axios";

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
	const [upassword, setPassword] = useState("");

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
			url: 'https://ontab.co.uk/v1/authenticate',
			headers: {
				'Content-Type': 'application/json'
			},
			data : data
			};
			const request = axios(config);
			request
			.then(response => {
				console.log(response.data)
				if (response.data.token) {
					localStorage.setItem('access_token', response.data.token);
					localStorage.setItem('username', response.data.username);
					history.push("main-page")
				} else {
					localStorage.removeItem('access_token');
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
								<CardHeader color="primary" className={classes_basic.cardHeader}>
									<h3>Suppiler Login</h3>
								</CardHeader>
								<CardBody style={{paddingBottom: "0"}}>
									<ValidatorForm
											onSubmit={submitLogin}
											onError={errors => console.log(errors)}
									>
										<GridContainer>
											<GridItem xs={12}>
												<TextValidator
													label="Suppilername"
													onChange={handleName}
													name="uname"
													value={uname}
													style={{width: "100%", marginBottom: "30px"}}
													errorMessages={['this field is required', 'Username is not valid']}
											/>
											</GridItem>
											<GridItem xs={12}>
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
										</GridContainer>
										<CardFooter className={classes_basic.cardFooter}>
											<Button color="primary" size="lg" style={{margin:"0"}} type="submit">
												Get started
											</Button>
										</CardFooter>
									</ValidatorForm>
								</CardBody>
								<CardFooter className={classes_basic.cardFooter}>
									<Link to="/forgot-password">
										<Button simple color="primary" style={{margin:"0", padding: "0", paddingBottom: "10px"}}>
											Forgot your password?
										</Button>
									</Link>
								</CardFooter>
								<CardFooter className={classes_basic.cardFooter}>
									<Link to="/suppiler-signup">
										<Button simple color="primary" style={{margin:"0", paddingTop: "0px", paddingBottom: "20px"}}>
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
