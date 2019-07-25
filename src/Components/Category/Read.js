import React, { Component } from "react";
import api from "../../api/conf";
import { Link, withRouter } from "react-router-dom";

// import '../../vendor/datatables/dataTables.bootstrap4.css';
// import DataTable from 'datatables.net';
// const $ = require('jquery');

class ReadCategories extends Component {
  state = {
    categories: [],
    categoryInfo: {},
    page: 1
  };

  componentDidMount() {
    this.loadCategories();
    // $(document).ready(function() {
    //   $('#dataTable').DataTable();
    // })
  }

  loadCategories = async (page = 1) => {
    const response = await api.get(`/categories?page=${page}`);
    const { docs, ...categoryInfo } = response.data;
    this.setState({
      categories: docs,
      categoryInfo,
      page
    });
  };

  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;
    const pageNumber = page - 1;
    this.loadSales(pageNumber);
  };

  nextPage = () => {
    const { page, categoryInfo } = this.state;
    if (page === categoryInfo.pages) return;
    const pageNumber = page + 1;
    this.loadcategory(pageNumber);
  };

  deleteCategory = async id => {
    const confirm = window.confirm("Você deseja mesmo deletar?");

    if (confirm === true) {
      await api.delete(`/categories/${id}`);
      await this.loadCategories();
    };
  };

  render() {
    const { categories, page, categoryInfo } = this.state;
    return (
      <div className="container-fluid">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Categorias</h6>
            <a className="nav-link" href="/new-category">
              <i class="fas fa-plus-circle" />
            </a>
          </div>
          <div className="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th> Título </th>
                    <th> Fornecedor </th>
                    <th> Gênero </th>
                    <th> Em estoque </th>
                    <th />{" "}
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th> Título </th>
                    <th> Fornecedor </th>
                    <th> Gênero </th>
                    <th> Em estoque </th>
                    <th />{" "}
                  </tr>
                </tfoot>
                <tbody>
                  {" "}
                  {categories.map(category => (
                    <tr key={category._id}>
                      <td> {category.title} </td>
                      <td> {category.provider} </td>
                      <td> {category.gender} </td>
                      <td> {category.atStorage} </td>
                      <td>
                        <Link to={`/edit-category/${category._id}`} className="btn btn-secondary btn-bg ml-1 fas fa-edit" />
                        <button
                          className="btn btn-danger btn-bg ml-1 fas fa-trash"
                          name="deleteBtn"
                          onClick={()=> { this.deleteCategory(category._id) }}
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
              <i class="fas fa-long-arrow-alt-left" />
            </button>
            <button
              className="btn btn-primary mt-2 ml-3"
              disabled={page === categoryInfo.pages}
              onClick={this.nextPage}
            >
              <i className="fas fa-long-arrow-alt-right" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ReadCategories);
