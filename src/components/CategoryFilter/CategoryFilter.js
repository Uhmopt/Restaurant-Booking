import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
// material icon
import FilterIcon from '@material-ui/icons/Filter';

import axios from "axios"

export default function Components(props) {

	const OuseStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
		},
		formControl: {
			margin: theme.spacing(3),
		},
	}));

	const classes = OuseStyles();
	const [cuisines, setCuisines] = React.useState([]);
	const [diets, setDiets] = React.useState([]);

	React.useEffect(() => {
		getInitCuisines();
		getInitDiets();
	}, []);

	const handleChange = (event, i) => {
		const fk_diets = [ ...diets ];
		fk_diets[i] = { name: event.target.name, value: event.target.checked }
		setDiets( fk_diets );
		toParent( cuisines, fk_diets)
	};

	const handleChange_c = (event, i) => {
		const fk_cuisines = [ ...cuisines ];
		fk_cuisines[i] = { name: event.target.name, value: event.target.checked }
		setCuisines( fk_cuisines );
		toParent( fk_cuisines, diets)
	};

	function toParent( fk_cuisines, fk_diets ) {
		props.onSelect({ fk_cuisines, fk_diets })
	}

	function getInitCuisines() {
		var config = {
		method: 'get',
		url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/preset/cuisines',
		headers: { }
		};

		axios(config)
		.then(function (response) {
			const fk_cuisines = [...cuisines];
			response.data.forEach(element => {
				fk_cuisines.push({ "name": element ,"value": false },)
			});
			setCuisines(fk_cuisines);
		})
		.catch(function (error) {
		console.log(error);
		});
	}

	function getInitDiets() {
		var config = {
			method: 'get',
			url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/preset/diets',
			headers: { }
			};

			axios(config)
			.then(function (response) {
			const fk_diets = [...diets];
			response.data.forEach(element => {
				fk_diets.push({"name": element ,"value": false},)
			});
			setDiets(fk_diets);
			})
			.catch(function (error) {
			console.log(error);
			});
	}

	return (
		<div style={{background: "#fff"}}>
			<h4 style={{marginTop: '42px',fontWeight: '500'}}>Dietary Filter:</h4>
			<div className={classes.root}>
				<FormControl component="fieldset" className={classes.formControl} style={{margin: "0"}}>
					<FormGroup>
						{
							diets.map((element, i)=>{
								return (
									<FormControlLabel
										key={i}
										control={<Checkbox checked={element.value} color="primary" onChange={(e, key) => handleChange(e, i)} name={element.name} style={{padding: "2px"}}/>}
										label={element.name}  style={{color: 'black'}}
									/>
								)

							})
						}
					</FormGroup>
				</FormControl>
			</div>
			<h4 style={{marginTop: '18px',fontWeight: '500'}}>Cuisines:</h4>
			<div className={classes.root}>
				<FormControl component="fieldset" className={classes.formControl} style={{margin: "0"}}>
					<FormGroup>
						{
							cuisines.map((element, i)=>{
								return (
									<FormControlLabel
										key={i}
										control={<Checkbox checked={element.value} color="primary" onChange={(e, key) => handleChange_c(e, i)} name={element.name} style={{padding: "2px"}}/>}
										label={element.name}  style={{color: 'black'}}
									/>
								)
							})
						}
					</FormGroup>
				</FormControl>
			</div>
		</div>
	);
}
