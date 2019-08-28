import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { putRequest } from '../../helpers/apiLexicon';
import SwalFire from '../../helpers/swalFire';
import api from "../../api/conf";
import InputGroup from '../partials/InputGroup';

class UpdateProvider extends Component {
  state = {
    name: "",
    address: "",
    document: "",
    phone: "",
    id: null
  };

  async componentDidMount() {
    try {
      const {
        match: { params }
      } = this.props;

    const res = await api.get(`/providers/${params.id}`);
      
    this.setState({
      name: res.data.name,
      address: res.data.address,
      document: res.data.document,
      phone: res.data.phone
    });

    } catch (e) { console.log(e) };
  };

  handleSubmit = e => {
    e.preventDefault();
    const { match: { params } } = this.props;

    if (!this.state.name || !this.state.address || !this.state.document || !this.state.phone) {
      window.confirm("Há espaços em branco, deseja prosseguir?");
    }

    const edited = {
      name: this.state.name,
      address: this.state.address,
      document: this.state.document,
      phone: this.state.phone
    }

    const url = `/providers/${params.id}`;
    const message = 'Dados atualizados.';
    putRequest(url, edited, message);
    this.props.history.push("/providers");
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
              Editando Fornecedor
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
              <a href="/providers" className="btn btn-secondary ml-1">Voltar</a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateProvider);
