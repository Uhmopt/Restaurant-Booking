
import React from "react";
import "./styles.css";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import image1 from 'assets/img/upload-button-image.png';
import axios from 'axios';

// toastr
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'


class ImageUpload extends React.Component {

	constructor(props) {
		super(props);
		this.state = { file: "", imagePreviewUrl: this.props.url && this.props.url !== "" ? this.props.url.replace("<sizeHere>", "desktop") : this.props.url };
		this.handleDelete = this.handleDelete.bind(this);
		this._handleImageChange = this._handleImageChange.bind(this);
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

		var selectedMenu = JSON.parse(localStorage.getItem("selectedMenu"));
		var FormData = require('form-data');
		var data = new FormData();
		data.append('image', file);
		var config = {
			method: 'post',
			url: `https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/menu/uploadPhoto/${selectedMenu.id}/${selectedMenu.sections[this.props.data.i].section_title}/${selectedMenu.sections[this.props.data.i].section_contents[this.props.data.j].item_title}`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("access_token")}`,
				'Content-Type': 'application/jso '
			},
			data: data
		};

		axios(config)
			.then((response) => {
				toastr.success('Image uploaded successfuly!', 'success');
				this.props.onUpload(response.data.sections[this.props.data.i].section_contents[this.props.data.j].photoURL);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	handleDelete() {
		var selectedMenu = JSON.parse(localStorage.getItem("selectedMenu"));
		let sectionTitle = selectedMenu.sections[this.props.data.i].section_title;
		let itemTitle = selectedMenu.sections[this.props.data.i].section_contents[this.props.data.j].item_title;
		this.props.onDelete(selectedMenu.id, sectionTitle, itemTitle );
	}

	render() {
		// let { imagePreviewUrl } = this.state.imagePreviewUrl;
		let $imagePreview = null;
		if (this.state.imagePreviewUrl) {
			// eslint-disable-next-line
			$imagePreview = <img src={this.state.imagePreviewUrl} alt="" />;
		} else {
			$imagePreview = (
				<div className="previewText">Select an Image</div>
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
