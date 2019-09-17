import React, { Component } from "react";
import api from "../../services/api";
import Swal from 'sweetalert2';
export const Data = React.createContext();

export class ProductsContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      page: 1,
      pages: 1,
      limit: 10,
      tota: 0
    };
  }

  componentDidMount() {
    this.loadProducts();
  }

  async apiPost(props) {
    try {
      const response = await api.post('/merchandise', {...props});
      if (response) {
        return Swal.fire({
          html: `<p>${response.data.message}</p>`,
          type: response.data.status,
          showCloseButton: true
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  loadProducts = async () => {
    const response = await api.get(`/merchandise?page=${this.state.page}`);
    const { docs, total, limit, page, pages } = response.data;
    this.setState({
      products: docs,
      total, limit, page, pages,
    });
  }

  createProduct = async (props) => {
    try {
      const { name, code, sellValue, buyValue, atStorage, minimumAtStorage } = props;
      const validation = await this.validate({ name, code, sellValue, buyValue, atStorage, minimumAtStorage });
      return validation.map((field, index) => {
        if (!field) return this.blankField();
        if (index === 4) return this.apiPost({...props});
      })
    } catch (error) {
      console.log(error);
    }
  }

  validate = props => {
    try {
      const { name, code, sellValue, buyValue, atStorage, minimumAtStorage } = props;
      const data = [name, code, sellValue, buyValue, atStorage, minimumAtStorage];
      let validation = data.map(prop => {
        if (!prop) return false;
        else return true;
      });

      return validation;
    } catch (error) {
      return error;
    }
  }

  blankField = field => {
    return Swal.fire({
      title: 'Atenção',
      html: '<p>Preencha todos os campos!</p>',
      type: 'warning',
      showCloseButton: 'true'
    })
  }

  render() {
    return (
      <Data.Provider
        value={{
          state: this.state,
          loadProducts: () => this.loadProducts(),
          createProduct: (props) => this.createProduct(props),
        }}
      >
        {this.props.children}
      </Data.Provider>
    );
  }
}
