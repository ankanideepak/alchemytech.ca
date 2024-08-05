import React from 'react';
import AddEditProductForm from '../components/AddEditProductForm';
import { Container } from 'react-bootstrap';

const AddEditProductPage = () => {
    return (
        <Container className="mt-4">
            <h1>{window.location.pathname.includes('edit') ? 'Edit' : 'Add'} Product</h1>
            <AddEditProductForm />
        </Container>
    );
};

export default AddEditProductPage;
