import React from 'react';
import Button from "components/CustomButtons/Button.js";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export default function ResponsiveDialog(props) {
  const history = useHistory();
  const theme = useTheme();
  const token = localStorage.getItem("access_token");
  const handleBook= () => {
    props.dialogClose();
    if (token) {
        var axios = require('axios');
        var data =
        {
            "establishmentID": localStorage.getItem("establishmentId"),
            "covers": localStorage.getItem("bookCover"),
            "reservationTime": props.data[0].time
        }

        var config = {
            method: 'post',
            url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/reservation/create',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            toastr.success('Your reqest accepted successfully!', "Success!");
        })
        .catch(function (error) {
            toastr.error('Sorry, not complete!', error);
            console.log(error);
        });
    }else {
        history.push("user-login");
    }
  }
    

    function objectToString (obj, v) {
        var string = "";
        if (v == 0) {
            for (const key in obj) {
                string = string + key + ":" + " " + obj[key] + ", ";
            }
        } else {
            for (const key in obj) {
                string = string + obj[key] + ", ";
            }
        }
        string = string.substr(0, string.length - 2);
        return string
    }


    function secondsToHms(d) {

		var sec_num = Number(d) // don't forget the second param
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);
	
		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		return hours + ':' + minutes;
    }
    console.log(props.time);

    return (
    <div>
        <Dialog
            open={props.dialogOpen}
            aria-labelledby="responsive-dialog-title"
            maxWidth="sm"
        >
            <DialogTitle style={{background: "#f2f2f2",paddingBottom: "10px"}}><p style={{fontSize: "1rem", fontWeight:"bold"}}>{props.data[1].name}</p></DialogTitle>
            <DialogContent  style={{minHeight: "200px"}}>
                <GridContainer>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "500" }}>Name:</GridItem>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "400" }}>{props.data[1].name}</GridItem>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "500", marginTop: "24px" }}>Address:</GridItem>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "400", marginTop: "24px" }}>{objectToString(props.data[1].address, 1)}</GridItem>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "500", marginTop: "24px" }}>Phone:</GridItem>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "400", marginTop: "24px" }}>{props.data[1].phone}</GridItem>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "500", marginTop: "24px" }}>Email:</GridItem>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "400", marginTop: "24px" }}>{props.data[1].email}</GridItem>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "500", marginTop: "24px" }}>Cover:</GridItem>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "400", marginTop: "24px" }}>{localStorage.getItem("bookCover")}</GridItem>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "500", marginTop: "24px" }}>Time:</GridItem>
                    <GridItem sm={6} style={{ fontSize: "18px", fontWeight: "400", marginTop: "24px" }}>{secondsToHms(props.time)}</GridItem>
                </GridContainer>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={props.dialogClose} color="primary" style={{minWidth: "120px"}} round>
                Cancel
            </Button>
            <Button onClick={handleBook} color="info" autoFocus style={{minWidth: "120px"}} round>
                <RestaurantIcon /> Book
            </Button>
            </DialogActions>
        </Dialog>

    </div>
  );
}
