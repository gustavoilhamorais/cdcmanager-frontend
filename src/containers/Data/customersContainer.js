import React, { Component } from "react";
import api from "../../services/api";
import Swal from 'sweetalert2';
export const Data = React.createContext();

export class CustomersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: [],
      page: 1,
      pages: 1,
      limit: 10,
      tota: 0
    };
  }

  componentDidMount() {
    this.loadCustomers();
  }

  async apiPost(props) {
    try {
      const response = await api.post('/customers', {...props});
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

  loadCustomers = async () => {
    const response = await api.get(`/customers?page=${this.state.page}`);
    console.log(response);
    const { docs, total, limit, page, pages } = response.data;
    this.setState({
      customers: docs,
      total, limit, page, pages,
    });
  }

  createCustomer = async (props) => {
    try {
      const { name, address, phone, email, document } = props;
      const validation = await this.validate({ name, address, phone, email, document });
      return validation.map((field, index) => {
        if (field === false) return this.blankField();
        if (index === 4) return this.apiPost({...props});
      })
    } catch (error) {
      console.log(error);
    }
  }

  validate = props => {
    try {
      const { name, address, phone, email, document } = props;
      const data = [name, address, phone, email, document];
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
          loadCustomers: () => this.loadCustomers(),
          createCustomer: (props) => this.createCustomer(props),
        }}
      >
        {this.props.children}
      </Data.Provider>
    );
  }
}
