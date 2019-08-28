import React, { Component } from "react";
import api from "../../api/conf";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";

class Providers extends Component {
  state = {
    providers: [],
    providerInfo: {},
    page: 1
  };

  componentDidMount() {
    this.loadProviders();
  }

  loadProviders = async (page = 1) => {
    const response = await api.get(`/providers?page=${page}`);
    const { docs, ...providerInfo } = response.data;
    this.setState({ providers: docs, providerInfo, page });
  };

  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;
    const pageNumber = page - 1;
    this.loadSales(pageNumber);
  };

  nextPage = () => {
    const { page, providerInfo } = this.state;
    if (page === providerInfo.pages) return;
    const pageNumber = page + 1;
    this.loadProviders(pageNumber);
  };

  deleteProvider = async id => {
    Swal.fire({
      title: "Atenção!",
      html: "<p>Você tem certeza que deseja apagar este fornecedor?</p>",
      type: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar"
    }).then(response => {
      if (response.value === true) {
        api.delete(`/providers/${id}`);
        this.loadProviders();
      }
    });
  };

  render() {
    const { providers, page, providerInfo } = this.state;
      return (
        <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Fornecedores</h6>
            <a className="nav-link" href="/new-provider"><i class="fas fa-plus-circle"></i></a>
          </div>
          <div className="card-body">
          <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Endereço</th>
                  <th>Documento</th>
                  <th>Telefone</th>
                  <th></th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Nome</th>
                  <th>Endereço</th>
                  <th>Documento</th>
                  <th>Telefone</th>
                  <th></th>
                </tr>
              </tfoot>
              <tbody>
                {providers.map(provider => (
                  <tr key={provider._id}>
                    <td>{provider.name}</td>
                    <td>{provider.address}</td>
                    <td>{provider.document}</td>
                    <td>{provider.phone}</td>
                    <td className="text-center">
                    <Link to={`/edit-provider/${provider._id}`} className="btn btn-secondary btn-sm ml-1">
                      <i className="fas fa-edit" />
                    </Link>
                    <button
                      className="btn btn-danger btn-sm ml-1"
                      name="deleteBtn"
                      onClick={()=> { this.deleteProvider(provider._id) }}
                      ><i className="fas fa-ban" />
                    </button>
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
                ><i class="fas fa-long-arrow-alt-left"></i>
              </button>
              <button
                className="btn btn-primary mt-2 ml-3"
                disabled={page === providerInfo.pages}
                onClick={this.nextPage}
                ><i class="fas fa-long-arrow-alt-right"></i>
              </button>
          </div>
        </div>
      </div>
    );
  };
};

export default withRouter(Providers);