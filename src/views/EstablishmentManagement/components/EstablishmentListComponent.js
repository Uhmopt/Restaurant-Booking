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
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogActions } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 400,
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
  const history = useHistory();
  const classes = useStyles();

  const[authority] = React.useState(localStorage.getItem("authority"));

  const[open, setOpen] = React.useState(false);

  const[token, setToken] = React.useState(localStorage.getItem("access_token"));

  function handleManage () {
    const data = {...props.data}
    console.log("this is the establishment Component data", data)
    localStorage.setItem('establishment', JSON.stringify(data));
    localStorage.setItem('insertEstablishmentFlag', false);
    history.push('establishment-submit')
  }

  function handleMenu () {
      localStorage.setItem('establishmentId', props.data.id);
      history.push('menu-list');
  }

  function handleOrder () {
         localStorage.setItem('establishmentId', props.data.id);
      history.push('order-reservation-manage');
  }

  function handleHistory () {
    localStorage.setItem('establishmentId', props.data.id);
    history.push('establishment-history');
  }

  function handleAccount () {
    localStorage.setItem('establishmentId', props.data.id);
    history.push('user-account');
  }

  function handleDelete () {
    setOpen(true);
  }  
  
  function deleteConfirm () {
    localStorage.setItem('establishmentId', props.data.id);
    console.log(props.data.id)
    // props.data.id
    setOpen(false);

    var config = {
      method: 'put',
      url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/establishment/remove/${props.data.id}`,
      headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
    };
    
    axios(config)
    .then(function (response) {
      toastr.success('Removed succefully!', 'success');
      props.onDelete();
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  function handleDeleteClose () {
    setOpen(false);
  }
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            props.data.published?
            <Avatar aria-label="recipe" style={{ backgroundColor: "#3abc86", width: "26px", height: "26px" }}>
              <CheckIcon/>
            </Avatar>
            :
            <Avatar aria-label="recipe" style={{ width: "26px", height: "26px" }}>
              <CheckIcon/>
            </Avatar>
          }
          action={
            <GridContainer>
              <IconButton aria-label="settings" onClick={handleHistory} >
                <QueryBuilderIcon />
              </IconButton>
              {
                authority=="MANAGER"?
                <IconButton aria-label="settings" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>:
                ""
              }
              
            </GridContainer>
          }
          title={props.data.name}
          subheader={"Post Code:" + props.data.address.postcode + " Country Code:" + props.data.address.countryCode}
        />
        <CardMedia
          className={classes.media}
          image="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iEKgigI_JgX8/v2/-1x-1.jpg"
          title="Paella dish"
        />
        <CardContent style={{paddingBottom: "0"}}>
          <Typography variant="body2" color="textSecondary" component="p">
            { "Count:  " + props.data.address.county +  "  City:" + props.data.address.city  + "  Telephone: "  + props.data.telephone}
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{marginBottom: "16px"}}>
          <GridContainer>
          {
            authority=="MANAGER"?
            <GridContainer>
            <GridItem md={6} >
              <Button variant="outlined" onClick={handleManage} startIcon={<EditIcon />} color="primary" style={{ width: "100%", marginTop: "10px" }}>
                Manage
              </Button>
            </GridItem>
            <GridItem md={6} >
              <Button variant="outlined" onClick={handleOrder} startIcon={<BookmarksIcon />} color="primary" style={{ width: "100%", marginTop: "10px" }}>
                Order
              </Button>
            </GridItem>
            <GridItem md={6}>
              <Button variant="outlined" onClick={handleMenu} startIcon={<MenuBookIcon />} color="primary" style={{ width: "100%", marginTop: "10px" }}>
                Menu
              </Button>
            </GridItem>
            <GridItem md={6}>
              <Button variant="outlined" onClick={handleAccount} startIcon={<AccountBoxIcon />} color="primary" style={{ width: "100%", marginTop: "10px" }}>
                Account
              </Button>
            </GridItem>
            </GridContainer>:
            <GridItem md={12} >
              <Button variant="outlined" onClick={handleOrder} startIcon={<BookmarksIcon />} color="primary" style={{ width: "100%", marginTop: "10px" }}>
                Order
              </Button>
            </GridItem>
          }

            
          </GridContainer>
        </CardActions>
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
      </Card>
    );
  }
