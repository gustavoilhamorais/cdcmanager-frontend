import React from "react";
import { Link } from 'react-router-dom';
import Table from "../models/Table";
import { TableHeaderColumn } from "react-bootstrap-table";
import { Button, Card, CardHeader, CardBody, Container } from "reactstrap";
import {
  Data,
  SalesmanContainer
} from "../../containers/Data/salesmanContainer";

const Main = () => {
  return (
    <SalesmanContainer>
      <Data.Consumer>
        {provider => {
          return (
            <Container>
              <Card>
                <CardHeader title="Vendedores">
                  <Link to={'/novo-vendedor'} style={{ color: "white" }} className="btn btn-info">
                    <i className="fas fa-plus-circle mr-1" />
                    Adicionar Vendedor
                  </Link>
                </CardHeader>
                <CardBody>
                  <Table data={provider.state.salesman} url={'/salesman'} reload={() => provider.loadSalesman()}>
                    <TableHeaderColumn dataField="ID" dataSort>
                      ID
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort isKey>
                      Nome
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="email" dataSort>
                      Email
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="phone" dataSort>
                      Telefone
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="address" dataSort>
                      Endereço
                    </TableHeaderColumn>
                  </Table>
                </CardBody>
              </Card>
            </Container>
          );
        }}
      </Data.Consumer>
    </SalesmanContainer>
  );
};

export default Main;
