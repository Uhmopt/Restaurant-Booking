import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridContainer from "components/Grid/GridContainer.js";
import Switch from '@material-ui/core/Switch';
import GridItem from "components/Grid/GridItem.js";

export default function FormDialog(props) {
	const [content, setContent] = React.useState({});
	const [open, setOpen] = React.useState(false);
	const [mount, setMount] = React.useState(0);
	const [price, setPrice] = React.useState(0);

	React.useEffect(() => {
		localStorage.setItem("basket", JSON.stringify([]));
	}, []);

	React.useEffect(() => {
		setContent(props.data);
		setOpen(props.childOpen)
	}, [props]);

	function handleAdd () {
		var basket = localStorage.getItem("basket");
		basket = (basket) ? JSON.parse(basket) : [];
		console.log(basket);
		basket.push({
			title: content.item_title,
			price: content.item_price,
			mount: mount
		})
		localStorage.setItem("basket",JSON.stringify(basket));
		setMount(0);
		setPrice(0);
		handleClose();
		props.count();
	};

	function handleClose () {
		props.closeDig();
	};

	function handleChange (e) {
		if (e.target.value >= 0) {
			setMount(e.target.value);
			setPrice(e.target.value * content.item_price);
		}

	};
  return (
	<div>
	  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth='sm'>
		<DialogTitle id="form-dialog-title">Item</DialogTitle>
		<DialogContent>
			<GridContainer>
				<GridItem sm={7}>
					<TextField
						margin="dense"
						id="name"
						label="Comments"
						InputProps={{
							readOnly: true,
						}}
						type="text"
						fullWidth
						value={content.item_title}
						multiline
					/>
				</GridItem>
				<GridItem sm={2}>
					<TextField
						id="itemNum"
						type="number"
						style={{width: "100%", marginTop: "21px"}}
						onChange={handleChange}
						value={mount}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</GridItem>
				<GridItem sm={3}>
					<h4 style={{ marginTop: "29px", fontWeight: "500"}}>Price: {price}$</h4>
				</GridItem>
				<GridItem sm={6}>
					<GridContainer>
						<GridItem sm={8} xs={6}>
							<h5 style={{fontSize: "15px",fontWeight: "bold", marginBottom: "0"}}>Gluten Free:</h5>
						</GridItem>
						<GridItem sm={4} xs={6}>
							<Switch
								checked={content.gluten_free}
								color="primary"
								name="gluten_free"
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem sm={6}>
					<GridContainer>
						<GridItem sm={8} xs={6}>
							<h5 style={{fontSize: "15px",fontWeight: "bold", marginBottom: "0"}}>Vegetarian:</h5>
						</GridItem>
						<GridItem sm={4} xs={6}>
							<Switch
								checked={content.vegetarian}
								color="primary"
								name="vegetarian"
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem sm={6}>
					<GridContainer style={{marginTop: "28px"}}>
						<GridItem sm={8} xs={6}>
							<h5 style={{fontSize: "15px",fontWeight: "bold", marginBottom: "0"}}>Organic:</h5>
						</GridItem>
						<GridItem sm={4} xs={6}>
							<Switch
								checked={content.organic}
								color="primary"
								name="organic"
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
						</GridItem>
					</GridContainer>
				</GridItem>
				<GridItem sm={6}>
					<GridContainer style={{marginTop: "28px"}}>
						<GridItem sm={8} xs={6}>
							<h5 style={{fontSize: "15px",fontWeight: "bold", marginBottom: "0"}}>Locally Sourced:</h5>
						</GridItem>
						<GridItem sm={4} xs={6}>
							<Switch
								checked={content.locally_sourced}
								color="primary"
								name="locally_sourced"
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
						</GridItem>
					</GridContainer>
				</GridItem>
			</GridContainer>
		</DialogContent>
		<DialogActions>
		  <Button onClick={handleClose} color="primary">
			Cancel
		  </Button>
		  <Button onClick={handleAdd} color="primary">
			Add Cart
		  </Button>
		</DialogActions>
	  </Dialog>
	</div>
  );
}
