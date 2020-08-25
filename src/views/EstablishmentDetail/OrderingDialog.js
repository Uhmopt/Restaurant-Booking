import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

import axios from 'axios';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [basket, setBasket] = React.useState([]);
  const [comments, setComments] = React.useState("");
  const [dateTime, setDateTime] = React.useState( "2020-08-08T22:22" );

  React.useEffect(()=>{
    setOpen(props.openState);
    setBasket(JSON.parse(localStorage.getItem("basket")));
  },[props])

  const handleClose = () => {
    props.onClose()
  };

  const handleSubmit = () => {
    var Id = localStorage.getItem("selectedEstablishmentId");
    if (localStorage.getItem("access_token")) {
      console.log(basket)
      let item = {};
      basket.forEach((element)=>{
        item[element.title] = element.mount
      })
      var data = {
        "establishmentID": Id,
        "items": item,
        "comments": comments,
        "total": caculateTotalPrice(basket),
        "time": (new Date(dateTime)).getTime() / 1000
      }
      

      var config = {
        method: 'post',
        url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/order/submit',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        toastr.success('Order booked successfully', 'Welcome');
        localStorage.setItem("basket", []);
      })
      .catch(function (error) {
        toastr.error('Error occured!', error);
        console.log(error);
      });
      props.onClose()
    } else {
      toastr.warning('Login firt please', 'Note');
    }
    
  };

  const handleDelete = (i) => {
    var fk_basket = [...basket];
    fk_basket.splice(i, 1);
    localStorage.setItem("basket", JSON.stringify(fk_basket));
    setBasket(fk_basket);
  };

  const caculateTotalPrice = (data) => {
    var total = 0;
    data.forEach(element => {
      total = total + Number(element.price) * Number(element.mount);
    });
    return (total);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
        <DialogTitle id="form-dialog-title">
          <GridContainer>
            <GridItem sm={1} style={{paddingTop: "4px", paddingLeft: "26px"}}><AddShoppingCartIcon /></GridItem>
            <GridItem sm={11}>Items</GridItem>
          </GridContainer>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Establishment Title: <span style={{fontWeight: "bold"}}>The Lynhert</span><br/>
            Order Address: <span style={{fontWeight: "bold"}}>White House, Washington, US, New York</span>
          </DialogContentText>
          

          <GridContainer style={{ padding: "20px 8px 17px", border: "1px solid #888", borderRadius: "9px", fontWeight: "400"}}>
            <GridItem sm={12}>
              <h4 style={{borderLeft: "4px solid #8bc34a", paddingLeft: "10px"}}>Menu Select</h4>
            </GridItem>
            {
              basket?
              basket.map((element, i)=>{

                return (
                  <GridContainer key={i}>
                    <GridItem sm={4}  style={{width:"100%", alignSelf: "center", fontSize: "24px" }}>
                      <TextField
                        id="standard-read-only-input"
                        label="MenuItem"
                        value={element.title}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{width: "100%"}}
                      />
                    </GridItem>

                    <GridItem sm={2}  style={{width:"100%", alignSelf: "center", fontSize: "24px" }}>
                      <TextField
                        id="standard-read-only-input"
                        label="Price"
                        value={element.price}
                        InputProps={{
                          readOnly: true,
                        }}
                        style={{width: "100%"}}
                      /> 
                      
                    </GridItem>

                    <GridItem sm={2} width="100%">
                      <TextField
                        id="standard-number"
                        label="Mount"
                        type="number"
                        value={Number(element.mount)}
                        width="100%"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{width: "100%"}}
                      />
                    </GridItem>
                    
                    <GridItem sm={2}  style={{width:"100%", alignSelf: "center", fontSize: "24px" }}>
                      <TextField
                          id="standard-read-only-input"
                          label="Total(£)"
                          value={Number(element.mount) *  Number(element.price)}
                          InputProps={{
                            readOnly: true,
                          }}
                          style={{width: "100%"}}
                      />
                    </GridItem>
                    
                    <GridItem sm={2} width="100%">
                      <Button color="inherit" size="medium" style={{marginTop: "7px"}} onClick={()=>handleDelete(i)}>
                          <DeleteIcon />
                      </Button>
                    </GridItem>
                  </GridContainer>
                )
              }):""
            }

       
                        
              
          </GridContainer>

          <GridContainer style={{marginTop: "20px"}}>
              <GridItem sm={4}>
                  <TextField
                      margin="dense"
                      id="name"
                      label="Comments"
                      type="text"
                      fullWidth
                      onChange={(e)=>setComments(e.target.value)}
                      multiline
                  />
              </GridItem>
              <GridItem sm={5}>
                  <TextField
                      id="datetime-local"
                      type="datetime-local"
                      style={{width: "220px", marginTop: "21px"}}
                      value={dateTime}
                      onChange={(e)=>setDateTime(e.target.value)}
                      InputLabelProps={{
                      shrink: true,
                      }}
                  />
              </GridItem>
              <GridItem sm={3}>
                  <h3 style={{marginLeft: "0px"}}>Total Price:{basket?caculateTotalPrice(basket):""}£</h3>
              </GridItem>
          </GridContainer>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
