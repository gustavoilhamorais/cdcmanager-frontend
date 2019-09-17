import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  ProvidersContainer,
  Data
} from "../../containers/Data/providersContainer";
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
import ChooseDocument from '../models/ChooseDocument';

export default function Main(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [document, setDocument] = useState("");
  useEffect(() => {
    console.log(document);
  }, [document]);

  return (
    <ProvidersContainer>
      <Data.Consumer>
        {provider => {
          return (
            <Container>
              <Form>
                <Card title="Novo Fornecedor">
                  <CardHeader>
                    <h4>Novo Fornecedor</h4>
                  </CardHeader>
                  <CardBody>
                    <Col md="5">
                      <FormGroup>
                        <FormText>Nome</FormText>
                        <Input
                          type="text"
                          name={name}
                          onChange={e => setName(e.target.value)}
                          value={name}
                          required
                        />
                        <FormText>Telefone</FormText>
                        <Input
                          type="text"
                          name={phone}
                          onChange={e => setPhone(e.target.value)}
                          value={phone}
                          required
                        />
                        <FormText>Email</FormText>
                        <Input
                          type="text"
                          name={email}
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                        <FormText>Endereço</FormText>
                        <Input
                          type="text"
                          name={address}
                          onChange={e => setAddress(e.target.value)}
                          value={address}
                          required
                        />
                        <ChooseDocument onChange={e => setDocument(e.target.value)} value={document}/>
                      </FormGroup>
                    </Col>
                  </CardBody>
                  <CardFooter>
                    <FormGroup>
                      <Row>
                        <Button
                          onClick={() => provider.createProvider({ name, phone, email ,address, document })}
                          size="sm"
                          color="primary"
                          style={{ color: "white", marginLeft: "1%" }}
                        >
                          Salvar
                        </Button>
                        <Link to="/fornecedores" style={{ marginLeft: "1%" }}>
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
    </ProvidersContainer>
  );
}
