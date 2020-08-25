import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { Link } from "react-router-dom";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { TextField, Button, Dialog, DialogActions, DialogContent, Icon, Typography, Toolbar, AppBar } from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	}
});

export default function SimpleTable() {

	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [flag, setFlag] = React.useState(false);  // this is the insert or edit
	const [tablelist, setList] = React.useState([]);
	// form data
	const [password, setPassword] = React.useState("")
	const [repassword, setRepassword] = React.useState("")
	const [email, setEmail] = React.useState("")
	const [firstname, setFirstname] = React.useState("")
	const [surname, setSurname] = React.useState("")
	const [username, setUsername] = React.useState("")
	const [phone, setPhone] = React.useState("")
	const [role, setRole] = React.useState("STAFF")


	React.useEffect(() => {
		initGetStaffList()
	},
	// eslint-disable-next-line
	[]);

	function initGetStaffList() {

		var config = {
			method: 'get',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/staffList/getByEstablishmentID/${localStorage.getItem("establishmentId")}`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("access_token")}`,
				'Content-Type': 'application/json'
			},
		}
		axios(config)
			.then(function (response) {
				console.log(response.data);
				fn_configData(response.data)
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	function fn_configData(employees) {
		var list = [];
		employees.employees.forEach(element => {
			list.push({
				id: element.id,
				name: element.firstName,
				surname: element.surname,
				email: element.email,
				username: element.username,
				phone: element.phone,
				role: element.roles.toString(),
				state: element.enabled
			})
		});
		setList(list);
	}

	const submitRegister = () => {
		setOpen(false);
		if (firstname === "" || surname === "" || email === "" || username === "" || phone === "") {
			toastr.warning('Plese input correctly', 'Notification.');
			return;
		}
		if (password !== repassword) {
			toastr.warning('Plese input correctly', 'Password is not matched.');
			return;
		}
		var data = {
			"firstName": firstname,
			"surname": surname,
			"phone": phone,
			"email": email,
			"username": username,
			"password": password,
			"roles": [
				role
			]
		};

		if (!flag) {
			var config = {
				method: 'put',
				url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/staffList/addStaffUser/${localStorage.getItem("establishmentId")}`,
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("access_token")}`,
					'Content-Type': 'application/json'
				},
				data: data
			};

			axios(config)
				.then(function (response) {
					initGetStaffList();
				})
				.catch(function (error) {
				});
		}

		
	}

	const handleInsert = (e) => {
		setEmail("")
		setFirstname("")
		setSurname("")
		setUsername("")
		setPhone("")
		setRole("STAFF")
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	};

	const handleCheck = (name) => {
		var token = localStorage.getItem("access_token");
		var config = {
			method: 'put',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/staffList/disableStaffUser/${localStorage.getItem("establishmentId")}?username=${name}`,
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
				initGetStaffList();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const handleClick = (i) => {
		setEmail(tablelist[i].email)
		setFirstname(tablelist[i].name)
		setSurname(tablelist[i].surname)
		setUsername(tablelist[i].username)
		setPhone(tablelist[i].phone)
		setRole(tablelist[i].role)
		setFlag(true);
		setOpen(true);
	}

	return (
		<div style={{ padding: "120px", background: "#fff", height: "fully" }}>
			<Header
				absolute
				color="dark"
				brand="OnTab"
				rightLinks={<HeaderLinks />}
			/>
			<div style={{ paddingTop: "100px" }}>
				<div >
					<GridContainer >
						<GridContainer>
							<GridItem md={7} xs={12}>
								<h2 style={{ color: "#757575" }}>Staff Management</h2>
							</GridItem>
							<GridItem md={3} xs={12}>
								<Button
									variant="outlined"
									color="primary"
									className={classes.button}
									onClick={handleInsert}
									startIcon={<AddIcon />}
									style={{ width: "100%", marginTop: "24px" }}>
									New Staff
							</Button>
							</GridItem>
							<GridItem sm={2} style={{ marginTop: "24px" }}>
								<Link to="establishment-management">
									<Button
									variant="outlined"
									color="primary"
									className={classes.button}
									startIcon={<KeyboardReturnIcon />}
									style={{ width: "100%"}}>
									Back
									</Button>
								</Link>
							</GridItem>
						</GridContainer>
						<GridItem xs={12} style={{ minWidth: "560px" }}>
							<TableContainer component={Paper}>
								<Table className={classes.table} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>First Name</TableCell>
											<TableCell align="center">SurName</TableCell>
											<TableCell align="center">Email</TableCell>
											<TableCell align="center">UserName</TableCell>
											<TableCell align="center">Phone</TableCell>
											<TableCell align="center">Role</TableCell>
											<TableCell align="right">State</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{tablelist.map((row, i) => (
											<TableRow key={i} onClick={()=>handleClick(i)}>
												<TableCell component="th" scope="row">
													{row.name}
												</TableCell>
												<TableCell align="center">{row.surname}</TableCell>
												<TableCell align="center">{row.email}</TableCell>
												<TableCell align="center">{row.username}</TableCell>
												<TableCell align="center">{row.phone}</TableCell>
												<TableCell align="center">{row.role}</TableCell>
												<TableCell align="right">
													<Checkbox
														checked={row.state}
														color="primary"
														inputProps={{ 'aria-label': 'secondary checkbox' }}
														onChange={(e) => handleCheck(row.username)}
													/>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</GridItem>
					</GridContainer>
					<Dialog
						classes={{
							paper: "m-24"
						}}
						// onClose={this.closeComposeDialog}
						fullWidth
						maxWidth="xs"
						open={open}
					>

						<AppBar position="static" elevation={1}>
							<Toolbar className="flex w-full">
								<Typography variant="subtitle1" color="inherit">
									{flag?"Edit Staff":"New Staff"}
						</Typography>
							</Toolbar>
						</AppBar>

						<DialogContent classes={{ root: "p-24" }}>
							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">account_circle</Icon>
								</div>

								<TextField
									className="mb-24"
									label="First Name"
									autoFocus
									name="name"
									value={firstname}
									onChange={(e) => setFirstname(e.target.value)}
									variant="outlined"
									required
									fullWidth
								/>
							</div>

							<div className="flex" style={{ marginTop: "16px" }}>
								<div className="min-w-48 pt-20">
								</div>
								<TextField
									className="mb-24"
									label="Surname"
									name="surname"
									value={surname}
									onChange={(e) => setSurname(e.target.value)}
									variant="outlined"
									fullWidth
								/>
							</div>

							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">star</Icon>
								</div>
								<TextField
									className="mb-24"
									label="Username"
									name="username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									variant="outlined"
									fullWidth
								/>
							</div>

							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">phone</Icon>
								</div>
								<TextField
									className="mb-24"
									label="Phone"
									id="phone"
									name="phone"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									variant="outlined"
									fullWidth
								/>
							</div>

							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">email</Icon>
								</div>
								<TextField
									className="mb-24"
									label="Email"
									id="email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									variant="outlined"
									fullWidth
								/>
							</div>

							<div>
								<div className="flex">
									<div className="min-w-48 pt-20">
										<Icon color="action">lock</Icon>
									</div>
									<TextField
										className="mb-24"
										label="Password"
										id="password"
										type="password"
										name="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										variant="outlined"
										fullWidth
									/>
								</div>

								<div className="flex" style={{ marginTop: "16px" }}>
									<TextField
										className="mb-24"
										label="RepeatPassword"
										id="rePassword"
										type="password"
										name="repassword"
										value={repassword}
										onChange={(e) => setRepassword(e.target.value)}
										variant="outlined"
										fullWidth
									/>
								</div>
							</div>
							
							<div className="flex" style={{ marginTop: "16px" }}>
								<div className="min-w-48 pt-20">
									<Icon color="action">account_circle</Icon>
								</div>
								<FormControl style={{ width: "100%" }}>
								<InputLabel id="demo-simple-select-label">Role</InputLabel>
									<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={role}
									fullWidth={true}
									onChange={(e)=>setRole(e.target.value)}
									>
										<MenuItem value="MANAGER">MANAGER</MenuItem>
										<MenuItem value="STAFF">STAFF</MenuItem>
									</Select>
								</FormControl>
							</div>
						</DialogContent>

						<DialogActions className="justify-between pl-16">
							<Button
								variant="contained"
								color="primary"
								onClick={submitRegister}
							>
								Add
						</Button>
							<Button
								variant="contained"
								color="primary"
								onClick={handleClose}
							>
								Cancel
						</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
		</div>
	);
}
