import React, { Component } from 'react';
import api from '../../services/api';
import Swal from 'sweetalert2';
export const Data = React.createContext();

export class ProvidersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      providers: [],
      page: 1,
      pages: 1,
      limit: 10,
      tota: 0
    };
  }

  componentDidMount() {
    this.loadProviders();
  }

  async apiPost(props) {
    try {
      const response = await api.post('/providers', {...props});
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

  loadProviders = async () => {
    const response = await api.get(`/providers?page=${this.state.page}`);
    const { docs, total, limit, page, pages } = response.data;
    this.setState({
      providers: docs,
      total, limit, page, pages,
    });
  }

  createProvider = async (props) => {
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
          loadProviders: () => this.loadProviders(),
          createProvider: (props) => this.createProvider(props),
        }}
      >
        {this.props.children}
      </Data.Provider>
    );
  }
}
