import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import api from "../../api/conf";
import { postRequest } from '../../helpers/apiLexicon';
import InputGroup from '../partials/InputGroup';

class CreateProviders extends Component {
  state = {
    name: "",
    address: "",
    document: "",
    phone: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    let newProvider = {
      "name": this.state.name,
      "address": this.state.address,
      "document": this.state.document,
      "phone": this.state.phone
    };

    const message = `Fornecedor "${newProvider.name}" adicionado.`
    postRequest('/providers', newProvider, message)
      .then(()=> this.props.history.push("/providers"));
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container col-md-7">
        <div className="card shadow mb-4">
          <div className="card-header py-4">
            <h6 className="m-0 font-weight-bold text-primary">
              Novo Fornecedor
            </h6>
          </div>
          <div className="card-body">
          <form onSubmit={this.handleSubmit.bind(this)} id="updateProvider">
              <InputGroup
                className="input-group col-md-8 mb-3"
                label="Nome"
                type="text"
                name="name"
                placeholder="Nome"
                onChange={this.handleChange}
                value={this.state.name}
                ><i class="fas fa-truck-moving"></i>
              </InputGroup>
              <InputGroup
                className="input-group col-md-8 mb-3"
                type="text"
                name="address"
                label="Endereço"
                placeholder="Ex.: Rua Boa Vista, 123, Centro."
                onChange={this.handleChange}
                value={this.state.address}
                ><i class="fas fa-map-marked-alt"></i>
              </InputGroup>
              <InputGroup
                className="input-group col-md-8 mb-3"
                type="text"
                name="document"
                label="RG / CPF"
                placeholder="Documento"
                onChange={this.handleChange}
                value={this.state.document}
                ><i class="far fa-id-card"></i>
              </InputGroup>
              <InputGroup
                className="input-group col-md-5 mb-3"
                type="text"
                name="phone"
                label="Telefone"
                placeholder="Contato"
                onChange={this.handleChange}
                value={this.state.phone}
                ><i class="fas fa-mobile-alt"></i>
              </InputGroup>

              <button className="btn btn-primary" type="submit">
                Enviar
              </button>
              <Link to="/providers" className="btn btn-secondary ml-1">Voltar</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateProviders);
