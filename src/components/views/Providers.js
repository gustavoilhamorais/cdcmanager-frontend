import React from "react";
import { Link } from 'react-router-dom';
import Table from "../models/Table";
import { TableHeaderColumn } from "react-bootstrap-table";
import { Button, Card, CardHeader, CardBody, Container } from "reactstrap";
import {
  Data,
  ProvidersContainer
} from "../../containers/Data/providersContainer";

export default function Main(props) {
  return (
    <ProvidersContainer>
      <Data.Consumer>
        {provider => {
          return (
            <Container>
              <Card>
                <CardHeader>
                  <Link to="/novo-fornecedor"
                    className="btn btn-info" 
                    style={{color: 'white'}}>
                    <i className="fas fa-plus-circle mr-1" />
                    Novo Fornecedor
                  </Link>
                </CardHeader>
                <CardBody>
                  <Table data={provider.state.providers} url={'/providers'} reload={() => provider.loadProviders()}>
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
                    <TableHeaderColumn dataField="document" dataSort>
                      Documento
                    </TableHeaderColumn>
                  </Table>
                </CardBody>
              </Card>
            </Container>
          );
        }}
      </Data.Consumer>
    </ProvidersContainer>
  );
};
