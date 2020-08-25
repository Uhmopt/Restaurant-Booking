import React, {Component} from 'react'
import QRCode from 'qrcode.react'


class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.data
        }
    }
    componentWillReceiveProps (newProps) {
        this.setState({value: newProps.data})
    }
  render() {
    return<div>
      <QRCode value={this.state.value} size={150}/>
    </div>
  }
}

export default Demo