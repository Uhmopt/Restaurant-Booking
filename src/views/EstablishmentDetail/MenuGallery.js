import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import gluten_free from "assets/img/menu/gluten_free.svg";
import vegetarian from "assets/img/menu/vegetarian.svg";
import locally_sourced from "assets/img/menu/locally_sourced.svg";
import organic from "assets/img/menu/organic.svg";
import AddDialog from './AddDialog.js';
import image1 from "assets/img/establishment gallery/1.jpg";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	content: {
		flex: '1 0 auto',
	},
	cover: {
		width: 151,
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	playIcon: {
		height: 38,
		width: 38,
	},
}));

export default function MediaControlCard(props) {
	const [content, setContent] = React.useState({})
	const[ open, setOpen ] = React.useState(false)
	const classes = useStyles();

	React.useEffect(() => {
		setContent(props.data);
	}, [props.data]);

	function handleDialog () {
		setOpen(true);
	}
	function handleCount () {
		props.count()
	  }
	function closeDialog () {
		setOpen(false);	
	}

	return (
		<div>
		<Card className={classes.root} onClick={handleDialog}>
			<div className={classes.details} style={{width: "70%"}}>
				<CardContent className={classes.content}>
					<Typography component="h6" variant="h6">
						{content.item_title}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary" style={{fontSize: "14px"}}>
						{content.item_desc}
					</Typography>
					<ul style={{listStyleType: "none", margin: "0", padding: "0"}}>
						<li style={{float: "left"}}>
						<Typography component="h6" variant="h6">
							{content.item_price}£
						</Typography>
					</li>
						{
							content.gluten_free?
							<li style={{float: "right", paddingLeft: "6px"}}>
								<Tooltip title="Gluten Free" placement="top" arrow>
									{/* eslint-disable-next-line */}
									<img src={gluten_free}  width="30"/>
								</Tooltip>
							</li>:""
						}
												{
							content.vegetarian?
							<li style={{float: "right", paddingLeft: "6px"}}>
								<Tooltip title="Vegetarian" placement="top" arrow>
									{/* eslint-disable-next-line */}
									<img src={vegetarian}  width="30"/>
								</Tooltip>
							</li>:""
						}
												{
							content.locally_sourced?
							<li style={{float: "right", paddingLeft: "6px"}}>
								<Tooltip title="Locally Sourced" placement="top" arrow>
									{/* eslint-disable-next-line */}
									<img src={locally_sourced}  width="30"/>
								</Tooltip>
							</li>:""
						}
						{
							content.organic?
							<li style={{float: "right", paddingLeft: "6px"}}>
								<Tooltip title="Organic" placement="top" arrow>
									{/* eslint-disable-next-line */}
									<img src={organic}  width="30"/>
								</Tooltip></li>:""
						}
					</ul>
				</CardContent>
			</div>
			<CardMedia
				className={classes.cover}
				image={image1}
				style={{width: "30%"}}
				title="Live from space album cover"
			/>
		</Card>
		<AddDialog childOpen={open} data={content} closeDig={closeDialog} count={handleCount}/>
		</div>
	);
}
