import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = { classColor: '' };

  }

  componentWillMount() {
    this.setColor(this.props.color);
  }

  setColor(color) {
    (color === 'primary') ? (this.setState({classColor: `card border-left-primary shadow h-100 py-2`})
    ):((color === 'secondary') ? (this.setState({classColor: `card border-left-secondary shadow h-100 py-2`})
    ):((color === 'danger') ? (this.setState({classColor: `card border-left-danger shadow h-100 py-2`})
    ):((color === 'warning') ? (this.setState({classColor: `card border-left-warning shadow h-100 py-2`})
    ):((color === 'success') ? (this.setState({classColor: `card border-left-success shadow h-100 py-2`})
    ):(this.setState({classColor: `card border-left-primary shadow h-100 py-2`}))))));
  }

    render() {
      
        return(
            <div className="col-xl-4 col-md-6 mb-4">
              <div className={this.state.classColor}>
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">{this.props.title}</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{this.props.info}</div>
                      <div className="h6 mb-0 font-weight-bold text-gray-800">{this.props.otherInfo}</div>
                    </div>
                    <div className="col-auto">
                      {this.props.icon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Card;