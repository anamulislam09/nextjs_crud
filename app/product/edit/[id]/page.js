'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = ({ params }) => {
    const router = useRouter();
    const [product, setProduct] = useState({
        product_name: "",
        price: "",
        description: "",
        status: ""
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [validationErrors, setValidationErrors] = useState({});

    // Unwrap params using React.use()
    const productId = React.use(params).id;

    // Fetch the existing product data when the component mounts
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                setErrorMessage("Error fetching product data.");
            }
        };

        fetchProduct();
    }, [productId]);

    const productSubmitForm = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/products/${productId}`, product);
            console.log('Product updated:', response.data);
            
            setSuccessMessage(response.data.message);
            setErrorMessage(""); // Clear any previous error messages
            setValidationErrors({}); // Clear validation errors

            // Redirect to the products page after successful update
            if (response.data.flag === true) {
                router.push('/product');
            }
        } catch (error) {
            console.error('Error updating product:', error);

            // Handle validation errors
            if (error.response && error.response.data && error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
                setErrorMessage(error.response.data.message || 'Validation errors occurred.');
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }

            // Clear the success message
            setSuccessMessage("");
        }
    };

    return (
        <div className='row'>
            <div className='col-lg-10 md-10 sm-10 m-auto'>
                <div className="card">
                    <div className="card-header">
                        <Link href={'/product'} className='btn btn-primary'>Cancel</Link>
                    </div>
                </div>

                <div className='card'>
                    <div className='card-header'>
                        <strong>Edit Product</strong>
                    </div>
                    <div className='card-body'>
                        {/* Show success or error message */}
                        {successMessage && (
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>{successMessage}</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>{errorMessage}</strong>
                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        )}

                        {/* Display validation errors */}
                        {Object.keys(validationErrors).length > 0 && (
                            <div className="alert alert-danger" role="alert">
                                <ul>
                                    {Object.entries(validationErrors).map(([field, errors], index) => (
                                        <li key={index}>{field}: {errors.join(', ')}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Product Name</label>
                                <input
                                    className='form-control'
                                    name='product_name'
                                    value={product.product_name}
                                    onChange={productSubmitForm}
                                    placeholder='Enter Product name'
                                />
                            </div>
                            <div className='form-group'>
                                <label>Price</label>
                                <input
                                    className='form-control'
                                    name='price'
                                    type="number"
                                    value={product.price}
                                    onChange={productSubmitForm}
                                    placeholder='Enter Product price'
                                />
                            </div>
                            <div className='form-group'>
                                <label>About Product</label>
                                <textarea
                                    className='form-control'
                                    name='description'
                                    value={product.description}
                                    onChange={productSubmitForm}
                                    placeholder='About this product'
                                />
                            </div>
                            <div className='form-group'>
                                <label>Status</label>
                                <select
                                    className='form-control'
                                    name='status'
                                    value={product.status}
                                    onChange={productSubmitForm}
                                >
                                    <option value="">Select Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <div className='form-group mt-3'>
                                <input
                                    type='submit'
                                    className='btn btn-success'
                                    value='Update'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
