import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, deleteMultipleProducts } from "../redux/actions";
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";
import "./ProductListPage.css";

const ProductListPage = () => {
  const products = useSelector((state) => state?.products);
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected?.includes(id)
        ? prevSelected?.filter((prodId) => prodId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedProducts(
      e?.target?.checked ? products?.map((product) => product?.id) : []
    );
  };

  const handleMultipleDelete = () => {
    if (window.confirm("Are you sure you want to delete selected products?")) {
      dispatch(deleteMultipleProducts(selectedProducts));
      setSelectedProducts([]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e?.target?.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e?.target?.value);
  };

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      const newDirection =
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc";
      return { key, direction: newDirection };
    });
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) => categoryFilter === "" || product.category === categoryFilter
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  return (
    <Container className="mt-4">
      <div className="page-header">
        <h1>Product List</h1>
        <div className="btn-actions">
          <Link to="/add" className="btn btn-success">
            Add Product
          </Link>
          <Button
            variant="danger"
            onClick={handleMultipleDelete}
            disabled={selectedProducts?.length === 0}
          >
            Delete Selected
          </Button>
        </div>
      </div>
      <Row className="mb-3">
        <Col md={4}>
          <Form.Group controlId="search">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="categoryFilter">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
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
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedProducts?.length === products?.length}
              />
            </th>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortConfig?.key === "name"
                ? sortConfig?.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("category")}>
              Category{" "}
              {sortConfig?.key === "category"
                ? sortConfig?.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("description")}>
              Description{" "}
              {sortConfig?.key === "description"
                ? sortConfig?.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("expiryDate")}>
              Expiry Date{" "}
              {sortConfig?.key === "expiryDate"
                ? sortConfig?.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("costPrice")}>
              Cost Price{" "}
              {sortConfig?.key === "costPrice"
                ? sortConfig?.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("sellPrice")}>
              Sell Price{" "}
              {sortConfig?.key === "sellPrice"
                ? sortConfig?.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("discount")}>
              Discount(%){" "}
              {sortConfig?.key === "discount"
                ? sortConfig?.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("discountedSellPrice")}>
              Discounted Sell Price{" "}
              {sortConfig?.key === "discountedSellPrice"
                ? sortConfig?.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th onClick={() => handleSort("finalPrice")}>
              Final Price{" "}
              {sortConfig?.key === "finalPrice"
                ? sortConfig?.direction === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts?.map((product) => (
            <tr key={product?.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={selectedProducts.includes(product?.id)}
                  onChange={() => handleSelectProduct(product?.id)}
                />
              </td>
              <td>{product?.name}</td>
              <td>{product?.category}</td>
              <td>{product?.description}</td>
              <td>{product?.expiryDate}</td>
              <td>{product?.costPrice}</td>
              <td>{product?.sellPrice}</td>
              <td>{product?.discount}</td>
              <td>{product?.discountedSellPrice}</td>
              <td>{product?.finalPrice}</td>
              <td>
                <div className="action-buttons">
                  <Link
                    to={`/edit/${product?.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(product?.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <h2>Total Prices</h2>
        <Row>
          <Col>
            <strong>Total Cost Price:</strong>{" "}
            {filteredProducts.reduce(
              (total, product) => total + parseFloat(product.costPrice || 0),
              0
            )}
          </Col>
          <Col>
            <strong>Total Sell Price:</strong>{" "}
            {filteredProducts?.reduce(
              (total, product) => total + parseFloat(product?.sellPrice || 0),
              0
            )}
          </Col>
          <Col>
            <strong>Total Discounted Sell Price:</strong>{" "}
            {filteredProducts?.reduce(
              (total, product) =>
                total + parseFloat(product?.discountedSellPrice || 0),
              0
            )}
          </Col>
          <Col>
            <strong>Total Final Price:</strong>{" "}
            {filteredProducts?.reduce(
              (total, product) => total + parseFloat(product?.finalPrice || 0),
              0
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ProductListPage;
