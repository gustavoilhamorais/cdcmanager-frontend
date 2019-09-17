import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  SalesContainer,
  SalesContext
} from "../../containers/Data/salesContainer";
import SelectMultipleProducts from "../products/SelectMultipleProducts";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Container,
  Input,
  Form,
  FormGroup,
  FormText,
  Row
} from "reactstrap";
import SelectCustomer from "../customers/SelectCustomer";
import SelectSalesman from "../salesman/SelectSalesman";

export default function Main(props) {
  const [id, setId] = useState("");
  const [nf, setNf] = useState("");
  const [customer, setCustomer] = useState("");
  const [saleValue, setSaleValue] = useState("");
  const [saleCoast, setSaleCoast] = useState("");
  const [salesman, setSalesman] = useState("");
  const [products, setProducts] = useState([]);
  const requestFROM = props.requestFROM || "/nova-venda";
  const back = requestFROM === "/nova-venda" ? "/vendas" : "/pedidos-de-venda";
  const title =
    props.requestFROM === "/novo-pedido-de-venda"
      ? "Novo Pedido de Venda"
      : "Nova Venda";

  return (
    <SalesContainer>
      <SalesContext.Consumer>
        {provider => {
          return (
            <Container>
              <Form>
                <Card>
                  <CardHeader title={title}>
                    <h4>{title}</h4>
                  </CardHeader>
                  <CardBody>
                    <Col md="5">
                      <FormGroup>
                        <FormText>ID</FormText>
                        <Input
                          type="text"
                          name={id}
                          onChange={e => setId(e.target.value)}
                          value={id}
                          required
                        />
                        <FormText>Nota Fiscal</FormText>
                        <Input
                          type="text"
                          name={nf}
                          onChange={e => setNf(e.target.value)}
                          value={nf}
                          required
                        />
                        <FormText>Cliente</FormText>
                        <SelectCustomer
                          onSelect={event => setCustomer(event.target.value)}
                        />
                        <FormText>Custo da Venda</FormText>
                        <Input
                          type="text"
                          name={saleCoast}
                          onChange={e => setSaleCoast(e.target.value)}
                          value={saleCoast}
                          required
                        />
                        <FormText>Valor da Venda</FormText>
                        <Input
                          type="number"
                          name={saleValue}
                          onChange={e => setSaleValue(e.target.value)}
                          value={saleValue}
                          required
                        />
                        <FormText>Vendedor</FormText>
                        <SelectSalesman
                          onSelect={event => setSalesman(event.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <FormText>Produtos</FormText>
                    <SelectMultipleProducts
                      callback={productList => setProducts(productList)}
                    />
                  </CardBody>
                  <CardFooter>
                    <FormGroup>
                      <Row>
                        <Button
                          onClick={() =>
                            provider.createSale({
                              id,
                              nf,
                              customer,
                              saleValue,
                              saleCoast,
                              salesman,
                              products,
                              requestFROM
                            })
                          }
                          size="sm"
                          color="primary"
                          style={{ color: "white", marginLeft: "1%" }}
                        >
                          Salvar
                        </Button>
                        <Link to={back} style={{ marginLeft: "1%" }}>
                          <Button
                            size="sm"
                            color="danger"
                            style={{ color: "white" }}
                          >
                            Voltar
                          </Button>
                        </Link>
                      </Row>
                    </FormGroup>
                  </CardFooter>
                </Card>
              </Form>
            </Container>
          );
        }}
      </SalesContext.Consumer>
    </SalesContainer>
  );
}
