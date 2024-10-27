'use client'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter

const Page = () => {
  const router = useRouter(); // Initialize useRouter for redirection
  const [product, setProduct] = useState({
    product_name: "",
    price: "",
    description: "",
    status: "",
    image: null
  });
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for general error message
  const [validationErrors, setValidationErrors] = useState({}); // State for validation errors

  const productSubmitForm = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear previous messages
    setErrorMessage("");
    setValidationErrors({});

    try {
      // Use FormData to handle the file upload
      const formData = new FormData();
      formData.append('product_name', product.product_name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('status', product.status);
      formData.append('image', product.image); // Append the selected image file

      const response = await axios.post('http://localhost:8000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Product created:', response.data);

      // Check if the response indicates a successful operation
      if (response.data.flag === true) {
        // Set the success message
        setSuccessMessage(response.data.message);

        // Reset the form
        setProduct({
          product_name: "",
          price: "",
          description: "",
          status: "",
          image: null
        });

        // Redirect to the products page after a successfully inserted
        router.push('/product');
      } else {
        // If flag is false, treat it as an error
        setErrorMessage(response.data.message || 'An error occurred.');
        setValidationErrors(response.data.errors || {});
      }

    } catch (error) {
      console.error('Error creating product:', error);

      // Handle validation errors
      if (error.response && error.response.data && error.response.data.errors) {
        setValidationErrors(error.response.data.errors);
        setErrorMessage(error.response.data.message || 'Validation errors occurred.');
      } else {
        // Set a general error message
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className='row'>
      <div className='col-lg-10 md-10 sm-10 m-auto'>
        <div className="card">
          <div className="card-header">
            <Link href={'/product'} className='btn btn-primary'>See all products</Link>
          </div>
        </div>

        <div className='card'>
          <div className='card-header'>
            <strong>Create Product</strong>
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
              <div className='form-group'>
                <label>Product Image</label>
                <input
                  type='file'
                  className='form-control'
                  onChange={handleImageChange}
                />
              </div>
              <div className='form-group mt-3'>
                <input
                  type='submit'
                  className='btn btn-success'
                  value='Submit'
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
