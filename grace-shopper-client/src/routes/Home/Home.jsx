import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/footer';
import './Home.css';
import Slider from '../../components/Slider/Slider';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/products');
        const data = await response.json();

        if (data.success) {
          console.log('Data fetched successfully');
        }

        setProducts(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const trendingProducts = products.filter(
    product => product.type === 'trending'
  );
  const saleProducts = products.filter(product => product.type === 'on sale');
  const newProducts = products.filter(product => product.type === 'new');

  const renderProducts = products => (
    <div className='product-grid'>
      {products.map(product => (
        <div
          onClick={() => navigate(`/products/${product.id}`)}
          className='product-card'
          key={product.id}
        >
          <h2>{product.name}</h2>
          <p className='price'>{product.price}</p>
          <p className='category'>{product.type}</p>
          <p className='category'>{product.category}</p>
          <img src={product.images[0]?.url} className='image' />
        </div>
      ))}
    </div>
  );

  return (
    <div className='container'>
      <Slider />
      <h1>Trending</h1>
      {renderProducts(trendingProducts)}

      <h1>On Sale</h1>
      {renderProducts(saleProducts)}

      <h1>New</h1>
      {renderProducts(newProducts)}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
