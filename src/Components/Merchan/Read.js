import React, { Component } from "react";
import api from "../../api/conf";
import { Link, withRouter } from "react-router-dom";
import Swal from 'sweetalert2';

class Merchans extends Component {
    state = {
        merchans: [],
        merchanInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadMerchans();
    }
    loadMerchans = async (page = 1) => {
        const response = await api.get(`/merchandise?page=${page}`);
        const { docs, ...merchanInfo } = response.data;
        this.setState({merchans: docs, merchanInfo, page });
    };

    prevPage = () => {
      const { page } = this.state;
      if (page === 1) return;
      const pageNumber = page - 1;
      this.loadSales(pageNumber);
    };
  
    nextPage = () => {
      const { page, merchanInfo } = this.state;
      if (page === merchanInfo.pages) return;
      const pageNumber = page + 1;
      this.loadMerchans(pageNumber);
    };

    deleteMerchan = async id => {
      Swal.fire({
        title: 'Atenção!',
        html: '<p>Você tem certeza que deseja apagar esta mercadoria?</p>',
        type: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
      }).then(response => {
        if (response.value === true) {
          api.delete(`/merchandise/${id}`);
          this.loadMerchans();
        }
      });
    }

    render() {
      const { merchans, page, merchanInfo } = this.state;
        return (
            <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Mercadorias</h6>
              <a className="nav-link" href="/new-merchan"><i class="fas fa-plus-circle"></i></a>
            </div>
            <div className="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>Categoria</th>
                    <th>Valor de venda</th>
                    <th>Valor de compra</th>
                    <th>Status</th>
                    <th>Código</th>
                    <th></th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Categoria</th>
                    <th>Valor de venda</th>
                    <th>Valor de compra</th>
                    <th>Status</th>
                    <th>Código</th>
                    <th></th>
                  </tr>
                </tfoot>
                <tbody>
                  {merchans.map(merchan => (
                    <tr key={merchan._id}>
                      <td>{merchan.category}</td>
                      <td>{merchan.sellValue}</td>
                      <td>{merchan.buyValue}</td>
                      <td>{merchan.status ? 'No estoque' : 'Fora do Estoque'}</td>
                      <td>{merchan.code}</td>
                      <td className="text-center">
                        <Link to={`/edit-merchan/${merchan._id}`} className="btn btn-secondary btn-sm ml-1" >
                          <i className="fas fa-edit" />
                        </Link>
                        <button
                          className="btn btn-danger btn-sm ml-1"
                          name="deleteBtn"
                          onClick={()=> { this.deleteMerchan(merchan._id) }}
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
                >
                  <i class="fas fa-long-arrow-alt-left"></i>
                </button>
                <button
                  className="btn btn-primary mt-2 ml-3"
                  disabled={page === merchanInfo.pages}
                  onClick={this.nextPage}
                >
                  <i class="fas fa-long-arrow-alt-right"></i>
                </button>
              </div>
          </div>
        );
    };
};

export default withRouter(Merchans);