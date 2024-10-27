'use client'
import getAllProduct from '@/lib/getAllProduct';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await getAllProduct();
            setProducts(productList);
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8000/api/products/${id}`);
                setProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
                alert('Product deleted successfully');
            } catch (error) {
                console.error("There was an error deleting the product!", error);
                alert('Error deleting product. Please try again.');
            }
        }
    };

    return (
        <div className='container'>
            <div className="card">
                <div className="card-header">
                    <Link href={'/product/create'} className='btn btn-info'>Add New</Link>
                </div>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th width="5%">SL</th>
                        <th>Product Name</th>
                        <th width="15%">Image</th>
                        <th width="30%">Description</th>
                        <th width="10%">Price</th>
                        <th width="10%">Status</th>
                        <th width="12%">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.product_name}</td>
                            <td>
                                {/* Assuming images are stored in 'http://localhost:8000/uploads/' */}
                                <img
                                    src={`http://localhost:8000/images/${product.image}`}
                                    alt={product.product_name}
                                    style={{ width: '100px', height: 'auto' }} // Set appropriate styling
                                />
                            </td>
                            <td>{product.description.substr(0, 80)}....</td>
                            <td>{product.price}</td>
                            <td>
                                {product.status === 1 ? (
                                    <span className='badge bg-info'>Active</span>
                                ) : (
                                    <span className='badge bg-danger'>Inactive</span>
                                )}
                            </td>
                            <td>
                                <Link href={`product/edit/${product.id}`} className='btn btn-success mr-1'>Edit</Link>
                                <button onClick={() => handleDelete(product.id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Page;
