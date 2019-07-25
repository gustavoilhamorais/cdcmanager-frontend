import React, { Component } from "react";
import { getRequest } from '../../helpers/apiLexicon';
import { SwalFire } from '../../helpers/swalFire';
import Card from "../Card";

export default class AlertsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today: 0,
      late: 0,
    };
  }

  componentWillMount() {
    this.apiHandler();
  }

  apiHandler = async () => {
    try {
      const res = await getRequest('/');
      if(res.status === 200) {
        if(res.data.expiresToday !== undefined) {
          this.setState({ today: res.data.expiresToday });
        } else this.setState({today: 'Nada consta.'})

        if(res.data.late !== undefined) {
          this.setState({ late: res.data.late })
        } else this.setState({ late: 'Nada consta.' })

      } else {
        const message = "Falha ao atualizar dados."
        const type = "error"
        SwalFire(message, type);
      };
    } catch (error) {
      SwalFire("Falha ao atualizar dados.", "error");
    }
  }

  render() {
    return (
        <Card
          icon={<i className="far fa-clock fa-2x text-gray-300"></i>}
          title="Alertas"
          info={`Expiram hoje: ${this.state.today}`}
          otherInfo={`Atrasados: ${this.state.late}`}
          color="danger"
        />
    );
  }
}
