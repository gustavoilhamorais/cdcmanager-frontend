import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { postRequest } from "../../helpers/apiLexicon";
import ReactSuggest from "../../helpers/ReactSuggest";
import MerchandiseList from '../Merchan/MerchandiseList';

class CreateSales extends Component {
  state = {
    customer: "",
    merchan: "",
    discount: "",
    value: 0,
    observations: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { customer, merchan, discount, value, observations } = this.state;
    let newSale = {
      customer: customer,
      merchan: merchan,
      discount: discount,
      value: value,
      observations: observations
    };
    postRequest("/sales", newSale).then(status => {
      if (status) this.props.history.push("/sales");
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  callback(props) {
    this.setState({ value: props.total, merchan: props.value });
  }

  discount(e) {
    this.setState({ discount: e.target.value });
    const percent = e.target.value;
    const discount = Number(percent) * Number(this.state.value);
    const value = Number(this.state.value) - Number(discount);
    this.setState({ value: value });
  }

  render() {
    return (
      <div className="container col-md-7">
        <div className="card shadow mb-4">
          <div className="card-header py-4">
            <h6 className="m-0 font-weight-bold text-primary">Nova Venda</h6>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit.bind(this)} id="createSale">
              <label className="form-label font-weight-bold">Cliente</label>
              <ReactSuggest
                className="input-group col-md-8 mb-3"
                name="customer"
                icon={<i class="fas fa-user-tie" />}
                type="text"
                placeholder="Buscar Cliente . . ."
                onChange={this.handleChange.bind(this)}
                url="/customers"
                value=""
                id=""
              />
              <MerchandiseList callback={(total, value)=> this.callback(total, value)}/>

              <label className="form-label font-weight-bold">Valor</label>
              <div className="input-group col-md-4 mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i class="fas fa-money-bill-wave" />
                  </span>
                  <span className="input-group-text">R$</span>
                </div>
                <input
                  className="form-control"
                  name="value"
                  placeholder="0"
                  type="number"
                  min="0.00"
                  max="100.000,00"
                  step="0.01"
                  onChange={this.handleChange}
                  value={this.state.value}
                />
              </div>
              <label className="form-label font-weight-bold">Desconto</label>
              <div className="input-group col-md-4 mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    {this.state.discount || 0.0}
                  </span>
                  <span className="input-group-text">
                    <i class="fas fa-percent" />
                  </span>
                </div>
                <input
                  className="form-control"
                  name="discount"
                  placeholder="0.00"
                  type="number"
                  min="0.00"
                  max="1.0"
                  step="0.01"
                  onChange={this.discount.bind(this)}
                  value={this.state.discount}
                />
              </div>
              <label className="form-label font-weight-bold">Observações</label>
              <div class="input-group col-md-8 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-quote-right" />
                  </span>
                </div>
                <textarea
                  className="form-control"
                  type="text"
                  name="observations"
                  placeholder="Observações . . ."
                  onChange={this.handleChange}
                  value={this.state.observations}
                />
              </div>

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

export default withRouter(CreateSales);
