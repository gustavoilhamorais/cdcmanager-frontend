import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { postRequest } from '../../helpers/apiLexicon';
import ReactSuggest from '../../helpers/ReactSuggest';

class CreateRentals extends Component {
  state = {
    customer: "",
    merchan: "",
    discount: "",
    value: 0,
    observations: "",
    deadline: ""
  };

  handleSubmit = e => {
    e.preventDefault();

    const { customer, merchan, discount, value, observations, deadline } = this.state;

    let newRental = {
      "customer": customer,
      "merchan": merchan, 
      "observations": observations,
      "deadline":  deadline,
      "value": Number(value),
      "discount": Number(discount),
    };

    const message = 'Nova tarefa criada.'
    postRequest('/rentals', newRental, message)
      .then((res) => {
        if(res === 200) {
          this.props.history.push("/rentals")
        }
      });
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
              Nova Ordem de Serviço
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit.bind(this)} id="createRental">
              <label className="form-label font-weight-bold">Cliente</label>
                <ReactSuggest
                  className="input-group col-md-8 mb-3"
                  name="customer"
                  icon={<i class="fas fa-user-tie"></i>}
                  type="text"
                  placeholder="Buscar Cliente . . ."
                  onChange={this.handleChange.bind(this)}
                  url="/customers"
                  value=""
                />

              <label className="form-label font-weight-bold">Mercadorias</label>
              <div class="input-group col-md-8 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-boxes"></i></span>
                </div>
                <textarea
                  className="form-control"
                  type="text"
                  name="merchan"
                  placeholder="Informe as mercadorias da venda . . ."
                  onChange={this.handleChange}
                  value={this.state.merchan}/>
              </div>
              

              <label className="form-label font-weight-bold">Desconto</label>
              <div className="input-group col-md-4 mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">{this.state.discount || 0.0}</span>
                  <span className="input-group-text"><i class="fas fa-percent"></i></span>
                </div>
                <input
                  className="form-control"
                  name="discount" placeholder="0.00"
                  type="number" min="0.00" max="1.0" step="0.01"
                  onChange={this.handleChange} value={this.state.discount}/>
              </div>

              <label className="form-label font-weight-bold">Valor</label>
              <div className="input-group col-md-4 mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i class="fas fa-money-bill-wave"></i></span>
                  <span className="input-group-text">R$</span>
                </div>
                <input
                  className="form-control"
                  name="value" placeholder="0.00"
                  type="number" min="0.00" max="100.000,00" step="0.01"
                  onChange={this.handleChange} value={this.state.value}/>
              </div>

              <label className="form-label font-weight-bold">Observações</label>
              <div class="input-group col-md-8 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-quote-right"></i></span>
                </div>
                <textarea
                  className="form-control"
                  type="text"
                  name="observations"
                  placeholder="Observações . . ."
                  onChange={this.handleChange}
                  value={this.state.observations}/>
              </div>

              <label className="form-label font-weight-bold">Data de término</label>
              <div class="input-group col-md-6 mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                </div>
                <input
                  className="form-control"
                  type="text"
                  name="deadline"
                  placeholder="Data-de-término"
                  onChange={this.handleChange}
                  value={this.state.deadline}/>
              </div>
              <button
                className="btn btn-primary"
                type="submit"
                >Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateRentals);
