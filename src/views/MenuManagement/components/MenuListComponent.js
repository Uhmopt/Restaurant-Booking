import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogActions } from '@material-ui/core';
import { useHistory } from "react-router-dom"
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		// maxWidth: 450,
		minHeight: 250,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function RecipeReviewCard(props) {

	const[open, setOpen] = React.useState(false)
	const classes = useStyles();
	const history = useHistory();

	function handleManage () {
		localStorage.setItem('menuFlag', false)
		console.log(props.data)
		localStorage.setItem("selectedMenu", JSON.stringify(props.data))
		history.push('menu-management')
	}
	function handleDelete () {
		setOpen(true);
	}

	function deleteConfirm () {

		var config = {
			method: 'delete',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/menu/delete/${props.data.id}`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('access_token')}`,
				'Content-Type': 'application/json'
			},
		};

		axios(config)
		.then(function (response) {
			toastr.success('Removed Successfully!', 'Success!');
			props.onDelete();
			setOpen(false);
		})
		.catch(function (error) {
			toastr.error('Erro occured!', 'Error');
			setOpen(false);
		});
	}

	function handleDeleteClose () {
		setOpen(false);
	}
	return (
		<Card className={classes.root} >
			<CardHeader
				action={
					<IconButton aria-label="settings" onClick={handleDelete}>
						<DeleteIcon />
					</IconButton>
				}
					title={props.data.title}
				style={{backgroundColor: "#e6e6e6"}}
			/>
			<CardContent style={{paddingBottom: "0"}}>
				<Typography variant="body2" color="textSecondary" component="p">
					{props.data.desc}
				</Typography>
			</CardContent>
			<CardActions disableSpacing style={{marginBottom: "16px"}}>
				<GridContainer>
					<GridItem md={12} >
						<Button variant="outlined" startIcon={<EditIcon />} color="primary" style={{ width: "100%", marginTop: "10px" }} onClick={handleManage}>
							Manage
						</Button>
					</GridItem>
								<Dialog
									open={open}
									aria-labelledby="responsive-dialog-title"
								>
									<DialogTitle id="responsive-dialog-title" style={{ padding: "20px 20px 0px" }}>{"Are you sure you want to Delete Restaurant?"}</DialogTitle>
									<DialogActions>
										<Button autoFocus onClick={handleDeleteClose} style={{ marginTop: "0px" }}>
											Cancel
										</Button>
										<Button onClick={deleteConfirm} autoFocus style={{ marginTop: "0px" }}>
											OK
										</Button>
									</DialogActions>
								</Dialog>
				</GridContainer>
			</CardActions>
		</Card>

	);
}
