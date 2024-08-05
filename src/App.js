import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProductListPage from "./pages/ProductListPage";
import AddEditProductPage from "./pages/AddEditProductPage";
import "./App.css";
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/add" element={<AddEditProductPage />} />
          <Route path="/edit/:id" element={<AddEditProductPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};
export default App;
