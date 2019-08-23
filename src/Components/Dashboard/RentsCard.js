import React, { Component } from "react";
import Card from "../Card";
import { getRequest } from '../../helpers/apiLexicon';
import { SwalFire } from '../../helpers/swalFire';

export default class RentsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalActiveRentals: 0
    }
  }

  componentWillMount() {
    this.apiHandler();
  }

  apiHandler = async () => {
    try {
      const res = await getRequest('/');
      if(res.status === 200) {
        if(res.data.activeRentals !== undefined) {
          this.setState({ totalActiveRentals: res.data.activeRentals });
        
        } else this.setState({ totalActiveRentals: 'Nenhuma.'});
  
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
        icon={<i className="fas fa-clipboard-list fa-2x text-gray-300"></i>}
        title="Ordens de serviço"
        info={`Em andamento: ${this.state.totalActiveRentals}`}
        color="warning"
      />
    );
  }
}

