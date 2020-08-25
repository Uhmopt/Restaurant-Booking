import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Dialog from './ClickCollectDialog.js'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import axios from 'axios'

export default function MediaCard( props ) {
	const request = {
		backgroundColor: "#cb60de",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}
	const complete = {
		backgroundColor: "#66f7c5",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}
	const cancel = {
		backgroundColor: "#f76684",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}
	const accept = {
		backgroundColor: "#3f7ad8",
		padding: "5px",
		textAlignLast: "center",
		borderRadius: "6px"
	}
	const [orderList, setOrderList] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const [select, setSelect] = React.useState({});

	React.useEffect(() => {
		initGetDate()
	  }, []);

	function initGetDate() {
		var token = localStorage.getItem("access_token");
		localStorage.getItem("establishmentId")
		localStorage.setItem("orderList", JSON.stringify([]))
		var config = {
			method: 'get',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/order/establishment/${localStorage.getItem("establishmentId")}`,
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		};
		axios(config)
		.then(function (response) {
			setOrderList(response.data);
			localStorage.setItem("orderList", JSON.stringify(response.data))
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
		<GridItem sm={12}>
			<GridItem sm={12} style={{ paddingTop: "30px", color: "black", textAlign: "-webkit-right"}}><h4 ><CollectionsBookmarkIcon /> <font>Click&Collect Orders: 13</font></h4></GridItem>
				<GridItem sm={12}>
					<GridContainer spacing={2} style={{ paddingTop: "30px" }}>
						{orderList.length!==0?orderList.map((element, i)=>{
						return (
							<GridItem sm={6} key={i}>
								<Card onClick={()=>handleClick(element)} style={element.state==="REQUESTED"?{fontSize: "16px", border: "1px solid #6f85ff"}:{fontSize: "16px"}}>
									<CardActionArea>
										<CardContent spacing={5}>
												<GridContainer >
													<GridItem sm={6} md={2} style={{ padding: "5px", textAlignLast: "center", fontSize: "16px" }}>{element.friendlyID}</GridItem>
													<GridItem sm={6} md={2} style={{ padding: "5px", textAlignLast: "center", fontSize: "16px"  }}>{element.time}</GridItem>
													<GridItem sm={6} md={3} style={{ padding: "5px", textAlignLast: "center", fontSize: "16px"  }}>{element.customerName}</GridItem>
													{
														(	// eslint-disable-next-line
															[].concat(element.state)).map((child, i)=>{
															switch (child) {
																case "REQUESTED":
																	return(<GridItem key={i} sm={6} md={3} style={request} >{element.state}</GridItem>)
																case "ACCEPTED":
																	return(<GridItem key={i} sm={6} md={3} style={accept}>{element.state}</GridItem>)
																case "COMPLETED":
																	return(<GridItem key={i} sm={6} md={3} style={complete}>{element.state}</GridItem>)
																case "CANCELLED":
																	return(<GridItem key={i} sm={6} md={3} style={cancel}>{element.state}</GridItem>)
																default:
																	break;
															}
														})

													}
													<GridItem sm={6} md={2} style={{ padding: "5px", textAlignLast: "center" }}>{element.total}(£)</GridItem>
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
