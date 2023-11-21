import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Men.css';
const Men = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/products`
        );
        const data = await response.json();

        if (data.success) {
          console.log('Data fetched successfully');
        }

        const menProducts = data.data.filter(
          (product) => product.category === 'men'
        );
        setProducts(menProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className='product-grid'>
        {products.map((product) => (
          <div
            onClick={() => navigate(`/products/${product.id}`)}
            key={product.id}
          >
            <div className='product-card' key={product.id}>
              <h2>{product.name}</h2>

              <p className='price'>{product.price}</p>
              <p className='category'>{product.category}</p>
              <img src={product.images[0]?.url} className='image' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Men;
