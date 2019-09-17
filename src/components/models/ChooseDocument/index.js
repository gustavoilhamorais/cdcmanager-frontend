import React from "react";
import {
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";

export default class ChooseDocument extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "CNPJ",
      cpf: '',
      cnpj: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  toggle = () =>
    this.toggle
      ? this.setState({ toggle: false })
      : this.setState({ toggle: true });

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <InputGroup style={{marginTop: '4%'}}>
          <InputGroupText
            size="sm"
            onClick={() =>
              this.state.selected === "CNPJ"
                ? this.setState({ selected: "CPF" })
                : this.setState({ selected: "CNPJ" })
            }
          >
            {this.state.selected}
          </InputGroupText>
        {this.state.selected === "CNPJ" ? (
          <Input placeholder="CNPJ" name="cnpj" onChange={this.props.onChange} value={this.props.document} />
        ) : (
          <Input placeholder="CPF" name="cpf" onChange={this.props.onChange} value={this.props.document}/>
        )}
      </InputGroup>
    );
  }
}
