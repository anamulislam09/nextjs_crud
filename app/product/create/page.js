'use client'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'

const page = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className='row'>
      <div className='col-lg-10 md-10 sm-10 m-auto'>
        <div className="card">
          <div className="card-header">
            <Link href={'/product'} className='btn btn-primary'>See all product</Link>
          </div>
        </div>

        <div className='card'>
          <div className='card-header'>
            <strong>Create form</strong>
          </div>
          <div className='card-body'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label>Product Name</label>
                <input className='form-control' name='product_name' placeholder='Enter Product name'></input>
              </div>
              <div className='form-group'>
                <label>Price</label>
                <input className='form-control' name='price' placeholder='Enter Product price'></input>
              </div>
              <div className='form-group'>
                <label>Status</label>
                <select className='form-control'>
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </select>
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
  )
}

export default page