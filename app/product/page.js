
import getAllProduct from '@/lib/getAllProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';

const Page = async () => {
    const products = await getAllProduct();

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <Link href={'/product/create'} className='btn btn-info'>Add New</Link>
                </div>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Product Name</th>
                        <th width = "15%">Image</th>
                        <th width="30%">Description</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th width="10%">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id} >
                            <td>{index + 1}</td>
                            <td>{product.product_name}</td>
                            <td>
                                <img src={product.image} alt={product.product_name}  />
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
                                <Link href={'product'} className='btn btn-success'>Edit</Link>
                                <Link href={'product'} className='btn btn-danger'>Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Page;
