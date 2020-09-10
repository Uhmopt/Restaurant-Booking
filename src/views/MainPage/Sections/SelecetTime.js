import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SelectTime(props) {

  const handleChange = (event) => {
    props.onClick(event.target.value)
    console.log(event.target.value)
  };

  return (
      <FormControl style={{ width: "100%"}}>
        <InputLabel id="demo-simple-select-label">Time</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          onChange={handleChange}
        >
          <MenuItem value={"12:00"}>12:00</MenuItem>
          <MenuItem value={"12:15"}>12:15</MenuItem>
          <MenuItem value={"12:30"}>12:30</MenuItem>
          <MenuItem value={"12:45"}>12:45</MenuItem>
          <MenuItem value={"01:00"}>01:00</MenuItem>
          <MenuItem value={"01:15"}>01:15</MenuItem>
          <MenuItem value={"01:30"}>01:30</MenuItem>
          <MenuItem value={"01:45"}>01:45</MenuItem>
          <MenuItem value={"02:00"}>02:00</MenuItem>
          <MenuItem value={"02:15"}>02:15</MenuItem>
          <MenuItem value={"02:30"}>02:30</MenuItem>
          <MenuItem value={"02:45"}>02:45</MenuItem>
          <MenuItem value={"03:00"}>03:00</MenuItem>
          <MenuItem value={"03:15"}>03:15</MenuItem>
          <MenuItem value={"03:30"}>03:30</MenuItem>
          <MenuItem value={"03:45"}>03:45</MenuItem>
          <MenuItem value={"04:00"}>04:00</MenuItem>
          <MenuItem value={"04:15"}>04:15</MenuItem>
          <MenuItem value={"04:30"}>04:30</MenuItem>
          <MenuItem value={"04:45"}>04:45</MenuItem>
          <MenuItem value={"05:00"}>05:00</MenuItem>
          <MenuItem value={"05:15"}>05:15</MenuItem>
          <MenuItem value={"05:30"}>05:30</MenuItem>
          <MenuItem value={"05:45"}>05:45</MenuItem>
          <MenuItem value={"06:00"}>06:00</MenuItem>
          <MenuItem value={"06:15"}>06:15</MenuItem>
          <MenuItem value={"06:30"}>06:30</MenuItem>
          <MenuItem value={"06:45"}>06:45</MenuItem>
          <MenuItem value={"07:00"}>07:00</MenuItem>
          <MenuItem value={"07:15"}>07:15</MenuItem>
          <MenuItem value={"07:30"}>07:30</MenuItem>
          <MenuItem value={"07:45"}>07:45</MenuItem>
          <MenuItem value={"08:00"}>08:00</MenuItem>
          <MenuItem value={"08:15"}>08:15</MenuItem>
          <MenuItem value={"08:30"}>08:30</MenuItem>
          <MenuItem value={"08:45"}>08:45</MenuItem>
          <MenuItem value={"09:00"}>09:00</MenuItem>
          <MenuItem value={"09:15"}>09:15</MenuItem>
          <MenuItem value={"09:30"}>09:30</MenuItem>
          <MenuItem value={"09:45"}>09:45</MenuItem>
          <MenuItem value={"10:00"}>10:00</MenuItem>
          <MenuItem value={"10:15"}>10:15</MenuItem>
          <MenuItem value={"10:30"}>10:30</MenuItem>
          <MenuItem value={"10:45"}>10:45</MenuItem>
          <MenuItem value={"11:00"}>11:00</MenuItem>
          <MenuItem value={"11:15"}>11:15</MenuItem>
          <MenuItem value={"11:30"}>11:30</MenuItem>
          <MenuItem value={"11:45"}>11:45</MenuItem>
          <MenuItem value={"12:00"}>12:00</MenuItem>
          <MenuItem value={"12:15"}>12:15</MenuItem>
          <MenuItem value={"12:30"}>12:30</MenuItem>
          <MenuItem value={"12:45"}>12:45</MenuItem>
          <MenuItem value={"13:00"}>13:00</MenuItem>
          <MenuItem value={"13:15"}>13:15</MenuItem>
          <MenuItem value={"13:30"}>13:30</MenuItem>
          <MenuItem value={"13:45"}>13:45</MenuItem>
          <MenuItem value={"14:00"}>14:00</MenuItem>
          <MenuItem value={"14:15"}>14:15</MenuItem>
          <MenuItem value={"14:30"}>14:30</MenuItem>
          <MenuItem value={"14:45"}>14:45</MenuItem>
          <MenuItem value={"15:00"}>15:00</MenuItem>
          <MenuItem value={"15:15"}>15:15</MenuItem>
          <MenuItem value={"15:30"}>15:30</MenuItem>
          <MenuItem value={"15:45"}>15:45</MenuItem>
          <MenuItem value={"16:00"}>16:00</MenuItem>
          <MenuItem value={"16:15"}>16:15</MenuItem>
          <MenuItem value={"16:30"}>16:30</MenuItem>
          <MenuItem value={"16:45"}>16:45</MenuItem>
          <MenuItem value={"17:00"}>17:00</MenuItem>
          <MenuItem value={"17:15"}>17:15</MenuItem>
          <MenuItem value={"17:30"}>17:30</MenuItem>
          <MenuItem value={"17:45"}>17:45</MenuItem>
          <MenuItem value={"18:00"}>18:00</MenuItem>
          <MenuItem value={"18:15"}>18:15</MenuItem>
          <MenuItem value={"18:30"}>18:30</MenuItem>
          <MenuItem value={"18:45"}>18:45</MenuItem>
          <MenuItem value={"19:00"}>19:00</MenuItem>
          <MenuItem value={"19:15"}>19:15</MenuItem>
          <MenuItem value={"19:30"}>19:30</MenuItem>
          <MenuItem value={"19:45"}>19:45</MenuItem>
          <MenuItem value={"20:00"}>20:00</MenuItem>
          <MenuItem value={"20:15"}>20:15</MenuItem>
          <MenuItem value={"20:30"}>20:30</MenuItem>
          <MenuItem value={"20:45"}>20:45</MenuItem>
          <MenuItem value={"21:00"}>21:00</MenuItem>
          <MenuItem value={"21:15"}>21:15</MenuItem>
          <MenuItem value={"21:30"}>21:30</MenuItem>
          <MenuItem value={"21:45"}>21:45</MenuItem>
          <MenuItem value={"22:00"}>22:00</MenuItem>
          <MenuItem value={"22:15"}>22:15</MenuItem>
          <MenuItem value={"22:30"}>22:30</MenuItem>
          <MenuItem value={"22:45"}>22:45</MenuItem>
          <MenuItem value={"23:00"}>23:00</MenuItem>
          <MenuItem value={"23:15"}>23:15</MenuItem>
          <MenuItem value={"23:30"}>23:30</MenuItem>
          <MenuItem value={"23:45"}>23:45</MenuItem>
        </Select>
      </FormControl>
  );
}
