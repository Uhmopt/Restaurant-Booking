import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Dialog from './TableDialog.js'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import axios from 'axios'

const useStyles = makeStyles({
  root: {
	width: '100%'
  },
  container: {
	maxHeight: 650,
  },
})

export default function MediaCard(props) {
	const accept = {
		backgroundColor: "#72a0ff",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}
	const decline = {
		backgroundColor: "#66f7c5",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}
	const close = {
		backgroundColor: "#f76684",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}
	const selectTab = {
		backgroundColor: "#ffd8a2",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}
	const classes = useStyles();

	const [tabList, setTabList] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [select, setSelect] = React.useState({});
	
	React.useEffect(() => {
		initGetDate()
  	}, []);

	function initGetDate() {
		var config = {
		method: 'get',
		url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/order/establishment/${localStorage.getItem("establishmentId")}`,
		headers: { }
		};
		axios(config)
		.then(function (response) {
			localStorage.setItem("tabList", JSON.stringify(response.data))
			setTabList(JSON.parse(localStorage.getItem("tabList")))
		})
		.catch(function (error) {
			console.log(error);
			});
	}

	function handleClick (selectedData) {
		setSelect(selectedData);
		setOpen(true);
	}
	function handleColse () {
		setOpen(false);
	}

  return (

	<GridItem sm={12} >
		<GridItem sm={12} style={{ paddingTop: "30px", color: "black", textAlign: "-webkit-right"}}><h4 ><LocalLibraryIcon /> <font>Table Orders: 13</font></h4></GridItem>
		<GridItem sm={12} >
			<GridContainer spacing={2} style={{ paddingTop: "30px" }}>
			{tabList.length!=0?tabList.map((element, i)=>{
				return (
					<GridItem sm={6} key={i}>
						<Card onClick={()=>handleClick(element)}>
							<CardActionArea>
								<CardContent spacing={5}>
										<GridContainer  style={{fontSize: "16px"}}>
											<GridItem sm={3}>{element.friendlyId}</GridItem>
											<GridItem sm={3}>{element.tableNo}</GridItem>
											<GridItem sm={3}>{element.state}</GridItem>
											<GridItem sm={3}>{element.total}</GridItem>
										</GridContainer>
								</CardContent>
							</CardActionArea>
						</Card>
					</GridItem>
				)
			}):""}
		<Dialog open={ open } selectedData={select} onCloses={handleColse}/>
	  </GridContainer>

		</GridItem>
		  </GridItem>
  );
}
