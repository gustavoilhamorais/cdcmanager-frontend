import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../api/conf";
import { putRequest } from "../../helpers/apiLexicon";
import InputGroup from '../partials/InputGroup';
import ReactSuggest from "../../helpers/ReactSuggest";

class UpdateMerchan extends Component {
  state = {
    category: "",
    sellValue: "",
    buyValue: "",
    status: "",
    code: "",
    id: null
  };

  async componentDidMount() {
    try {
      const {
        match: { params }
      } = this.props;

    const res = await api.get(`/merchandise/${params.id}`);
      
    this.setState({
      category: res.data.category,
      sellValue: res.data.sellValue,
      buyValue: res.data.buyValue,
      status: res.data.status,
      code: res.data.code
    });

    } catch (e) { console.log(e) };
  };

  handleSubmit = e => {
    e.preventDefault();
    const { match: { params } } = this.props;

    if (!this.state.category || !this.state.sellValue || !this.state.buyValue || !this.state.status) {
      window.confirm("Há espaços em branco, deseja prosseguir?");
    }

    const edited = {
      category: this.state.category,
      sellValue: this.state.sellValue,
      buyValue: this.state.buyValue,
      status: this.state.status,
      code: this.state.code
    }

    const url = `/merchandise/${params.id}`;
    const message = 'Mercadoria atualizada.';
    putRequest(url, edited, message);
    this.props.history.push("/merchans");
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
              Editando Mercadoria
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit.bind(this)} id="updateCustomer">

              <ReactSuggest className="input-group col-md-7 mb-3"
                placeholder="Busque uma categoria"
                icon={<i class="fas fa-search"></i>}
                onChange={this.handleChange.bind(this)}
                value={this.state.value}
                label="Categoria"
                name="category"
                id="categoryID"
                type="text"
                url="/categories"/>

              <InputGroup className="input-group col-md-4 mb-3"
                placeholder="Valor de venda"
                onChange={this.handleChange.bind(this)}
                value={this.state.sellValue}
                label="Valor de venda R$"
                name="sellValue"
                id="sellValueID"
                type="number" min="0.00" max="100.000,00" step="0.01"
                ><i class="fas fa-money-bill-wave"></i>
              </InputGroup>
              
              <InputGroup className="input-group col-md-4 mb-3"
                placeholder="Valor de compra"
                onChange={this.handleChange.bind(this)}
                value={this.state.buyValue}
                label="Valor de compra R$"
                name="buyValue"
                id="buyValueID"
                type="number" min="0.00" max="100.000,00" step="0.01"
                ><i class="fas fa-file-invoice-dollar"></i>
              </InputGroup>

              <InputGroup className="input-group col-md-6 mb-3"
                placeholder="Valor de Compra"
                onChange={this.handleChange.bind(this)}
                value={this.state.code}
                label="Código da Mercadoria"
                name="code"
                id="codeID"
                type="number"
                ><i class="fas fa-barcode"></i>
              </InputGroup>

              <button className="btn btn-primary" type="submit">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateMerchan);
