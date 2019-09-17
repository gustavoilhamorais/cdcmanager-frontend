import React from "react";
import { Input } from 'reactstrap';
import { Data, CustomersContainer } from '../../../containers/Data/customersContainer';
import { isNull, isUndefined } from "util";

const SelectCustomer = props => (
  <CustomersContainer>
    <Data.Consumer>
      {provider => (
        isNull(provider.state.customers) || isUndefined(provider.state.customers) ? (
          <Input type="select">
            <option>Nenhum cliente encontrado</option>
          </Input>
        ) : (
          <Input type="select" onClick={props.onSelect}>
            <option>Selecione</option>
            {provider.state.customers.map((customer, index) => (
              <option key={index} id={customer._id} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </Input>
        )
      )}
    </Data.Consumer>
  </CustomersContainer>
);

export default SelectCustomer;
