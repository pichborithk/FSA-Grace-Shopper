import { useOutletContext, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
const Checkout = () => {
  const { setCart, token } = useOutletContext();
  const [searchParams] = useSearchParams();
  const result = searchParams.get('success');

  async function clearCart() {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/carts/me`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data.message);
  }
  useEffect(() => {
    if (result === 'true') {
      setCart([]);
      clearCart();
    }
  }, []);

  return <h1>Checkout Success</h1>;
};

export default Checkout;
