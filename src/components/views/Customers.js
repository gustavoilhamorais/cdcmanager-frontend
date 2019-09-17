import React from "react";
import { Link } from "react-router-dom";
import Table from "../models/Table";
import { TableHeaderColumn } from "react-bootstrap-table";
import { Button, Card, CardHeader, CardBody, Container } from "reactstrap";
import {
  Data,
  CustomersContainer
} from "../../containers/Data/customersContainer";

const Main = () => {
  return (
    <CustomersContainer>
      <Data.Consumer>
        {provider => {
          return (
            <Container>
              <Card>
                <CardHeader title="Clientes">
                  <Link
                    to={"/novo-cliente"}
                    style={{ color: "white" }}
                    className="btn btn-info"
                  >
                    <i className="fas fa-plus-circle mr-1" />
                    Novo Cliente
                  </Link>
                </CardHeader>
                <CardBody>
                  <Table data={provider.state.customers} url={'/customers'} reload={() => provider.loadCustomers()}>
                    <TableHeaderColumn dataField="name" dataSort isKey>
                      Nome
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="email" dataSort>
                      Email
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="phone" dataSort>
                      Telefone
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="document" dataSort>
                      Documento
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
    </CustomersContainer>
  );
};

export default Main;
