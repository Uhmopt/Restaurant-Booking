/*eslint-disable*/
import React, { useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import RoomServiceIcon from '@material-ui/icons/RoomService';
import PublishIcon from '@material-ui/icons/Publish';
import PersonIcon from '@material-ui/icons/Person';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import { Link, useHistory } from "react-router-dom";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
	const history = useHistory();
	const classes = useStyles();
	const [user_token, setToken] = useState("")
	const [username, setUsername] = useState("")

	const [authority] = React.useState(localStorage.getItem("authority"));
	useEffect(() => {
		if (localStorage.getItem('access_token')) {
			setToken(localStorage.getItem('access_token'));
			setUsername(localStorage.getItem('username'));
		}
	}, []);

	function logout() {
		localStorage.clear();
	}

	return (
		<List className={classes.list}>
			{
				authority == "CUSTOMER" || authority == null?
					<ListItem className={classes.listItem}>
						<Button onClick={() => history.push("/main-page")} color="transparent" className={classes.navLink}><Apps />Main Page</Button>
					</ListItem> : ""
			}

			{
				authority == "CUSTOMER" || authority == null?
				<ListItem className={classes.listItem}>
					<Button onClick={() => history.push("/service-page")} color="transparent" className={classes.navLink}><RoomServiceIcon />Service Page</Button>
				</ListItem>:""
			}


			{
				authority == "MANAGER" || authority == "STAFF" ?
					<ListItem className={classes.listItem}>
						<Button onClick={() => history.push("/establishment-management")} color="transparent" className={classes.navLink}><PublishIcon />Establishment</Button>
					</ListItem> : ""
			}
			{
				user_token.length == 0 ?
					<ListItem className={classes.listItem}>
						<Button onClick={() => history.push("/user-login")} color="transparent" className={classes.navLink}><PersonIcon />User Login</Button>
					</ListItem>
					:
					authority=="CUSTOMER"?
					<ListItem className={classes.listItem}>
						<CustomDropdown
							noLiPadding
							hoverColor="warning"
							buttonText={username}
							buttonProps={{
								className: classes.navLink,
								color: "transparent"
							}}
							style={{ textTransform: "capitalize" }}
							buttonIcon={AccountCircleIcon}
							dropdownList={[
								<Link to="/history" className={classes.dropdownLink}>
									History
								</Link>,
								<Link to="/user-login" className={classes.dropdownLink} onClick={logout}>
									Log Out
							</Link>
							]}
						/>
					</ListItem>:
					<ListItem className={classes.listItem}>
						<CustomDropdown
							noLiPadding
							hoverColor="warning"
							buttonText={username}
							buttonProps={{
								className: classes.navLink,
								color: "transparent"
							}}
							style={{ textTransform: "capitalize" }}
							buttonIcon={AccountCircleIcon}
							dropdownList={[
								<Link to="/user-login" className={classes.dropdownLink} onClick={logout}>
									Log Out
								</Link>
							]}
						/>
					</ListItem>
			}
		</List>
	);
}
