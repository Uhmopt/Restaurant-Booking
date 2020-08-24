import React from "react";
import { render } from "react-dom";
import Button from '@material-ui/core/Button';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';

class App extends React.Component {
  state = {
    rows: [{}]
  };
  handleChangeTable = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value
    };
    console.log(e.target);
    this.setState({
      rows
    });
  };
  handleAddRow = () => {
    const item = {
      name: "",
      mobile: ""
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  };
  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1)
    });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 column">
                <GridContainer style={{ padding: "20px 8px 17px", border: "1px solid #888", borderRadius: "9px"}}>
                    <GridItem sm={12}>
                        <h4 style={{borderLeft: "4px solid #8bc34a", paddingLeft: "10px"}}>Menu Select</h4>
                    <table
                        className="table table-bordered table-hover"
                        style={{width: "100%", padding: "15px", border: "1px solid #a6a6a6", borderRadius: "8px"}}
                        id="tab_logic"
                    >
                        <thead>
                        <tr>
                            <th align="center" style={{fontWeight:"100"}}>Item List</th>
                            <th align="center" style={{fontWeight:"100"}}>Amount</th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.rows.map((item, idx) => (
                            <tr id="addr0" key={idx}>
                            <td style={{padding: "14px"}}>
                                <div>
                                    <FormControl autoFocus>
                                        <Select defaultValue="" id="grouped-select"style={{width: "200px"}}>
                                            <ListSubheader>Menu 1</ListSubheader>
                                                <MenuItem value={1}><GridContainer><GridItem sm={8}>The Soup</GridItem><GridItem sm={4}>2$</GridItem></GridContainer></MenuItem>
                                                <MenuItem value={1}><GridContainer><GridItem sm={8}>Buger</GridItem><GridItem sm={4}>5$</GridItem></GridContainer></MenuItem>
                                            <ListSubheader>Menu 2</ListSubheader>
                                                <MenuItem value={1}><GridContainer><GridItem sm={8}>The Soup</GridItem><GridItem sm={4}>2$</GridItem></GridContainer></MenuItem>
                                                <MenuItem value={1}><GridContainer><GridItem sm={8}>Buger</GridItem><GridItem sm={4}>5$</GridItem></GridContainer></MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </td>
                            <td style={{padding: "14px"}}>
                                <TextField
                                id="standard-number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                            </td>
                            <td>
                            <Button color="inherit" size="medium" onClick={this.handleRemoveSpecificRow(idx)} style={{marginTop: "7px"}}>
                                <DeleteIcon />
                            </Button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <GridContainer style={{marginTop: "15px"}}>
                        <GridItem sm={7} style={{paddingLeft: "0px",paddingRight: "8px"}}>
                            <Button variant="outlined" color="primary" onClick={this.handleAddRow} style={{width: "100%"}}>
                                Add Item
                            </Button>
                        </GridItem>
                        <GridItem sm={5} style={{paddingLeft: "7px", paddingRight: "0px"}}>
                            <Button variant="outlined" color="inherit" onClick={this.handleRemoveRow} style={{width: "100%"}}>
                            Delete Last Row
                            </Button>
                        </GridItem>
                    </GridContainer>
                    </GridItem>
                </GridContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
export default App;