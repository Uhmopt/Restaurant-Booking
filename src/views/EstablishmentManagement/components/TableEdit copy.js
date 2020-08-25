
import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';
let tableData = [];
export default function MaterialTableDemo( props ) {
  const  columns = [
    { title: 'Day', field: 'day',  type: 'date' },
    { title: 'Start', field: 'start',  type: 'time' },
    { title: 'End', field: 'end',  type: 'time' }
  ];
  const [state, setState] = React.useState([]);

  function handleChange(tabledata) {
    let day = [];
    let start = [];
    let end = [];
    for(let i=0; i<tabledata.length; i++) {
      let xx;
      let yy;
      xx = tabledata[i].start.toISOString().substr(0,10);
      yy = tabledata[i].end.toISOString().substr(0,10);
      day[i] = tabledata[i].day.toISOString().substr(0,10);
      start[i] = tabledata[i].start.getTime() - new Date(xx).getTime();
      end[i] = tabledata[i].end.getTime() - new Date(yy).getTime();
    }
    props.specialDay(tabledata)
  }

  function addTable (event) {
    tableData = [...tableData, event];
    setState(tableData);
    handleChange(tableData)

  }
  function updateTable (event) {
    for (var i=0; i < tableData.length; i++) {
      if (tableData[i].day === event.oldData.day) {
          tableData[i].day = event.newData.day;
          tableData[i].start = event.newData.start;
          tableData[i].end = event.newData.end;
      }
    }
    setState(tableData);
    handleChange(tableData)

  }
  function removeTable (event) {

    tableData = tableData.filter(function( obj ) {
      return obj.day != event.day;
    });
    setState(tableData);
    handleChange(tableData)

  }

  return (
    <MaterialTable
      title="Special day"
      columns={columns}
      data={state}
      editable={{
        onRowAdd: (newData) => 
          new Promise((resolve) => {
            resolve();
            addTable( newData )
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            resolve();
            updateTable( {newData, oldData} );
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            resolve();
            removeTable( oldData );
          }),
      }}
    />
  );
}