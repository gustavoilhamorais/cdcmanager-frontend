import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingContext,
  ShoppingContainer
} from "../../containers/Data/shoppingsContainer";
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
import SelectProvider from "../providers/SelectProvider";
import SelectMultipleProducts from "../products/SelectMultipleProducts";

export default function Main(props) {
  const [providerName, setProviderName] = useState("");
  const [discount, setDiscount] = useState("");
  const [products, setProducts] = useState("");
  const [nf, setNf] = useState("");
  const [shopValue, setShopValue] = useState("");
  const requestFROM = props.requestFROM || "/nova-compra";
  const back =
    requestFROM === "/nova-compra" ? "/compras" : "/pedidos-de-compra";
  const title =
    props.requestFROM === "/novo-pedido-de-compra"
      ? "Novo Pedido Compra"
      : "Nova Compra";
  return (
    <ShoppingContainer>
      <ShoppingContext.Consumer>
        {provider => {
          return (
            <Container>
              <Form>
                <Card title={title}>
                  <CardHeader>
                    <h4>{title}</h4>
                  </CardHeader>
                  <CardBody>
                    <Col md="5">
                      <FormGroup>
                        <FormText>Fornecedor</FormText>
                        <SelectProvider
                          options={provider.state.providers}
                          onSelect={providerName =>
                            setProviderName(providerName)
                          }
                        />
                        <FormText>Desconto</FormText>
                        <Input
                          type="number"
                          provider={discount}
                          placeholder="Ex.: 0.10%"
                          onChange={e => setDiscount(e.target.value)}
                          value={discount}
                          required
                        />
                        <FormText>Nota Fiscal</FormText>
                        <Input
                          type="text"
                          provider={nf}
                          placeholder="NF - "
                          onChange={e => setNf(e.target.value)}
                          value={nf}
                          required
                        />
                        <FormText>Valor da Compra</FormText>
                        <Input
                          type="number"
                          provider={shopValue}
                          placeholder="R$"
                          onChange={e => setShopValue(e.target.value)}
                          value={shopValue}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <FormText>Produtos</FormText>
                    <SelectMultipleProducts callback={(productList) => setProducts(productList)}/>
                  </CardBody>
                  <CardFooter>
                    <FormGroup>
                      <Row>
                        <Button
                          onClick={() =>
                            provider.createShopping({
                              providerName,
                              discount,
                              products,
                              nf,
                              shopValue,
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
      </ShoppingContext.Consumer>
    </ShoppingContainer>
  );
}
