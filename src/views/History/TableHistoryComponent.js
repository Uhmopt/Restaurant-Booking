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
  { id: 'establishmentID', label: 'Establishment' },
  { id: 'customerID', label: 'User' },
  { id: 'tableNo', label: 'Table' },
  { id: 'state', label: 'Name' },
  { id: 'updates', label: 'Updates' },
  { id: 'time', label: 'Time' },
  { id: 'orders', label: 'Orders' },
  { id: 'total', label: 'Total' },
  { id: 'date', label: 'Date' },
  { id: 'lastModifiedBy', label: 'Modifier' },
];
function createData(tabsId, establishmentID, customerID, tableNo, state, updates, orders, total, date, lastModifiedBy) {
  tabsId = "tableId";
  establishmentID = "John's Pub";
  customerID = "JohnDae"
  return { tabsId, establishmentID, customerID, tableNo, state, updates, orders, total, date, lastModifiedBy };
}

  //Change seconds to time
  function secondsToHms(d) {

		var sec_num = Number(d) // don't forget the second param
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);
	
		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
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
      var tabList = {
        "id": "5efcd321feb41a4a162d7705",
        "establishmentID": "5efc9d4cbf73cb5fad5fcd36",
        "tabs": [
          {
            "id": "5efcd2eefeb41a4a162d7703",
            "establishmentID": "5efc9d4cbf73cb5fad5fcd36",
            "customerID": "5ee750990151944e48cf2b09",
            "tableNo": 7,
            "state": "CLOSED",
            "updates": [],
            "time": 1593961184,
            "orders": [],
            "total": 0,
            "createdDate": "2020-07-01T18:16:14.600+0000",
            "createdBy": "calum@futuredecisions.net",
            "lastModifiedDate": "2020-07-01T18:16:14.600+0000",
            "lastModifiedBy": "calum@futuredecisions.net"
          }
        ]
      }
      localStorage.setItem("tabList", JSON.stringify(tabList))
      // tabList = response.data                                     /////////////////////////////////////      this is the real
      setTableData();

  //   localStorage.getItem("establishmentId")
  //   var config = {
  //     method: 'get',
  //     url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/history/tab/establishment/5efc9d4cbf73cb5fad5fcd3',
  //     headers: { }
  //   };
  //   axios(config)
  //   .then(function (response) {
  //     alert()
      
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  }, []);


  function setTableData () {
    var data = JSON.parse(localStorage.getItem("tabList"))
    let fk_row = [];
      data.tabs.forEach(element => {
      fk_row.push( createData(JSON.stringify(element.id), element.establishmentID, element.customerID, element.tableNo, element.state, 
      (element.updates).toString(), (element.orders).toString(),element.total, (element.lastModifiedDate).substr(0, 10), element.lastModifiedBy))
    });
    fk_row = searchData(fk_row)
    console.log(fk_row)
    setRows(fk_row);
  }

  function searchData (data) {
    console.log(data, props.data.startDate, props.data.endDate);
    
    data= data.filter(function(item) {
      if (Date.parse( props.data.startDate) < Date.parse(item.date) && Date.parse(item.date) < Date.parse(props.data.endDate) ) {
        return true;
      } else {
        return false;
      }
    });
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
