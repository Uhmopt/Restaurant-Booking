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
  { id: 'tabsId', label: 'TabId' },
  { id: 'name', label: 'User' },
  { id: 'email', label: 'Emali' },
  { id: 'state', label: 'State' },
  { id: 'total', label: 'Total' }
];
function createData(tabsId, name, email, state, total) {
  return { tabsId, name, email, state, total };
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
  [props.data]);


	function initGetData () {
		var token = localStorage.getItem("access_token");
    localStorage.getItem("establishmentId")
    var config = {
      method: 'get',
      url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/history/tab/establishment/${localStorage.getItem("establishmentId")}?start=${props.data.startDate}&end=${props.data.endDate}`,
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    };
    axios(config)
    .then(function (response) {
      setTableData(response.data)
			localStorage.setItem("reservationHistory", JSON.stringify(response.data))
			setTableData()
    })
    .catch(function (error) {
      console.log(error);
    });
	}

  function setTableData (data) {
    let fk_row = [];
      data.tabs.forEach(element => {
      fk_row.push( createData(element.tableNo, element.customerName, element.customerEmail, element.state, element.total))
    });
    console.log(fk_row)
    fk_row = searchData(fk_row)
    console.log(fk_row)
    setRows(fk_row);
  }

  function searchData (data) {
    if (props.data.customer&&props.data.customer.length !== 0) 
    {
      if (data) {
        data= data.tabs.filter(function(item) {
          return item.customerName === props.data.customer
        });
      }
    }
    return (data);
  }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
