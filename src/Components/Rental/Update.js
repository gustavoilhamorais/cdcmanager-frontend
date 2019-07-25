import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../api/conf";
import { putRequest } from '../../helpers/apiLexicon';
import ReactSuggest from '../../helpers/ReactSuggest';

class UpdateRentals extends Component {
  state = {
    customer: "",
    merchan: "",
    value: "",
    status: "",
    deadline: "",
    id: null
  };

  async componentDidMount() {
    try {
      const {
        match: { params }
      } = this.props;

    const res = await api.get(`/rentals/${params.id}`);
      
    this.setState({
      customer: res.data.customer,
      merchan: res.data.merchan,
      value: res.data.value,
      status: res.data.status,
      deadline: res.data.deadline
    });

    } catch (e) { console.log(e) };
  };

  handleSubmit = e => {
    e.preventDefault();
    const { match: { params } } = this.props;

    if (!this.state.customer || !this.state.merchan || !this.state.value || !this.state.status) {
      window.confirm("Há espaços em branco, deseja prosseguir?");
    }

    const edited = {
      customer: this.state.customer,
      merchan: this.state.merchan,
      value: this.state.value,
      status: this.state.status,
      deadline: this.state.deadline
    }

    const url =`/rentals/${params.id}`;
    const message = 'Tarefa atualizada.'
    putRequest(url, edited, message);
    this.props.history.push("/rentals");
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
              Editando Ordem de Serviço
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit.bind(this)} id="updateRental">
              
            <label className="form-label font-weight-bold">Cliente</label>
              <ReactSuggest
                className="input-group col-md-8 mb-3"
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

export default withRouter(UpdateRentals);
