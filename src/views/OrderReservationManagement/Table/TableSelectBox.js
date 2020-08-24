import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [distance, setDistance] = React.useState('');

  const handleChange = (event) => {
    setDistance(event.target.value);
    // props.onClick(event.target.value)
    console.log(event.target.value)
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Distance</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={distance}
          onChange={handleChange}
        >
          <MenuItem value={"Accept"}>Accept</MenuItem>
          <MenuItem value={"Decline"}>Decline</MenuItem>
          <MenuItem value={"SettleTab"}>SettleTab</MenuItem>
          <MenuItem value={"Close"}>Close</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
