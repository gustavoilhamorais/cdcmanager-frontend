import React, { useState, useEffect } from "react";
import SelectProduct from "../SelectProduct";
import { Data, ProductsContainer } from "../../../containers/Data/productsContainer";
import { Col, Row, Button, Input } from "reactstrap";
import Swal from "sweetalert2";

export default function SelectMultipleProducts(props) {
  const array = new Array();
  const [productList, setProductList] = useState(array);

  const handleNewField = () => {
    console.log(productList.length);
    if (productList.length === 0) {
      setProductList(["_product"]);
    } else if (productList[productList.length-1] === "_product") {
      Swal.fire({
        title: "Atenção!",
        html:
          "<p>Você possui um campo em branco. Utilize-o antes de adicionar outro.",
        type: "warning",
        showCloseButton: true
      });
    } else {
      let new_product_list = [...productList, "_product"];
      setProductList(new_product_list);
    }
  };

  const handleProductList = props => {
    const { product, amount, index, id } = props;
    const product_list = productList;
    let new_product_list = product_list.filter(
      fromList => fromList !== "_product"
    );
    new_product_list.push({ product, amount, id, index });
    setProductList(new_product_list);
  };

  function Product(props) {
    const [amount, setAmount] = useState(0);
    const [id, setID] = useState(null);
    const [index, setIndex] = useState(null);
    const [product, setProduct] = useState("");
    const [checkbox, setCheckbox] = useState(0);

    const removeProductFromList = index => {
      if (productList[props.index] === "_product")
        setProductList(productList.filter(item => item !== "_product"));
      else {
        setProductList(productList.filter(item => item.id !== index));
      }
    };

    const sendPropsUp = event => {
      if (index !== null && product !== "" && amount > 0) {
        handleProductList({ product, amount, index, id });
      }
    };

    if (props.selected !== undefined) {
      if (props.selected !== product) {
        setProduct(props.selected);
      }
    }

    if (props.amount !== undefined) {
      if (props.amount !== amount) {
        setAmount(props.amount);
      }
    }

    useEffect(() => {
      setIndex(props.index);
      sendPropsUp();
    }, [checkbox]);

    const isProductSelect = () => {
      if (productList[props.index].id === props.index) return true;
      else return false;
    };

    const handleSetProduct = product => {
      setProduct(product);
      const a = document.getElementsByName(product)
      setID(a[0].id);
    }

    return (
      <Row key={props.index}>
        <Col md="1">
          <Input
            value={checkbox}
            selected={isProductSelect()}
            type="checkbox"
            onChange={event => setCheckbox(checkbox ? false : true)}
          />
        </Col>
        <Col md="6">
          <SelectProduct
            key={"select " + props.index}
            selected={productList[props.index].product || product}
            onSelect={(product) => handleSetProduct(product)}
          />
        </Col>
        <Col md="2">
          <Input
            id={"input " + props.index}
            type="number"
            value={productList[props.index].amount || amount}
            onChange={event => setAmount(event.target.value)}
          />
        </Col>
        <Col md="1">
          <Button
            key={"deleteBtn " + props.index}
            id={index}
            className="mt-1"
            color="danger"
            size="sm"
            onClick={() => removeProductFromList(index)}
          >
            <i className="fas fa-trash" />
          </Button>
        </Col>
      </Row>
    );
  }

  useEffect(() => {
    return  () => productList[productList.length-1] !== "_product"
    ? props.callback(productList)
    : null;
  }, [productList]);

  return (
    <ProductsContainer>
      <Data.Consumer>
        {provider => (
          <Row style={{ marginLeft: "3%" }} callback={props.callback}>
            <Col>
              <Button
                onClick={() => handleNewField()}
                style={{ marginLeft: "2%", marginBottom: "1%" }}
                size="sm"
                color="primary"
              >
                <i className="fa fa-plus" /> Adicionar produto
              </Button>
              <Col>
                {productList.map((child, index) => (
                  <Product index={index} />
                ))}
              </Col>
            </Col>
          </Row>
        )}
      </Data.Consumer>
    </ProductsContainer>
  );
}
