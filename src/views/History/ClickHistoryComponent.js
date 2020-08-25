import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";

const columns = [
	{ id: 'orderId', label: 'OrderId' },
	{ id: 'state', label: 'State' },
	{ id: 'time', label: 'Time' },
	{ id: 'establishmentId', label: 'Establishment' },
	{ id: 'items', label: 'Items' },
	{ id: 'orderAddress', label: 'Address', minWidth: 230 },
	{ id: 'comments', label: 'Comments' },
	{ id: 'total', label: 'Total(£)' },
];

//Change seconds to time
function secondsToHms(d) {

	// unix timestamp
	var ts = d;

	// convert unix timestamp to milliseconds
	var ts_ms = ts * 1000;

	// initialize new Date object
	var date_ob = new Date(ts_ms);

	// year as 4 digits (YYYY)
	var year = date_ob.getFullYear();

	// month as 2 digits (MM)
	var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

	// date as 2 digits (DD)
	var date = ("0" + date_ob.getDate()).slice(-2);

	// hours as 2 digits (hh)
	var hours = ("0" + date_ob.getHours()).slice(-2);

	// minutes as 2 digits (mm)
	var minutes = ("0" + date_ob.getMinutes()).slice(-2);

	// seconds as 2 digits (ss)
	var seconds = ("0" + date_ob.getSeconds()).slice(-2);

	// date & time as YYYY-MM-DD hh:mm:ss format: 
	return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

}

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 650,
	},
});

export default function StickyHeadTable(props) {

	const [rows, setRows] = React.useState([]);
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	React.useEffect(() => {
		initGetData();
	}, 
	// eslint-disable-next-line
	[]);

	function initGetData() {
		var config = {
			method: 'get',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/history/order/user/${localStorage.getItem("establishmentId")}`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("access_token")}`,
				'Content-Type': 'application/json'
			}
		};

		axios(config)
			.then(function (response) {
				localStorage.setItem("orderHistory", JSON.stringify(response.data))
				let fk_row = [];

				if (response.data != null) {
					response.data.orders.forEach((element, i) => {
						fk_row.push(createData(element.friendlyID, element.state, secondsToHms(element.time), "element.establishmentName",
							(Object.entries(element.items)).toString(), element.orderAddress, element.comments, element.total))
					});
				}
				setRows(fk_row);
				
			})
			.catch(function (error) {
			});
	}

	// match the table data type
	function createData(orderId, state, time, establishmentId, items, orderAddress, comments, total) {
		establishmentId = "John's Pub";
		orderAddress = objectToString(orderAddress, 1)
		return { orderId, state, time, establishmentId, items, orderAddress, comments, total };
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	function objectToString(obj, v) {
		var string = "";
		if (v === 0) {
			for (const key in obj) {
				// eslint-disable-next-line
				string = string + key + ":" + " " + obj[key] + ", ";
			}
		} else {
			for (const key in obj) {
				// eslint-disable-next-line
				string = string + obj[key] + ", ";
			}
		}
		string = string.substr(0, string.length - 2);
		return string
	}

	return (
		<div>
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={i}>
										{columns.map((column, i) => {
											const value = row[column.id];
											return (
												<TableCell key={i} align={column.align}>
													{column.format && typeof value === 'number' ? column.format(value) : value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
