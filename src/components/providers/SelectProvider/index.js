import React from "react";
import { Input } from "reactstrap";
import { isUndefined, isNull } from "util";
import {
  Data,
  ProvidersContainer
} from "../../../containers/Data/providersContainer";

const SelectProvider = props => (
  <ProvidersContainer>
    <Data.Consumer>
      {provider =>
        isNull(provider.state.providers) ||
        isUndefined(provider.state.providers) ? (
          <Input type="select">
            <option>Nenhum vendedor encontrado</option>
          </Input>
        ) : (
          <Input type="select" onChange={(event) => props.onSelect(event.target.value)}>
            <option>Selecione</option>
            {provider.state.providers.map((Provider, index) => (
              <option
                key={index}
                id={Provider.name}
                value={Provider.name}
              >
                {Provider.name}
              </option>
            ))}
          </Input>
        )
      }
    </Data.Consumer>
  </ProvidersContainer>
);

export default SelectProvider;
