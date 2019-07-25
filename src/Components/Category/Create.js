import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { postRequest } from '../../helpers/apiLexicon';
import ReactSuggest from '../../helpers/ReactSuggest';
import InputGroup from '../partials/InputGroup';
import { SwalFire } from "../../helpers/swalFire";

class CreateCategories extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      title: "",
      provider: "",
      gender: "",
      minimumAtStorage: 0
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    let newCategory = {
      "title": this.state.title,
      "provider": this.state.provider,
      "gender": this.state.gender,
      "minimumAtStorage": this.state.minimumAtStorage
    };

    const message = "categoria criada com sucesso."
    postRequest("/categories", newCategory, message)
      .then(res => {
        if(res.data.status === 200) {
          this.props.history.push("/categories")
        }
        else SwalFire(res.data.message, 'warning');
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
              Nova Categoria
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
              <Link to="/categories" className="btn btn-secondary ml-1">Voltar</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateCategories);
