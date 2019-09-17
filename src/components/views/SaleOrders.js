import React from "react";
import { Link } from "react-router-dom";
import Table from "../models/Table";
import { TableHeaderColumn } from "react-bootstrap-table";
import { Card, CardHeader, CardBody } from "reactstrap";
import { SalesContext, SalesContainer } from "../../containers/Data/salesContainer";

export default function Main(props) {
  return (
    <SalesContainer>
      <SalesContext.Consumer>
        {provider => (
          <div className="animated">
            <Card>
              <CardHeader>
                <Link
                  to={"/novo-pedido-de-venda"}
                  style={{ color: "white" }}
                  className="btn btn-info"
                  color="secondary"
                >
                  <i className="fas fa-plus-circle mr-1" />
                  Novo Pedido de Venda
                </Link>
              </CardHeader>
              <CardBody>
                <Table data={provider.state.saleOrders} url={"/sales"} convertSaleOrderIntoSale reload={() => provider.loadSaleOrders()}>
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
                  <TableHeaderColumn dataField="products" dataSort>
                    Produtos
                  </TableHeaderColumn>
                </Table>
              </CardBody>
            </Card>
          </div>
        )}
      </SalesContext.Consumer>
    </SalesContainer>
  );
}
