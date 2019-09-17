import React from "react";
import { Input } from "reactstrap";
import { isUndefined, isNull } from "util";
import { Data, SalesmanContainer } from '../../../containers/Data/salesmanContainer';

const SelectSalesman = props => (
  <SalesmanContainer>
    <Data.Consumer>
      {provider => (
        isNull(provider.state.salesman) || isUndefined(provider.state.salesman) ? (
          <Input type="select">
            <option>Nenhum vendedor encontrado</option>
          </Input>
        ) : (
          <Input type="select" onClick={props.onSelect}>
            <option>Selecione</option>
            {provider.state.salesman.map((salesman, index) => (
              <option key={index} id={salesman._id} value={salesman.name}>
                {salesman.name}
              </option>
            ))}
          </Input>
        )
      )}
    </Data.Consumer>
  </SalesmanContainer>
);

export default SelectSalesman;
