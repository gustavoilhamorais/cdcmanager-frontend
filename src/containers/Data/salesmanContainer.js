import React, { Component } from "react";
import api from "../../services/api";
import Swal from 'sweetalert2';
export const Data = React.createContext();

export class SalesmanContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      salesman: [],
      page: 1,
      pages: 1,
      limit: 10,
      total: 0
    };
  }

  componentDidMount() {
    this.loadSalesman();
  }

  async apiPost(props) {
    try {
      const response = await api.post('/salesman', {...props});
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

  loadSalesman = async () => {
    const response = await api.get(`/salesman?page=${this.state.page}`);
    console.log(response);
    const { docs, total, limit, page, pages } = response.data;
    this.setState({
      salesman: docs,
      total, limit, page, pages,
    });
  }

  createSalesman = async (props) => {
    try {
      const { name, address, phone, email, ID } = props;
      const validation = await this.validate({ name, address, phone, email, ID });
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
      const { name, address, phone, email, ID } = props;
      const data = [name, address, phone, email, ID];
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
          loadSalesman: () => this.loadSalesman(),
          createSalesman: (props) => this.createSalesman(props),
        }}
      >
        {this.props.children}
      </Data.Provider>
    );
  }
}
