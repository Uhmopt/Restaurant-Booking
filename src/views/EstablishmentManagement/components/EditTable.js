import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
let tableData = [];
export default function MaterialTableDemo( props ) {
  React.useEffect(() => { 
    initialTable()
  }, [props.data]); 
  function initialTable() {
    const fk_state = []
    for( var key in props.data ){
      fk_state.push({
        table: key,
        cover: props.data[key]
      })
      setState(fk_state);
    }
  }
  
  const  columns = [
    { title: 'Tables', field: 'table' },
    { title: 'Covers', field: 'cover' }
  ];
  const [state, setState] = React.useState([]);

  function handleChange(tabledata) {
    let sendData = {};
    tabledata.map((element)=> {
      sendData[element.table] = element.cover
    })
    props.table(sendData)
  }

  function addTable (event) {
    tableData = [...state, event]
    handleChange(tableData)
  }

  function updateTable (event) {
    tableData = [...state]
    for (var i=0; i < tableData.length; i++) {
      if (tableData[i].table === event.oldData.table && tableData[i].cover === event.oldData.cover) {
          tableData[i].table = event.newData.table;
          tableData[i].cover = event.newData.cover;
      }
    }
    // setState(tableData);
    handleChange(tableData)

  }
  function removeTable (event) {
    tableData = [...state, event];
    tableData = tableData.filter(
        function( obj ) {
          return obj.table != event.table && obj.cover != event.cover;
        }
    );
    // setState(tableData);
    handleChange(tableData)
  }

  return (
    <MaterialTable
      title="Edit Tables"
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