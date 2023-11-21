import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/products`
      );
      const data = await response.json();
      if (data.success) {
        console.log('Data fetched successfully');
      }
      setProducts(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container product-grid'>
      <h1>Products</h1>
      {products.map((product) => (
        <div
          onClick={() => navigate(`/products/${product.id}`)}
          className='product-card'
          key={product.id}
        >
          <h2>{product.name}</h2>
          <p className='price'>{product.price}</p>
          <p className='category'>{product.category}</p>
          <img src={product.images[0]?.url} className='image' />
        </div>
      ))}
    </div>
  );
};

export default Products;
