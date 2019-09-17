import React, { Component } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
import { isNull, isUndefined } from "util";
export const ShoppingContext = React.createContext();

export class ShoppingContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopping: [],
      shoppingRequests: [],
      page: 1,
      pages: 1,
      limit: 10,
      total: 0
    };
  }

  componentDidMount() {
    this.loadShopping();
  }

  async apiPost(props) {
    try {
      const response = await api.post("/shopping", { ...props });
      if (response) {
        return Swal.fire({
          html: `<p>${response.data.message}</p>`,
          type: response.data.status,
          showCloseButton: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async apiPut(props) {
    try {
      const { id, status } = props;
      const response = await api.put(`/shopping/${id}`, { status: status });
      if (response) {
        this.loadShopping();
        return Swal.fire({
          html: `<p>${response.data.message}</p>`,
          type: response.data.status,
          showCloseButton: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  loadShopping = async () => {
    const response = await api.get(`/shopping?page=${this.state.page}`);
    const { docs, total, limit, page, pages } = response.data;
    
    let shopping =
      docs
        .map(shopping => shopping)
        .filter(shopping => shopping.status === true) || [];
    let shoppingRequests =
      docs
        .map(shopping => shopping)
        .filter(shopping => shopping.status === false) || [];    
    shoppingRequests = await shoppingRequests.map((shopping, index) => {
      shopping.merchandise = shopping.merchandise.map(merchan => `${merchan.name} (${merchan.amount})}`);
      return shopping;
    });

    this.setState({
      shopping: shopping,
      shoppingRequests: shoppingRequests,
      total,
      limit,
      page,
      pages
    });
  };

  createShopping = async props => {
    try {
      const validation = await this.validate({ ...props });
      return validation.map((field, index) => {
        if (field === false) return this.blankField();
        if (index === 4) return this.apiPost({ ...props });
      });
    } catch (error) {
      console.log(error);
    }
  };

  convertRequestIntoShopping = async props => {
    try {
      if (props.length === 1) {
        return this.apiPut({ id: props, status: true });
      } else if (props.length === 0) {
        Swal.fire({
          title: "Atenção!",
          html:
            "<p>Você deve escolher ao menos um pedido para poder converter em uma compra.",
          type: "info",
          showCloseButton: true
        });
      } else {
        return props.map(id => {
          return this.apiPut("/shopping", { status: true });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  convertShoppingIntoRequest = props => {
    try {
      if (props.length === 1) {
        return this.apiPut({ id: props, status: false });
      } else if (props.length === 0) {
        Swal.fire({
          title: "Atenção!",
          html:
            "<p>Você deve escolher ao menos uma compra para poder converter em um pedido.",
          type: "info",
          showCloseButton: true
        });
      } else {
        return props.map(id => {
          return this.apiPut("/shopping", { status: false });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  validate = props => {
    try {
      const {
        providerName,
        discount,
        products,
        nf,
        shopValue,
        requestFROM
      } = props;
      const data = [
        providerName,
        discount,
        products,
        nf,
        shopValue,
        requestFROM
      ];
      let validation = data.map(prop => {
        if (!prop) return false;
        else return true;
      });

      return validation;
    } catch (error) {
      return error;
    }
  };

  blankField = field => {
    return Swal.fire({
      title: "Atenção",
      html: "<p>Preencha todos os campos!</p>",
      type: "warning",
      showCloseButton: "true"
    });
  };

  render() {
    return (
      <ShoppingContext.Provider
        value={{
          state: this.state,
          loadShopping: () => this.loadShopping(),
          createShopping: props => this.createShopping(props),
          convertRequestIntoShopping: selected =>
            this.convertRequestIntoShopping(selected),
          convertShoppingIntoRequest: selected =>
            this.convertShoppingIntoRequest(selected)
        }}
      >
        {this.props.children}
      </ShoppingContext.Provider>
    );
  }
}
