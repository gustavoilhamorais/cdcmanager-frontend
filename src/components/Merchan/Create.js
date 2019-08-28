import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { postRequest } from "../../helpers/apiLexicon"
import InputGroup from '../partials/InputGroup';
import ReactSuggest from "../../helpers/ReactSuggest";
import { SwalFire } from "../../helpers/swalFire";

class CreateMerchans extends Component {
  constructor(props){
    super(props);

    this.state = {
      code: null,
      category: "",
      buyValue: null,
      sellValue: null,
      autoBecomeAvailable: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.switchKey = this.switchKey.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let newMerchan = {
      "category": this.state.category,
      "sellValue": this.state.sellValue,
      "buyValue": this.state.buyValue,
      "code": this.state.code,
      "autoBecomeAvailable": this.state.autoBecomeAvailable
    };
    const response = postRequest('/merchandise', newMerchan);
    if (response !== undefined) {
      if (response ===  true) this.props.history.push('/merchandise');
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  switchKey() {
    if(this.state.autoBecomeAvailable === true) {
      this.setState({ autoBecomeAvailable: false });
    }
    else this.setState({ autoBecomeAvailable: true });
  }

  render() {
    return (
      <div className="container col-md-7">
        <div className="card shadow mb-4">
          <div className="card-header py-4">
            <h6 className="m-0 font-weight-bold text-primary">
              Nova Mercadoria
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit} id="createMerchan">
              <div className="form-body">
              
              <ReactSuggest className="input-group col-md-7 mb-3"
                placeholder="Busque uma categoria"
                icon={<i class="fas fa-search"></i>}
                onChange={this.handleChange}
                value={this.state.value}
                label="Categoria"
                name="category"
                id="category"
                type="text"
                url="/categories"/>

              <InputGroup className="input-group col-md-5 mb-3"
                placeholder="Valor de venda"
                onChange={this.handleChange}
                value={this.state.sellValue}
                label="Valor de venda R$"
                name="sellValue"
                id="sellValue"
                type="text"
                ><i class="fas fa-money-bill-wave"></i>
              </InputGroup>
              
              <InputGroup className="input-group col-md-5 mb-3"
                placeholder="Valor de compra"
                onChange={this.handleChange}
                value={this.state.buyValue}
                label="Valor de compra R$"
                name="buyValue"
                id="buyValueID"
                type="text"
                ><i class="fas fa-file-invoice-dollar"></i>
              </InputGroup>

              <InputGroup className="input-group col-md-6 mb-5"
                placeholder="Códgo de Barras"
                onChange={this.handleChange}
                value={this.state.code}
                label="Código da Mercadoria"
                name="code"
                id="codeID"
                type="number"
                ><i class="fas fa-barcode"></i>
              </InputGroup>

              <div className="custom-control custom-switch ml-3 mb-3">
                <input className="custom-control-input"
                  onClick={this.switchKey}
                  type="checkbox"
                  id="switch1" 
                />
                <label className="custom-control-label" for="switch1">Automatizar saídas e entradas deste produto no estoque.</label>
              </div>

              <button
                className="btn btn-primary mt-3"
                type="submit"
                >Enviar
              </button>
              <Link to="/merchans" className="btn btn-secondary mt-3 ml-1">Voltar</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateMerchans);
