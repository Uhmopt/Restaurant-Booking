import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from "components/CustomButtons/Button.js";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleTitle(e) {
    setTitle(e.target.value)
  }

  function handleDesc(e) {
    setDesc(e.target.value)
  }

  function handleSave(e) {
    props.handleChange({ title, desc })
    setOpen(false);
  }

  return (
    <div>
      <Fab color="primary" size="small" aria-label="add" onClick={handleClickOpen} style={{marginTop:"20px"}}>
        <AddIcon />
      </Fab>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Section Create
        </DialogTitle>
        <DialogContent dividers>
          <GridContainer>
            <GridItem sm={3}>
              <h4 style={{paddingTop: "4px"}}>Section Title:</h4>
            </GridItem>
            <GridItem sm={9}>
              <TextField id="outlined-basic" label="Title*" variant="outlined" style={{width: "100%"}} onChange={handleTitle} />
            </GridItem>
            <GridItem sm={3} style={{marginTop: "20px"}}>
              <h4 style={{paddingTop: "4px"}}>Description:</h4>
            </GridItem>
            <GridItem sm={9} style={{marginTop: "20px"}}>
              <TextField id="outlined-basic" label="Description" variant="outlined" style={{width: "100%"}}  onChange={handleDesc} />
            </GridItem>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus  variant="contained"  onClick={()=> {
            props.handleChange({ title, desc })
            setOpen(false);
          }} color="primary">
            Save Section
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
