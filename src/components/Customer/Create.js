import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../api/conf";
import { postRequest } from '../../helpers/apiLexicon';
import InputGroup from '../partials/InputGroup';

class CreateCustomers extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    document: "",
    address: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)

    let newCustomer = {
      "name": this.state.name,
      "email": this.state.email,
      "phone": this.state.phone,
      "document": this.state.document,
      "address": this.state.address
    };
    
    const message = 'Cliente criado com sucesso.'
    postRequest('/customers', newCustomer, message)
      .then(()=> this.props.history.push("/customers"));

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
              Novo Cliente
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit.bind(this)} id="createCustomer">
              
            <InputGroup className="input-group col-md-5 mb-3"
                placeholder="Nome do cliente"
                onChange={this.handleChange.bind(this)}
                value={this.state.name}
                label="Nome"
                name="name"
                id="nameId"
                type="text"
                ><i class="fas fa-user-plus"></i>
              </InputGroup>
              
              <InputGroup className="input-group col-md-5 mb-3"
                placeholder="contato@email.com.br"
                onChange={this.handleChange.bind(this)}
                value={this.state.email}
                label="Email"
                name="email"
                id="emailId"
                type="email"
                ><i class="fas fa-at"></i>
              </InputGroup>

              <InputGroup className="input-group col-md-5 mb-3"
                placeholder=""
                onChange={this.handleChange.bind(this)}
                value={this.state.phone}
                label="Telefone"
                name="phone"
                id="phoneId"
                type="phone"
                ><i class="fas fa-mobile-alt"></i>
              </InputGroup>

              <InputGroup className="input-group col-md-5 mb-3"
                placeholder="Informe um Documento"
                onChange={this.handleChange.bind(this)}
                value={this.state.document}
                label="CPF / RG"
                name="document"
                id="documentId"
                type="document"
                ><i class="far fa-id-card"></i>
              </InputGroup>
              
              <InputGroup className="input-group col-md-5 mb-3"
                placeholder="R.Carlos Maranhão, 123, Centro."
                onChange={this.handleChange.bind(this)}
                value={this.state.address}
                label="Endereço"
                name="address"
                id="addressId"
                type="address"
                ><i class="fas fa-map-marked-alt"></i>
              </InputGroup>

              <button className="btn btn-primary" type="submit">
                Enviar
              </button>
              <a href="/customers" className="btn btn-secondary ml-1">Voltar</a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateCustomers);
