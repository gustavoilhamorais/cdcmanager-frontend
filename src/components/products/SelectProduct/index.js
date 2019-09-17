import React from "react";
import { Input } from 'reactstrap';
import { Data, ProductsContainer } from '../../../containers/Data/productsContainer';
import { isNull, isUndefined } from "util";

const SelectCustomer = props => (
  <ProductsContainer>
    <Data.Consumer>
      {provider => (
        isNull(provider.state.products) || isUndefined(provider.state.products) ? (
          <Input type="select">
            <option>Nenhum produto encontrado</option>
          </Input>
        ) : (
          <Input type="select" onChange={(event) => props.onSelect(event.target.value)}>
            <option>{props.selected || "Selecione"}</option>
            {provider.state.products.map((product, index) => (
              <option key={index} id={product._id} name={product.name} value={props.selected || product.name}>
                {product.name}
              </option>
            ))}
          </Input>
        )
      )}
    </Data.Consumer>
  </ProductsContainer>
);

export default SelectCustomer;
