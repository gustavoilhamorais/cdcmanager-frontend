import React from "react";
import { Input } from "reactstrap";
import { isUndefined, isNull } from "util";

const SelectMenu = props =>
  isNull(props.options) || isUndefined(props.options) ? (
    <Input type="select">
      <option>Nenhum cliente encontrado</option>
    </Input>
  ) : (
    <Input type="select" onClick={props.onSelect}>
      <option>Selecione</option>
      {props.options.map((item, index) => (
        <option key={index} id={item._id} value={item._id}>
        {item.name}
      </option>
      ))}
    </Input>
  );

export default SelectMenu;
