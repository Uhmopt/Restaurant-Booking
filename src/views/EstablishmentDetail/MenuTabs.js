import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import NavPills from "components/NavPills/NavPills.js";
import MenuDetail from "./MenuDetail";
import styles from "assets/jss/material-kit-react/views/componentsSections/pillsStyle.js";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import OrderingDialog from './OrderingDialog';
import styled from 'styled-components';
import axios from "axios"

const useStyles = makeStyles(styles);

export default function SectionPills() {
	const classes = useStyles();
	const [menuList, setMenuList] = React.useState([])
	const [open, setOpen] = React.useState(false);
	const [count, setCount] = React.useState(0);
	const [success, setSuccess] = React.useState(false);

	const Thing = styled.div.attrs(() => ({ tabIndex: 0 }))`
	&:hover {
	  background-color: #337ab7;
	  color: white;
	}
  `

	React.useEffect(() => {
		initGetData();
	},
	// eslint-disable-next-line
	[]);

	function initGetData() {
		var establishmentID = localStorage.getItem("selectedEstablishmentId")
		var config = {
			method: 'get',
			url: `https://cors-anywhere.herokuapp.com/http://ontab.co.uk/v1/menu/getByEstablishment/${establishmentID}`,
			headers: { }
		};
		axios(config)
		.then(function (response) {
			configMenuList (response.data);
			setSuccess(true);
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	function configMenuList (data) {
		var array = [];
		if (data.length!==0) {
				data.forEach((element, i)=>{
				array.push({
					tabButton: element.title,
					tabContent: (
						<MenuDetail key={i} data={ element } title={ element.title } count={handleCount} style={{ overflowY: "hidden" }}/>
					)
				})
			})
		}
		setMenuList( array );
	}

	function handlClick () {
		setOpen(true);
	}	

	function handleClose () {
		setOpen(false);
	}

	function handleCount () {
		setCount(JSON.parse(localStorage.getItem("basket")).length)
	}

	function handleDelete () {
		setCount(JSON.parse(localStorage.getItem("basket")).length)
	}
	
	return (
		<div className={classes.section} style={{paddingTop: "0px", width: "100%"}}>
			<div className={classes.container}>
				<div id="navigation-pills" style={{ position: "relative" }}>
					
						{
							success?
								<div >
									<Thing style={{
										position: "absolute",
										right: "0",
										top: "0",
										marginTop: "-5px",
										marginRight: "10px",
										width: "25px",
										height: "25px",
										borderRadius: "50%",
										boxSizing: "content-box",
										backgrounColor: "#abcdef",
										transition: "all 0.5s",
										padding: "7px"
								}}>

									<div className='animation-button' style={{
										position: "absolute",
										right: "0",
										top: "0",
										marginRight: "-10px",
										marginTop: "-10px",
										borderRadius: "50%",
										boxSizing: "content-box",
										paddingRight: "5px",
										paddingLeft: "5px",
										backgroundColor: "#1c86e0",
										color: "white"
									}}>
										<h6 style={{margin: "2px"}}>{count}</h6>
									</div>
									<ShoppingCartOutlinedIcon onClick={ handlClick } style={{verticalAlign: "middle", marginLeft: "1px"}} />
								</Thing>
							</div>:""
						}
										
					<div className={classes.title}>
						<h3 style={{fontWeight: "500",paddingLeft: "12px", borderBottom: "2px solid #337ab7"}}><MenuBookOutlinedIcon /> Menu</h3>
					</div>
					<NavPills
						color="info"
						tabs={menuList}
						style={{border:" 1px solid #337ab7",borderRadius: "4px", padding: "0px 20px 30px 20px" }}
					/>
				</div>
				<OrderingDialog openState={open} onDelete={handleDelete} onClose={handleClose}/>
			</div>

		</div>
	);
}
