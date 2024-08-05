import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./AddEditProductForm.css";

const AddEditProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productToEdit = useSelector((state) =>
    state?.products?.find((prod) => prod?.id === id)
  );

  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    expiryDate: "",
    costPrice: "",
    sellPrice: "",
    discount: "",
    discountedSellPrice: "",
    finalPrice: "",
  });

  useEffect(() => {
    if (productToEdit) {
      setProduct({
        ...productToEdit,
        discountedSellPrice: calculateDiscountedSellPrice(productToEdit),
        finalPrice: calculateFinalPrice(productToEdit),
      });
    }
  }, [productToEdit]);

  const calculateDiscountedSellPrice = (prod) => {
    const discount = parseFloat(prod?.discount) || 0;
    const sellPrice = parseFloat(prod?.sellPrice) || 0;
    return (sellPrice - (sellPrice * discount) / 100).toFixed(2);
  };

  const calculateFinalPrice = (prod) => {
    return calculateDiscountedSellPrice(prod);
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (product?.discount || product?.sellPrice) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        discountedSellPrice: calculateDiscountedSellPrice(prevProduct),
        finalPrice: calculateFinalPrice(prevProduct),
      }));
    }
  }, [product?.discount, product?.sellPrice]);

  const handleSubmit = (e) => {
    e?.preventDefault();

    if (id) {
      dispatch(editProduct(product));
    } else {
      dispatch(addProduct({ ...product, id: uuidv4() }));
    }
    navigate("/");
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product?.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={product?.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Category1">Category1</option>
                <option value="Category2">Category2</option>
                <option value="Category3">Category3</option>
                <option value="Category4">Category4</option>
                <option value="Category5">Category5</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={product?.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formExpiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                name="expiryDate"
                value={product?.expiryDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCostPrice">
              <Form.Label>Cost Price</Form.Label>
              <Form.Control
                type="number"
                name="costPrice"
                value={product?.costPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formSellPrice">
              <Form.Label>Sell Price</Form.Label>
              <Form.Control
                type="number"
                name="sellPrice"
                value={product?.sellPrice}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDiscount">
              <Form.Label>Discount(%)</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                value={product?.discount}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="formDiscountedSellPrice">
              <Form.Label>Discounted Sell Price</Form.Label>
              <Form.Control
                type="number"
                name="discountedSellPrice"
                value={product?.discountedSellPrice}
                readOnly
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formFinalPrice">
              <Form.Label>Final Price</Form.Label>
              <Form.Control
                type="number"
                name="finalPrice"
                value={product?.finalPrice}
                readOnly
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          {id ? "Edit" : "Add"} Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddEditProductForm;
