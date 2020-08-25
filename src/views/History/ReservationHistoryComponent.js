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
	{ id: 'reserveId', label: 'ReserveId' },
	{ id: 'establishmentID', label: 'Establishment' },
	{ id: 'tableID', label: 'Table' },
	{ id: 'covers', label: 'Covers' },
	{ id: 'reservationTime', label: 'Time' },
	{ id: 'state', label: 'State' }
];
function createData(reserveId, establishmentID, tableID, covers, reservationTime, state) {
	reserveId = "reserveId";
	establishmentID = "John's Pub";
	return { reserveId, establishmentID, tableID, covers, reservationTime, state };
}
//Change seconds to time
function secondsToHms(d) {

	var sec_num = Number(d) // don't forget the second param
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (hours < 10) { hours = "0" + hours; }
	if (minutes < 10) { minutes = "0" + minutes; }
	if (seconds < 10) { seconds = "0" + seconds; }
	return hours + ':' + minutes;
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

	React.useEffect(() => {
		initGetData();
	}, 
	// eslint-disable-next-line
	[]);
	React.useEffect(() => {
		console.log(props.data, "this is the props")
		setTableData();
	}, [props]);

	function initGetData() {
		var token = localStorage.getItem("access_token");
		localStorage.getItem("establishmentId")
		var config = {
			method: 'get',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/history/reservation/user/5f3707e4a01aff7cf14ab6d7`,
			headers: {
				"Authorization": `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
		};
		axios(config)
			.then(function (response) {
				setTableData(response.data)
				localStorage.setItem("reservationHistory", JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	function setTableData(data) {
		let fk_row = [];
		if (!data) return [];
		if (data.length !== 0) {
			data.reservations.forEach(element => {
				fk_row.push(createData(element.tableID, element.establishmentName, element.tableID,
					element.covers, secondsToHms(element.reservationTime), element.state))
			});
			// fk_row = searchData(fk_row)
		}

		setRows(fk_row);
	}
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	// function searchData(data) {
	// 	data = data.filter(function (item) {
	// 		if (Date.parse(props.data.startDate) < Date.parse(item.lastModifiedDate) && Date.parse(item.lastModifiedDate) < Date.parse(props.data.endDate)) {
	// 			return true;
	// 		} else {
	// 			return false;
	// 		}
	// 	});
	// 	return (data);
	// }

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

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
