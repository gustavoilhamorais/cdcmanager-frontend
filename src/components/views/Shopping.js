import React from "react";
import { Link } from "react-router-dom";
import Table from "../models/Table";
import { TableHeaderColumn } from "react-bootstrap-table";
import { Card, CardHeader, CardBody, Container } from "reactstrap";
import {
  ShoppingContext,
  ShoppingContainer
} from "../../containers/Data/shoppingsContainer";

const Main = () => {
  return (
    <ShoppingContainer>
      <ShoppingContext.Consumer>
        {provider => {
          return (
            <Container>
              <Card>
                <CardHeader title="Compras">
                  <Link
                    to={"/nova-compra"}
                    style={{ color: "white" }}
                    className="btn btn-info"
                  >
                    <i className="fas fa-plus-circle mr-1" />
                    Nova Compra
                  </Link>
                </CardHeader>
                <CardBody>
                  <Table
                    data={provider.state.shopping}
                    url={"/shopping"}
                    reload={ status => provider.loadShopping() }
                    convertShoppingIntoRequest
                  >
                    <TableHeaderColumn dataField="number" dataSort>
                      Nº
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="nf" dataSort isKey>
                      Nota
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="provider" dataSort>
                      Fornecedor
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="createdAt" dataSort>
                      Data de Emissão
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="shopValue" dataSort>
                      Valor da Compra
                    </TableHeaderColumn>
                  </Table>
                </CardBody>
              </Card>
            </Container>
          );
        }}
      </ShoppingContext.Consumer>
    </ShoppingContainer>
  );
};

export default Main;
