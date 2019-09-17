import React, { Component } from "react";
import api from "../../services/api";
import Swal from "sweetalert2";
export const SalesContext = React.createContext();

export class SalesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      sales: [],
      saleOrders: [],
      page: 1,
      pages: 1,
      limit: 10,
      total: 1
    };
  }

  componentDidMount() {
    this.loadSales();
  }

  async apiPost(props) {
    try {
      const response = await api.post("/sales", { ...props });
      // console.log(response);
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
      const { id, status, from } = props;
      const response = await api.put(`/sales/${id}`, { status, from });
      if (response) {
        this.loadSales();
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

  loadSales = async () => {
    const response = await api.get(`/sales?page=${this.state.page}`);
    const { docs, total, limit, page, pages } = response.data;
    console.log(response);
    let sales =
      docs.map(sale => sale).filter(sale => sale.status === true) || [];
    let saleOrders =
      docs.map(sale => sale).filter(sale => sale.status === false) || [];

    this.setState({
      sales,
      saleOrders,
      total,
      limit,
      page,
      pages
    });
  };

  createSale = async props => {
    try {
      const {
        id,
        nf,
        customer,
        saleValue,
        saleCoast,
        salesman,
        requestFROM
      } = props;
      const validation = await this.validate({
        id,
        nf,
        customer,
        saleValue,
        saleCoast,
        salesman,
        requestFROM
      });
      return validation.map((field, index) => {
        if (field === false) return this.blankField(index);
        if (index === 5) {
          if (requestFROM === '/novo-pedido-de-venda') {
            const load = {...props, status: 0};
            return this.apiPost(load);
          } else {
            return this.apiPost({ ...props });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  convertSaleOrderIntoSale = props => {
    try {
      if (props.length === 1) {
        return this.apiPut({ id: props, status: true, from: 'saleOrder' });
      } else if (props.length === 0) {
        Swal.fire({
          title: "Atenção!",
          html:
            "<p>Você deve escolher ao menos um pedido para poder converter em uma venda.",
          type: "info",
          showCloseButton: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  convertSaleIntoSaleOrder = props => {
    try {
      if (props.length === 1) {
        return this.apiPut({ id: props, status: false });
      } else if (props.length === 0) {
        Swal.fire({
          title: "Atenção!",
          html:
            "<p>Você deve escolher ao menos uma venda para poder converter em um pedido.",
          type: "info",
          showCloseButton: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  validate = props => {
    try {
      const {
        id,
        nf,
        customer,
        saleValue,
        saleCoast,
        salesman,
        requestFROM
      } = props;
      const data = [
        id,
        nf,
        customer,
        saleValue,
        saleCoast,
        salesman,
        requestFROM
      ];
      let validation = data.map(prop => {
        console.log(prop)
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

  onPageChange(page) {
    this.setState({ page });
    this.loadSales();
  }

  onSizePerPageList(size) {
    this.setState({ limit: size });
  }

  render() {
    return (
      <SalesContext.Provider
        value={{
          state: this.state,
          createSale: props => this.createSale(props),
          onPageChange: page => this.onPageChange(page),
          onSizePerPageList: size => this.onSizePerPageList(size),
          loadSales: () => this.loadSales(),
          loadSaleOrders: () => this.loadSaleOrders(),
          convertSaleOrderIntoSale: (id) => this.convertSaleOrderIntoSale(id),
          convertSaleIntoSaleOrder: (id) => this.convertSaleIntoSaleOrder(id)
        }}
      >
        {this.props.children}
      </SalesContext.Provider>
    );
  }
}
