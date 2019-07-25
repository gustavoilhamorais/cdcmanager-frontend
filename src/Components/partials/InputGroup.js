import React, { Component, Fragment } from 'react';

export default class InputGroup extends Component {  
  render() {
    return(
      <Fragment>
        <label for={this.props.id}>{this.props.label}</label>
        <div className={this.props.className}>
          <div className="input-group-prepend">
            <span className="input-group-text" id={this.props.id}>{this.props.children}</span>
          </div>
          <input className="form-control"
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
            value={this.props.value}
            name={this.props.name}
            type={this.props.type}
            id={this.props.id}/>
        </div>
      </Fragment>
    );
  };
}
