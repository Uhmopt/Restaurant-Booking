import * as React from "react";
import { TagsSelect } from "react-select-material-ui";
import axios from "axios"

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cuisines: null,
		}
		this.initGetData = this.initGetData.bind(this);

	}
	componentDidMount() {
		this.initGetData();
	}

	handleChange = (values) => {
		this.props.data(values);
	};

	initGetData = () => {
		var config = {
			method: 'get',
			url: 'https://cors-anywhere.herokuapp.com/https://ontab.co.uk/v1/preset/cuisines',
			headers: {}
		};

		axios(config)
			.then(async function (response) {
				this.setState({ cuisines: response.data })
			}.bind(this))
			.catch(function (error) {
			});
	}

	render() {
		return (
			<>
				<div className="App">
					<TagsSelect
						label="Cuisines"
						options={this.state.cuisines}
						values={this.props.val}
						onChange={this.handleChange}
						SelectProps={{
							isCreatable: true,
							msgNoOptionsAvailable: "All tags are selected",
							background: "#444",
							msgNoOptionsMatchFilter: "No tag matches the filter",
						}}
					/>
				</div>
			</>
		);
	}

}

export default App;