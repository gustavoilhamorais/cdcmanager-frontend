import React, { Component } from "react";
import api from "../../api/conf";
import { Link, withRouter } from "react-router-dom";
import Swal from "sweetalert2";

class Customers extends Component {
  state = {
    customers: [],
    customerInfo: {},
    page: 1
  };

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = async (page = 1) => {
    const response = await api.get(`/customers?page=${page}`);
    const { docs, ...customerInfo } = response.data;
    this.setState({ customers: docs, customerInfo, page });
  };

  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;
    const pageNumber = page - 1;
    this.loadSales(pageNumber);
  };

  nextPage = () => {
    const { page, customerInfo } = this.state;
    if (page === customerInfo.pages) return;
    const pageNumber = page + 1;
    this.loadCustomers(pageNumber);
  };

  deleteCustomer = async id => {
    Swal.fire({
      title: "Atenção!",
      html: "<p>Você tem certeza que deseja apagar este cliente?</p>",
      type: "warning",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar"
    }).then(response => {
      if (response.value === true) {
        api.delete(`/customers/${id}`);
        this.loadCustomers();
      }
    });
  };

  render() {
    const { customers, page, customerInfo } = this.state;
    return (
      <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Clientes</h6>
            <a className="nav-link" href="/new-customer">
              <i class="fas fa-plus-circle" />
            </a>
          </div>
          <div className="card-body">
            <div class="table-responsive">
              <table
                class="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Documento</th>
                    <th>Endereço</th>
                    <th />
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Documento</th>
                    <th>Endereço</th>
                    <th />
                  </tr>
                </tfoot>
                <tbody>
                  {customers.map(customer => (
                    <tr key={customer._id}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.document}</td>
                      <td>{customer.address}</td>
                      <td className="text-center">
                        <Link
                          to={`/edit-customer/${customer._id}`}
                          className="btn btn-secondary btn-sm mb-1"
                        >
                          <i className="fas fa-edit" />
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          name="deleteBtn"
                          onClick={() => {
                            this.deleteCustomer(customer._id);
                          }}
                        >
                          <i className="fas fa-ban" />
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
            >
              <i class="fas fa-long-arrow-alt-left" />
            </button>
            <button
              className="btn btn-primary mt-2 ml-3"
              disabled={page === customerInfo.pages}
              onClick={this.nextPage}
            >
              <i class="fas fa-long-arrow-alt-right" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Customers);
