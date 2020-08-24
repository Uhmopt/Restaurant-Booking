import React from "react";
import { render } from "react-dom";
import Button from '@material-ui/core/Button';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import DeleteIcon from '@material-ui/icons/Delete';

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
                                  
                        <Button color="inherit" size="medium" style={{marginTop: "7px"}}>
                            <DeleteIcon />
                        </Button>
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