import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [week, setweek] = React.useState('MONDAY');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setweek(event.target.value);
    props.onSelect(event.target.value)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">WeekDay</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={week}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"MONDAY"}>MONDAY</MenuItem>
          <MenuItem value={"TUESDAY"}>TUESDAY</MenuItem>
          <MenuItem value={"WEDNESDAY"}>WEDNESDAY</MenuItem>
          <MenuItem value={"THURSDAY"}>THURSDAY</MenuItem>
          <MenuItem value={"FRIDAY"}>FRIDAY</MenuItem>
          <MenuItem value={"SATURDAY"}>SATURDAY</MenuItem>
          <MenuItem value={"SUNDAY"}>SUNDAY</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}