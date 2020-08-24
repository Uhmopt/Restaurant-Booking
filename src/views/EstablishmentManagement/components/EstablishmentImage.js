import React from "react";
import ReactDOM from "react-dom";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import "./styles.css";
import image1 from 'assets/img/upload-button-image.png';
import axios from 'axios'
class ImageUpload extends React.Component {
	constructor(props) {
		super(props);
		this.state = { file: "", imagePreviewUrl: "" };
	}

	_handleImageChange(e) {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];

		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result
			});
		};

		reader.readAsDataURL(file);

		setTimeout(() => {
			this.props.image({
				file: file,
				imagePreviewUrl: reader.result
			});
		}, 300);



	}
	handleRemove = () => {
		this.setState({ file: "", imagePreviewUrl: "" });
		var axios = require('axios');

		var config = {
			method: 'delete',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/establishment/removeLogo/${JSON.parse(localStorage.getItem("establishment")).id}`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("access_token")}`,
				'Content-Type': 'application/json'
			},
		};

		axios(config)
			.then(function (response) {
				console.log(JSON.stringify(response.data));
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	handleUpload = () => {
		var FormData = require('form-data');
		var fs = require('fs');
		var data = new FormData();
		data.append('image', this.state.file);
		var establishment = JSON.parse(localStorage.getItem("establishment"));
		var config = {
			method: 'post',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/establishment/uploadLogo/${establishment.id}`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("access_token")}`,
				'Content-Type': 'application/json'
			},
			data: data
		};

		axios(config)
			.then(function (response) {
				this.setState({
					imagePreviewUrl: response.data.logoUrl
				});
			})
			.catch(function (error) {
			});
	}
	render() {
		let { imagePreviewUrl } = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = <img src={imagePreviewUrl} />;
		} else {
			$imagePreview = (
				<div className="previewText">Restaruant Image</div>
			);
		}

		return (
			<GridContainer>
				<GridItem sm={12} >
					<div className="previewComponent">

						<GridContainer>
							<GridItem sm={6}>
								<form onSubmit={e => this._handleSubmit(e)}>
									<div
										style={{
											backgroundImage: `url(${image1})`,
											backgroundRepeat: 'no-repeat',
											backgroundSize: 'contain',
											position: 'relative',
											height: '40px',
										}}
									>
										<input
											className="fileInput"
											type="file"
											style={{
												width: '40%',
												opacity: 0,
												position: "relative"
											}}
											accept="image/*"
											capture="camera"
											onChange={e => this._handleImageChange(e)}
										/>
									</div>
								</form>
							</GridItem>
							{
								this.state.imagePreviewUrl ?
									<GridItem sm={6} style={{ textAlign: "-webkit-right" }}>
										<Button
											style={{
												paddingTop: "8px",
												boxSizing: "content-box",
												backgroundColor: "#3e52bd"
											}}
											onClick={this.handleUpload}
											variant="contained"
											color="primary"
											endIcon={<Icon>send</Icon>}
										>
											Upload
									</Button>
									<Button
										style={{
											marginLeft: "6px",
											padding: "8px",
											boxSizing: "content-box"
										}}
										onClick={this.handleRemove}
										variant="contained"
										color="secondary"
										startIcon={<DeleteIcon />}
									>
											Delete
									</Button>

									</GridItem> : ""

							}
						</GridContainer>
						<GridContainer>
							<div className="imgPreview">{$imagePreview}</div>
						</GridContainer>

					</div>
				</GridItem>
			</GridContainer>
		);
	}
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ImageUpload />, rootElement);
export default ImageUpload;
