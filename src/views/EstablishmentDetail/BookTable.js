import React from 'react';
import Button from "components/CustomButtons/Button.js";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const [open_hour, setOpenHour] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenHour(false);
  };

  const handleFirstDiolog = () => {
    setOpen(true);
    setOpenHour(false);
  };

  const handleBook1 = () => {
    setOpen(false);
    setOpenHour(true);
  };
  const handleHourClose = () => {
    setOpenHour(false);
  };

  return (
    <div>
        <Button color="info" style={{width: "100%"}} size="lg" onClick={handleClickOpen}>
            <RestaurantIcon /> Book A Table
        </Button>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle style={{background: "#f2f2f2", textAlign: "center",paddingBottom: "10px"}}><p style={{fontSize: "1rem", fontWeight:"bold"}}>Choose your booking options</p></DialogTitle>
            <DialogContent  style={{minHeight: "200px"}}>
                <DialogContentText style={{color: "#444", marginTop: "25px"}}>
                    Select an option below:
                </DialogContentText>
                <GridContainer>
                    <GridItem sm={12} md={6}>
                        <TextField
                        id="outlined-number"
                        label="People"
                        type="number"
                        value="2"
                        style={{width: "100%", marginTop: "16px"}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    </GridItem>
                    <GridItem sm={12} md={6}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                style={{width: "100%"}}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </GridItem>
                </GridContainer>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary" style={{minWidth: "120px"}} round>
                Cancel
            </Button>
            <Button onClick={handleBook1} color="info" autoFocus style={{minWidth: "120px"}} round>
                <RestaurantIcon /> Book
            </Button>
            </DialogActions>
        </Dialog>

        {/* Select Reservation Able Hours */}
        <Dialog
            fullScreen={fullScreen}
            open={open_hour}
            aria-labelledby="responsive-dialog-title"
        > 
            <DialogTitle style={{background: "#f2f2f2", textAlign: "center",paddingBottom: "10px"}}>
                <p style={{fontSize: "1rem", fontWeight:"bold"}}>Your booking at Marco Pierre White - London Steakhouse Co. - City</p></DialogTitle>
            <DialogContent  style={{minHeight: "200px"}}>
                <DialogContentText style={{color: "#444", marginTop: "5px"}}>
                    for <span style={{fontWeight: "700"}}>2 people</span> on <span style={{fontWeight: "700"}}>5 August 2020</span>
                </DialogContentText>
                <DialogContentText style={{color: "#444", marginTop: "5px"}}>
                    Select a Time:
                </DialogContentText>
                <Button disabled>12:30</Button>
                <Button>12:30</Button>
                <Button color="warning">12:30</Button>
                <Button color="warning">12:30</Button>
                <Button color="warning">12:30</Button>
                <Button color="warning">12:30</Button>
                <Button disabled>12:30</Button>
                <Button disabled>12:30</Button>
                <Button disabled>12:30</Button>
                <Button disabled>12:30</Button>
                <Button disabled>12:30</Button>
                <Button disabled>12:30</Button>
                <Button disabled>12:30</Button>
                <Button disabled>12:30</Button>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleFirstDiolog} color="primary" style={{minWidth: "120px"}} round>
                    <ArrowBackIcon/>Back
                </Button>
                <Button onClick={handleHourClose} color="info" autoFocus style={{minWidth: "120px"}} round>
                    <RestaurantIcon /> Book
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
