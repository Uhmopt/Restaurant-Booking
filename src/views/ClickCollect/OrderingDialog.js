import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import MenuDatatable from './MenuDataTable.js';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" size="small" color="primary" onClick={handleClickOpen}>
        Click & Collect
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
        <DialogTitle id="form-dialog-title">Click & Collect</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Establishment Title: <span style={{fontWeight: "bold"}}>The Lynhert</span><br/>
            Order Address: <span style={{fontWeight: "bold"}}>White House, Washington, US, New York</span>
          </DialogContentText>
          
          <MenuDatatable />
        <GridContainer style={{marginTop: "20px"}}>
            <GridItem sm={4}>
                <TextField
                    margin="dense"
                    id="name"
                    label="Comments"
                    type="text"
                    fullWidth
                    multiline
                />
            </GridItem>
            <GridItem sm={5}>
                <TextField
                    id="datetime-local"
                    type="datetime-local"
                    style={{width: "220px", marginTop: "21px"}}
                    defaultValue="2020-05-24T10:30"
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </GridItem>
            <GridItem sm={3}>
                <h3 style={{marginLeft: "0px"}}>Total: 20$</h3>
            </GridItem>
        </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
