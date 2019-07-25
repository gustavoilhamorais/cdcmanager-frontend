import React, { Component } from "react";
import Card from "../Card";
import { getRequest } from '../../helpers/apiLexicon';
import { SwalFire } from '../../helpers/swalFire';

export default class IncomingsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      possibleEarnings: 0,
      realEarnings: 0,
    }
  }

  componentWillMount() {
    this.apiHandler();
  }

  apiHandler = async () => {
    try {
      const res = await getRequest('/');

      if(res.status === 200) {
        if(res.data.possible !== undefined) {
          this.setState({ possibleEarnings: res.data.possible });
        
        } else this.setState({ possibleEarnings: '0.00' });

        if(res.data.real !== undefined) {
          this.setState({ realEarnings: res.data.real });
        
        } else this.setState({ realEarnings: '0.00' });
  
      } else {
        const message = "Falha ao atualizar dados."
        const type = "error"
        SwalFire(message, type);
      };
    
    } catch (err) {
      SwalFire(err, 'error');
    }
  }
  
  render() {
    return (
      <Card
        icon={<i class="fas fa-money-bill-wave fa-2x text-gray-300"></i>}
        title="Entradas"
        info={`Possíveis: R$${this.state.possibleEarnings}`}
        otherInfo={`Reais: R$${this.state.realEarnings}`}
        color="success"
      />
    );
  }
}
