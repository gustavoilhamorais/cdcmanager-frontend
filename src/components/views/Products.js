import React from "react";
import { Link } from 'react-router-dom';
import Table from "../models/Table";
import { TableHeaderColumn } from "react-bootstrap-table";
import { Card, CardHeader, CardBody, Container } from "reactstrap";
import {
  Data,
  ProductsContainer
} from "../../containers/Data/productsContainer";

export default function Main(props) {
  return (
    <ProductsContainer>
      <Data.Consumer>
        {provider => (
            <Container>
              <Card>
                <CardHeader title="Produtos">
                <Link to="/novo-produto"
                    className="btn btn-info" 
                    style={{ color: 'white' }}>
                    <i className="fas fa-plus-circle mr-1" />
                    Novo Produto
                  </Link>
                </CardHeader>
                <CardBody>
                  <Table data={provider.state.products} url={'/merchandise'} reload={() => provider.loadProducts()}>
                    <TableHeaderColumn dataField="name" dataSort isKey>
                      Nome do Produto
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="code" dataSort>
                      Código do Produto
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="sellValue" dataSort>
                      Valor de Venda R$
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="buyValue" dataSort>
                      Custo Médio
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="atStorage" dataSort>
                      Em Estoque
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="minimumAtStorage" dataSort>
                      Mínimo Em Estoque
                    </TableHeaderColumn>
                  </Table>
                </CardBody>
              </Card>
            </Container>
          )
        }
      </Data.Consumer>
    </ProductsContainer>
  );
};
