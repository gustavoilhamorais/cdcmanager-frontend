import React, { Component } from "react";
import api from "../../api/conf";
import { Link, withRouter } from "react-router-dom";

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
      const confirm = window.confirm("Você deseja mesmo deletar?");
  
      if (confirm === true) {
        await api.delete(`/merchandise/${id}`);
        await this.loadMerchans();
      };
    };

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
                      <td>{merchan.status}</td>
                      <td>{merchan.code}</td>
                      <td>
                      <Link to={`/edit-merchan/${merchan._id}`} className="btn btn-secondary btn-bg ml-1 fas fa-edit" />
                      <button
                        className="btn btn-danger btn-bg ml-1 fas fa-trash"
                        name="deleteBtn"
                        onClick={()=> { this.deleteMerchan(merchan._id) }}
                      >
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