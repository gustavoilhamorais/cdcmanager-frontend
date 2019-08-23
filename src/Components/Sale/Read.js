import React, { Component } from "react";
import api from "../../api/conf";
import { Link, withRouter } from "react-router-dom";
import Swal from 'sweetalert2';

class Sales extends Component {
  state = {
    sales: [],
    saleInfo: {},
    page: 1
  };

  componentDidMount() {
    this.loadSales().then(() => this.rentalsToSales())
  }

  rentalsToSales = async () => {
    try {
      const res = await api.get('/rentals');
      let sales = this.state.sales;
      
      res.data.docs.map(rent => {
        if(rent.status === false) {
          sales.push(rent);
        }
      });

      // this.setState({ sales });
    } catch (error) {
      console.log(error)
    }
  }

  loadSales = async (page = 1) => {
    const response = await api.get(`/sales?page=${page}`);

    const { docs, ...saleInfo } = response.data;

    this.setState({ sales: docs, saleInfo, page });
    console.log(this.state)
  };

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadSales(pageNumber);
  };

  nextPage = () => {
    const { page, saleInfo } = this.state;

    if (page === saleInfo.pages) return;

    const pageNumber = page + 1;

    this.loadSales(pageNumber);
  };

  deleteSale = async id => {
    Swal.fire({
      title: 'Atenção!',
      html: '<p>Você tem certeza que deseja apagar esta venda?</p>',
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then(response => {
      if (response.value === true) {
        api.delete(`/sales/${id}`);
        this.loadSales();
      }
    });
  };

  render() {
    const { sales, page, saleInfo } = this.state;

    return (
      <div className="container-fluid">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Vendas</h6>
          <a className="nav-link" href="/new-sale"><i class="fas fa-plus-circle"></i></a>
        </div>
        <div className="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Mercadoria</th>
                <th>Desconto</th>
                <th>Valor</th>
                <th>Observações</th>
                <th></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Cliente</th>
                <th>Mercadoria</th>
                <th>Desconto</th>
                <th>Valor</th>
                <th>Observações</th>
                <th></th>
              </tr>
            </tfoot>
            <tbody>
              {sales.map((sale, index) => (
                <tr key={sale._id}>
                  <td>{sale.customer}</td>
                  <td>{sale.merchan}</td>
                  <td>{sale.discount}</td>
                  <td>{sale.value}</td>
                  <td>{sale.observations}</td>
                  <td className="text-center">
                    <Link key={'Link'+index} to={`/edit-sale/${sale._id}`} className="btn btn-secondary btn-sm ml-1">
                      <i className="fas fa-edit"/>
                    </Link>
                  <button
                    className="btn btn-danger btn-sm ml-1"
                    name="deleteBtn"
                    onClick={()=> { this.deleteSale(sale._id) }}
                  ><i className="fas fa-ban"/>
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
            disabled={page === saleInfo.pages}
            onClick={this.nextPage}
            ><i class="fas fa-long-arrow-alt-right"></i>
          </button>
        </div>
      </div>
    </div>
    );
  };
};

export default withRouter(Sales);