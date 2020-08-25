
import React from "react";
import "./styles.css";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import image1 from 'assets/img/upload-button-image.png';
import axios from 'axios';

class ImageUpload extends React.Component {
	constructor(props) {
		super(props);
		this.state = { file: "", imagePreviewUrl: "" };
	}

	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];
		console.log(file)
		reader.onloadend = () => {
			this.setState({
				file: file,
				imagePreviewUrl: reader.result
			});
		};

		reader.readAsDataURL(file);
		this.handleInsert();
	}

	handleDelete() {
		this.setState({ file: "", imagePreviewUrl: "" });
	}

	handleInsert() {
		var selectedMenu = JSON.parse(localStorage.getItem("selectedMenu"));
		var FormData = require('form-data');
		var data = new FormData();
		data.append('image', this.state.file);
		var config = {
			method: 'post',
			url: `https://ontab.co.uk/v1/menu/uploadPhoto/${selectedMenu.id}/${selectedMenu.sections[this.props.data.i].section_title}/${selectedMenu.sections[this.props.data.i].section_contents[this.props.data.j].item_title}`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("access_token")}`,
				'Content-Type': 'application/json'
			},
			data: data
		};

		console.log(config.url);

		axios(config)
			.then(function (response) {

			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		let { imagePreviewUrl } = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			// eslint-disable-next-line
			$imagePreview = <img src={imagePreviewUrl} />;
		} else {
			$imagePreview = (
				<div className="previewText">Please select an Image for Preview</div>
			);
		}

		return (
			<GridContainer>
				<GridItem sm={12}>
					<div className="previewComponent">
						<form onSubmit={e => this._handleSubmit(e)}>
							<GridContainer>
								<GridItem sm={8}>
									<div
										style={{
											backgroundImage: `url(${image1})`,
											backgroundRepeat: 'no-repeat',
											backgroundSize: 'contain',
											position: 'relative',
											height: '40px',
											marginLeft: '16px'
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
											onChange={(e) => this._handleImageChange(e)}
										/>
									</div>
								</GridItem>
								{
									this.state.imagePreviewUrl ?
										<GridItem sm={4} style={{ textAlignLast: "right" }}>
											<IconButton aria-label="delete" onClick={this.handleDelete}>
												<DeleteIcon fontSize="small" />
											</IconButton>
										</GridItem> : ""
								}

							</GridContainer>
						</form>
						<div className="imgPreview">{$imagePreview}</div>
					</div>
				</GridItem>

			</GridContainer>
		);
	}
}

export default ImageUpload;
