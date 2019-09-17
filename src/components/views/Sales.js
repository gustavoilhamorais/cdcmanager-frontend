import React from "react";
import { Link } from "react-router-dom";
import Table from "../models/Table";
import { TableHeaderColumn } from "react-bootstrap-table";
import { Button, Card, CardHeader, CardBody, Container } from "reactstrap";
import {
  SalesContext,
  SalesContainer
} from "../../containers/Data/salesContainer";

export default function Main(props) {
  return (
    <SalesContainer>
      <SalesContext.Consumer>
        {provider => (
          <Container>
            <Card>
              <CardHeader>
                <Link
                  to={"/nova-venda"}
                  style={{ color: "white" }}
                  className="btn btn-info"
                >
                  <i className="fas fa-plus-circle mr-1" />
                  Nova Venda
                </Link>
              </CardHeader>
              <CardBody>
                <Table
                  data={provider.state.sales.filter(sale => sale.status)}
                  url={"/sales"}
                  nonEditable={() => ["id", "nf", "createdAt"]}
                  convertSaleIntoSaleOrder
                  reload={() => provider.loadSales()}
                >
                  <TableHeaderColumn isKey dataField="number" dataSort>
                    Nº
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="id" dataSort>
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="nf" dataSort>
                    Nota
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="customer" dataSort>
                    Cliente
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="createdAt" dataSort>
                    Criado em
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="saleCoast" dataSort>
                    Custo
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="saleValue" dataSort>
                    Valor
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="salesman" dataSort>
                    Vendedor
                  </TableHeaderColumn>
                </Table>
              </CardBody>
            </Card>
          </Container>
        )}
      </SalesContext.Consumer>
    </SalesContainer>
  );
}
