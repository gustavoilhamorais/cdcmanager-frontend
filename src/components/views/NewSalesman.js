import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  SalesmanContainer,
  Data
} from "../../containers/Data/salesmanContainer";
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
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [ID, setID] = useState("");

  useEffect(() => {
    console.log(ID);
  }, [ID]);

  return (
    <SalesmanContainer>
      <Data.Consumer>
        {provider => {
          return (
            <Container>
              <Form>
                <Card title="Novo Fornecedor">
                  <CardHeader>
                    <h4>Novo Vendedor</h4>
                  </CardHeader>
                  <CardBody>
                    <Col md="5">
                      <FormGroup>
                        <FormText>Nome</FormText>
                        <Input
                          type="text"
                          name={name}
                          placeholder="Nome Sobrenome"
                          onChange={e => setName(e.target.value)}
                          value={name}
                          required
                        />
                        <FormText>Telefone</FormText>
                        <Input
                          type="phone"
                          name={phone}
                          placeholder="55 9 9877 6655"
                          onChange={e => setPhone(e.target.value)}
                          value={phone}
                          required
                        />
                        <FormText>Email</FormText>
                        <Input
                          type="email"
                          name={email}
                          placeholder="vendedor@email.com.br"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                        <FormText>Endereço</FormText>
                        <Input
                          type="text"
                          name={address}
                          placeholder="R. Exemplo, 1234, Centro"
                          onChange={e => setAddress(e.target.value)}
                          value={address}
                          required
                        />
                        <FormText>ID</FormText>
                        <Input
                          type="number"
                          name={ID}
                          placeholder="Crie um ID para seu vendedor"
                          onChange={e => setID(e.target.value)}
                          value={ID}
                          required
                        />
                      </FormGroup>
                    </Col>
                  </CardBody>
                  <CardFooter>
                    <FormGroup>
                      <Row>
                        <Button
                          onClick={() => provider.createSalesman({ name, phone, email ,address, ID })}
                          size="sm"
                          color="primary"
                          style={{ color: "white", marginLeft: "1%" }}
                        >
                          Salvar
                        </Button>
                        <Link to="/vendedores" style={{ marginLeft: "1%" }}>
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
    </SalesmanContainer>
  );
}
