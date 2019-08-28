import React, { Component } from "react";
import api from "../../api/conf";
import { Link, withRouter } from "react-router-dom";
import FinishRental from './FinishRental';
import Swal from 'sweetalert2';

class Rentals extends Component {
  state = {
    rentals: [],
    rentInfo: {},
    page: 1
  };

  componentWillMount() {
    this.loadRentals();
  }

  loadRentals = async (page = 1) => {
    const response = await api.get(`/rentals?page=${page}`);
    const { docs, ...rentInfo } = response.data;
    this.setState({ rentals: docs, rentInfo, page });
  };

  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;
    const pageNumber = page - 1;
    this.loadSales(pageNumber);
  };

  nextPage = () => {
    const { page, rentInfo } = this.state;
    if (page === rentInfo.pages) return;
    const pageNumber = page + 1;
    this.loadRentals(pageNumber);
  };

  deleteRent = async id => {
    Swal.fire({
      title: 'Atenção!',
      html: '<p>Você tem certeza que deseja apagar esta Ordem de Serviço?</p>',
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then(response => {
      if (response.value === true) {
        api.delete(`/rentals/${id}`);
        this.loadRentals();
      }
    });
  };

  handleStatus () {
    this.loadRentals();
  }

  render() {
    const { page, rentInfo } = this.state;
    return (
      <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Ordens de Serviço</h6>
            <a className="nav-link" href="/new-rental"><i class="fas fa-plus-circle"></i></a>
          </div>
          <div className="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Mercadoria(s)</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Acaba em</th>
                  <th></th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Cliente</th>
                  <th>Mercadoria(s)</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Acaba em</th>
                  <th></th>
                </tr>
              </tfoot>
              <tbody>
                {this.state.rentals.map((rent, index) => (
                  <tr key={index}>
                    <td>{rent.customer.name}</td>
                    <td>{rent.merchan}</td>
                    <td>{rent.value}</td>
                    <td>{(rent.status) ? (<p>Em execução</p>) : (<p>Venda efetivada</p>) }</td>
                    <td>{rent.deadline}</td>
                    <td className="text-center">
                    <Link key={'Link'+index} to={`/edit-rental/${rent._id}`} className="btn btn-secondary btn-sm ml-1">
                      <i className="fas fa-edit"/>
                    </Link>
                      <button
                        className="btn btn-danger btn-sm ml-1"
                        name="deleteBtn"
                        onClick={()=> { this.deleteRent(rent._id) }}
                        ><i className="fas fa-ban" />
                      </button>
                      <FinishRental callback={() => this.handleStatus(index)} status={rent.status} id={rent._id}/>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>
          <div className="actions">
            <button
              className="btn btn-primary mt-2"
              disabled={page === 1}
              onClick={this.prevPage}
            >
              <i class="fas fa-long-arrow-alt-left"></i>
            </button>
            <button
              className="btn btn-primary mt-2 ml-3"
              disabled={page === rentInfo.pages}
              onClick={this.nextPage}
            >
              <i class="fas fa-long-arrow-alt-right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };
};

export default withRouter(Rentals);