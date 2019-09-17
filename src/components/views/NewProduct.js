import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  ProductsContainer,
  Data
} from "../../containers/Data/productsContainer";
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

export default function Main(props) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [sellValue, setSellValue] = useState("");
  const [buyValue, setBuyValue] = useState("");
  const [atStorage, setAtStorage] = useState("");
  const [minimumAtStorage, setMinimumAtStorage] = useState("");

  return (
    <ProductsContainer>
      <Data.Consumer>
        {provider => {
          return (
            <Container>
              <Form>
                <Card>
                  <CardHeader title="Novo Produto">
                    <h4>Novo Produto</h4>
                  </CardHeader>
                  <CardBody>
                    <Col md="5">
                      <FormGroup>
                        <FormText>Nome do Produto</FormText>
                        <Input
                          type="text"
                          name={name}
                          onChange={e => setName(e.target.value)}
                          value={name}
                          required
                        />
                        <FormText>Código do Produto</FormText>
                        <Input
                          type="number"
                          name={code}
                          onChange={e => setCode(e.target.value)}
                          value={code}
                          required
                        />
                        <FormText>Valor de Venda</FormText>
                        <Input
                          type="text"
                          name={sellValue}
                          onChange={e => setSellValue(e.target.value)}
                          value={sellValue}
                          required
                        />
                        <FormText>Custo Médio</FormText>
                        <Input
                          type="text"
                          name={buyValue}
                          onChange={e => setBuyValue(e.target.value)}
                          value={buyValue}
                          required
                        />
                        <FormText>Disponível em Estoque</FormText>
                        <Input
                          type="number"
                          name={atStorage}
                          onChange={e => setAtStorage(e.target.value)}
                          value={atStorage}
                          required
                        />
                        <FormText>Mínimo em Estoque</FormText>
                        <Input
                          type="number"
                          name={minimumAtStorage}
                          onChange={e => setMinimumAtStorage(e.target.value)}
                          value={minimumAtStorage}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </CardBody>
                  <CardFooter>
                    <FormGroup>
                      <Row>
                        <Button
                          onClick={() =>
                            provider.createProduct({
                              name,
                              code,
                              sellValue,
                              buyValue,
                              atStorage,
                              minimumAtStorage
                            })
                          }
                          size="sm"
                          color="primary"
                          style={{ color: "white", marginLeft: "1%" }}
                        >
                          Salvar
                        </Button>
                        <Link to="/produtos" style={{ marginLeft: "1%" }}>
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
      </Data.Consumer>
    </ProductsContainer>
  );
}
