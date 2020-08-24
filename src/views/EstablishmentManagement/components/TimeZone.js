import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export default function NativeSelects(props) {
	const classes = useStyles();
	const [list, setList] = React.useState([]);
	const [timeZone, setTimeZone] = React.useState([]);

	React.useEffect(() => {
		var config = {
			method: 'get',
			url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/preset/timezones',
			headers: {}
		};
		axios(config)
			.then(function (response) {
				setList(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}, []);

	React.useEffect(() => {
		setTimeZone(props.data)
	}, [props]);

	const handleChange = (event) => {
		setTimeZone(event.target.value)
		props.onChange(event.target.value)
	};

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel htmlFor="age-native-simple">TimeZone</InputLabel>
				{list[0] && <Select
					native
					value={timeZone}
					onChange={handleChange}
				>
					<option aria-label="None" value="" />
					{
						list.map((element, i) => {
							return (
								<option key={i} value={element.split(" ")[1]}>{element}</option>
							)
						})
					}
				</Select>}
			</FormControl>
		</div>
	);
}
