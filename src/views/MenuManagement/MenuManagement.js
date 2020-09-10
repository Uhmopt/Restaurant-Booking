import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import classNames from "classnames";
// @material-ui/icons
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from "components/CustomButtons/Button.js";
import SectionItem from "./components/SectionItem.js"
import MenuSectionModal from "./components/MenuSectionModal.js"
import MenuSectionContentModal from "./components/MenuSectionContentModal.js"
import styles from "assets/jss/material-kit-react/views/components.js";
import toastr from 'toastr'
import { useHistory } from "react-router-dom"
import 'toastr/build/toastr.min.css'
import { Link } from "react-router-dom";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import BackButton from '@material-ui/core/Button';

// accordion
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';

import axios from 'axios';

const useStyles = makeStyles(styles);

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

export default function LoginPage(props) {

	const history = useHistory();
	const [menus, setMenus] = React.useState({})
	const classes = useStyles();
	const { ...rest } = props;
	const [num, setNum] = useState("");
	const [title, setTitle] = useState("");
	const [openDeleteItem, setOpenDeleteItem] = React.useState(false);
	const [desc, setDesc] = React.useState("");
	const [termsAndConditions, setAndCondition] = React.useState("");
	const [allergyAdvice, setAllergyAdvice] = React.useState("");

	React.useEffect(() => {
		if (!localStorage.getItem('authority')&&localStorage.getItem('authority')!=="MANAGER") {
			history.push("main-page")
		}
		var flag = localStorage.getItem('menuFlag');
		if (flag === "false") {
			let fk_menu = JSON.parse(localStorage.getItem('selectedMenu'));
			setMenus(fk_menu);
			setTitle(fk_menu.title);
			setDesc(fk_menu.desc);
			setAndCondition(fk_menu.termsAndConditions);
			setAllergyAdvice(fk_menu.allergyAdvice);
		} else {
			setMenus({
				"title": "",
				"desc": "",
				"termsAndConditions": "",
				"allergyAdvice": "",
				"establishmentId": JSON.parse(localStorage.getItem('establishment')).id,
				"sections": [],
			})
		}
	},
	// eslint-disable-next-line
	[]);

	const handleDeleteItemClose = () => {
		setOpenDeleteItem(false);
	};

	const handleDeleteItemClickOpen = (e) => {
		console.log(e)
		setNum(e)
		setOpenDeleteItem(true);
	};

	function handleTitle(e) {
		console.log(e.target.value)
		e.preventDefault()
		setTitle(e.target.value)
	}

	function handleDesc(e) {
		console.log(e.target.value)
		e.preventDefault()
		setDesc(e.target.value)
	}

	function handleTermsAndConditions(e) {
		console.log(e.target.value)
		e.preventDefault()
		setAndCondition(e.target.value)
	}

	function handleAllergyAdvice(e) {
		console.log(e.target.value)
		e.preventDefault()
		setAllergyAdvice(e.target.value)
	}

	function handleAddSection(e) {
		const fk_menus = { ...menus };
		fk_menus.sections.push({
			section_title: e.title,
			section_desc: e.desc,
			section_contents: []
		})
		setMenus(fk_menus);
	}

	function deleteSection() { // for the delete the section
		const fk_menus = { ...menus };
		fk_menus.sections.splice(num, 1);
		console.log(fk_menus)
		setMenus(fk_menus);
		handleDeleteItemClose()
	}

	function deleteHandle(e) {  // for the set the delete section number
		setNum(e)
	}

	function handleSecitonContent(e) {
		const fk_menus = { ...menus };
		fk_menus.sections[e.number].section_contents.push(e.state)
		setMenus(fk_menus);
	}

	function updateSectionContent(e) {
		const fk_menus = { ...menus };
		fk_menus.sections[e.number.i].section_contents[e.number.j] = e.state;
		setMenus(fk_menus);
	}

	function deleteSectionContent(e) {
		const fk_menus = { ...menus };
		fk_menus.sections[e.number.i].section_contents.splice(e.number.j, 1);
		setMenus(fk_menus);
	}

	function submitMenu() {

		if (localStorage.getItem('menuFlag') === "false") {
			const fk_menus = { ...menus };
			fk_menus.title = title;
			fk_menus.desc = desc;
			fk_menus.termsAndConditions = termsAndConditions;
			fk_menus.allergyAdvice = allergyAdvice;
			setMenus(fk_menus);
			handleDeleteItemClose()
			var config = {
				method: 'put',
				url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/menu/update',
				headers: {
					"Authorization": `Bearer ${localStorage.getItem('access_token')}`,
					'Content-Type': 'application/json'
				},
				data: {
					"title": title,
					"desc": desc,
					"establishmentId": fk_menus.establishmentId,
					"termsAndConditions": termsAndConditions,
					"allergyAdvice": allergyAdvice,
					"sections": fk_menus.sections,
					"id": JSON.parse(localStorage.getItem("selectedMenu")).id
				}
			};
			axios(config)
				.then(function (response) {
					history.push("menu-list")
				})
				.catch(function (error) {
					toastr.error('Check you menue infomation and insert correctly', error);
				});
		} else {

			const fk_menus = { ...menus };

			fk_menus.title = title;
			fk_menus.desc = desc;
			fk_menus.termsAndConditions = termsAndConditions;
			fk_menus.allergyAdvice = allergyAdvice;
			setMenus(fk_menus);
			handleDeleteItemClose()
			const data = {
				"title": title,
				"desc": desc,
				"establishmentId": fk_menus.establishmentId,
				"termsAndConditions": termsAndConditions,
				"allergyAdvice": allergyAdvice,
				"sections": fk_menus.sections
			}
			// eslint-disable-next-line
			var config = {
				method: 'post',
				url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/menu/create',

				headers: {
					"Authorization": `Bearer ${localStorage.getItem('access_token')}`,
					'Content-Type': 'application/json'
				},
				data: data
			};
			axios(config)
				.then(function (response) {
					history.push("menu-list");
				})
				.catch(function (error) {
					toastr.error('Check you menue infomation and insert correctly', error);
				});
		}

	}

	return (
		<div>
			<Header
				absolute
				color="dark"
				brand="OnTab"
				rightLinks={<HeaderLinks />}
				{...rest}
			/>
			<div className={classNames(classes.main, classes.mainRaised)} style={{ marginTop: "100px" }}>
				<div className={classes.container}>
					<GridContainer justify="center">
						<GridItem xs={12} sm={12} md={9}>
							<GridContainer style={{ marginTop: "100px" }}>
								<GridItem sm={9}>
									<h2 style={{ borderLeft: "4px solid #8BC34A", paddingLeft: "10px" }}>Menu Management</h2>
								</GridItem>
								<GridItem sm={3} style={{ marginTop: "31px" }}>
									<Link to="menu-list">
										<BackButton
											variant="outlined"
											color="primary"
											className={classes.button}
											startIcon={<KeyboardReturnIcon />}
											style={{ width: "100%" }}>
											Back
										</BackButton>
									</Link>
								</GridItem>
							</GridContainer>
							<ValidatorForm
								onSubmit={submitMenu}
								onError={errors => console.log(errors)}
							>
								<GridContainer>
									<GridItem sm={12}>
										<TextValidator
											label="Menu Title*"
											onChange={handleTitle}
											multiline
											name="title"
											value={title}
											style={{ width: "100%", marginBottom: "10px" }}
											validators={['required']}
											errorMessages={['this field is required', 'Title is not valid']}
										/>
									</GridItem>
									<GridItem sm={12}>
										<TextField
											id="description"
											multiline
											onChange={handleDesc}
											value={desc}
											// variant="outlined"
											style={{ width: "100%", marginBottom: "10px" }}
											label="Description" />
									</GridItem>
									<GridItem sm={12}>
										<TextField
											id="termsAndConditions"
											onChange={handleTermsAndConditions}
											// variant="outlined"
											value={termsAndConditions}
											multiline
											style={{ width: "100%", marginBottom: "10px" }}
											label="Terms And Conditions" />
									</GridItem>
									<GridItem sm={12}>
										<TextField
											id="allergyAdvice"
											onChange={handleAllergyAdvice}
											value={allergyAdvice}
											// variant="outlined"
											multiline
											style={{ width: "100%", marginBottom: "10px" }}
											label="Allergy Advice" />
									</GridItem>
									<GridItem xs={8} sm={11}>
										<h3 style={{ fontWeight: "bold" }}>Section List</h3>
									</GridItem>
									<GridItem xs={4} sm={1}>
										<MenuSectionModal handleChange={handleAddSection} />
									</GridItem>
									<GridContainer style={{ justifyContent: "center" }}>
										<Accordion style={{ width: "96%" }}>
											{menus.sections ?
												menus.sections.map((parent, i) => {
													return (
														<AccordionItem key={i}>
															<AccordionItemHeading>
																<AccordionItemButton>
																	<div className="menu-section-header">
																		<h4>{parent.section_title}</h4>
																	</div>

																</AccordionItemButton>
															</AccordionItemHeading>
															<AccordionItemPanel className="menu-section-body">
																<GridContainer>
																	<GridItem sm={8} style={{ marginTop: "20px" }}>
																		<GridContainer>
																			<GridItem sm={4}>
																				<h4 style={{ fontWeight: "bold" }}>Section Title:</h4>
																			</GridItem>
																			<GridItem sm={8}>
																				<h4>{parent.section_title}</h4>
																			</GridItem>
																			<GridItem sm={4}>
																				<h4 style={{ fontWeight: "bold" }}>Section Description :</h4>
																			</GridItem>
																			<GridItem sm={8}>
																				<h4>{parent.section_desc}</h4>
																			</GridItem>
																		</GridContainer>
																	</GridItem>
																	<GridItem sm={4}>
																		<GridContainer style={{ display: "flex", alignItems: "center" }}>
																			<GridItem sm={8}>
																				<GridContainer style={{ marginTop: "20px" }}>
																					<GridItem sm={12}>
																						<MenuSectionContentModal no={i} onChange={handleSecitonContent} onDelete={deleteHandle} />
																					</GridItem>
																				</GridContainer>
																			</GridItem>
																			<GridItem sm={4}>
																				<Fab size="small" style={{ marginTop: "20px" }} onClick={() => handleDeleteItemClickOpen(i)} aria-label="add" className={classes.margin}>
																					<DeleteIcon />
																				</Fab>
																			</GridItem>
																		</GridContainer>

																	</GridItem>

																	{
																		parent.section_contents ?
																			parent.section_contents.map((child, j) => {
																				return (<SectionItem data={child} no={{ i, j }} key={j} onChange={updateSectionContent} onDelete={deleteSectionContent} />)
																			}) : ""
																	}
																</GridContainer>
															</AccordionItemPanel>
														</AccordionItem>
													)

												})
												: ""
											}
										</Accordion>
									</GridContainer>
									<GridItem sm={12}>
										<Button color="info" size="lg" style={{ marginTop: "40px", marginBottom: "80px", width: "100%" }} type="submit">
											SUBMIT
										</Button>
									</GridItem>
								</GridContainer>
							</ValidatorForm>
						</GridItem>
					</GridContainer>

					<Dialog
						open={openDeleteItem}
						onClose={handleDeleteItemClose}
						aria-labelledby="responsive-dialog-title"
					>
						<DialogTitle id="responsive-dialog-title" style={{ padding: "20px 20px 0px" }}>{"Are you sure you want to Delete this Section?"}</DialogTitle>
						<DialogActions>
							<Button autoFocus onClick={handleDeleteItemClose} color="success" size="sm" style={{ marginTop: "0px" }}>
								Cancel
							</Button>
							<Button onClick={deleteSection} color="info" size="sm" autoFocus style={{ marginTop: "0px" }}>
								OK
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
		</div>
	);
}
