import React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  //implement the get products function
  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //implement the delete function
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className='prodcontainer'>
        {
          products.map((product) => {
            return (
              <Card key={product.id} className='prodcard'>
                <button className='delbtn' onClick={() => handleDelete(product.id)}>
                  <DeleteIcon />
                </button>
                <img src={product.imageUrl} alt={product.name} className='prod-img' />
                <CardContent>
                  <strong className='prodname'>{product.name}</strong>
                  <p className='proddesc'>{product.description}</p>
                  <strong>${product.price}</strong>
                </CardContent>
              </Card>
            )
          })
        }
      </div>
    </>
  );
};

export default ProductList;