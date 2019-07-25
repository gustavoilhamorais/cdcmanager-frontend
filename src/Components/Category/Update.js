import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../api/conf";
import { putRequest } from '../../helpers/apiLexicon';
import InputGroup from '../partials/InputGroup';
import ReactSuggest from "../../helpers/ReactSuggest";

class UpdateCategory extends Component {
  state = {
    title: "",
    provider: "",
    gender: "",
    atStorage: 0,
    id: null
  };

  async componentDidMount() {
    try {
      const {
        match: { params }
      } = this.props;

    const res = await api.get(`/categories/${params.id}`);
      
    this.setState({
      title: res.data.title,
      provider: res.data.provider,
      gender: res.data.gender,
      atStorage: res.data.atStorage
    });

    } catch (e) { console.log(e) };
  };

  handleSubmit = e => {
    e.preventDefault();
    const { match: { params } } = this.props;

    if (!this.state.title || !this.state.provider || !this.state.gender || !this.state.atStorage) {
      window.confirm("Há espaços em branco, deseja prosseguir?");
    }

    const edited = {
      title: this.state.title,
      provider: this.state.provider,
      gender: this.state.gender,
      minimumAtStorage: this.state.minimumAtStorage
    }

    const url = `/categories/${params.id}`;
    const message = 'Categoria atualizada.';
    putRequest(url, edited, message);
    this.props.history.push("/categories");
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
              Editando Categoria
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit.bind(this)} id="updateCategory">
              <InputGroup className="input-group col-md-5 mb-3"
                  type="text"
                  name="title"
                  label="Título"
                  id="titleID"
                  placeholder="Título"
                  onChange={this.handleChange}
                  value={this.state.title}
                  ><i class="far fa-clipboard"></i>
              </InputGroup>
              <ReactSuggest className="input-group col-md-7 mb-3"
                id="providerId"
                name="provider"
                type="text"
                value=""
                label="Fornecedor"
                icon={<i class="fas fa-search"></i>}
                placeholder="Buscar um fornecedor. . ."
                url="/providers"
                onChange={this.handleChange.bind(this)}
              />

              <InputGroup
                label="Venda ou Aluguel"
                className="input-group col-md-6 mb-3"
                type="text"
                name="gender"
                placeholder="Gênero"
                onChange={this.handleChange}
                value={this.state.gender}
                ><i class="fas fa-shopping-basket"></i>
              </InputGroup>
              
              <InputGroup
                className="input-group col-md-6 mb-3"
                type="number"
                label="Mínimo em estoque"
                name="minimumAtStorage"
                placeholder="Mínimo em estoque"
                onChange={this.handleChange}
                value={this.state.minimumAtStorage}
                ><i class="fas fa-exclamation-triangle"></i>
              </InputGroup>

              <button className="btn btn-primary" type="submit">
                Enviar
              </button>
              <a href="/categories" className="btn btn-secondary ml-1">Voltar</a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateCategory);
