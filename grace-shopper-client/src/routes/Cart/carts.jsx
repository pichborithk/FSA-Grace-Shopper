import './carts.css';
import { useOutletContext } from 'react-router-dom';

const Cart = () => {
  const { cart, setCart, token } = useOutletContext();

  const updateQuantity = async (productId, quantityChange) => {
    console.log(
      `Updating quantity of product ${productId} by ${quantityChange}`
    );
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/carts`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId,
            quantity: quantityChange,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      console.log('Update successful, new cart data:', data.data);
      setCart(data.data);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const increaseQuantity = async productId => {
    const product = cart.find(item => item.id === productId);
    if (!product) {
      console.error(`Product with id ${productId} not found in cart`);
      return;
    }
    await updateQuantity(productId, product.quantity + 1);
    console.log('Increase quantity');
    console.log(cart);
  };

  const decreaseQuantity = async productId => {
    const product = cart.find(item => item.id === productId);
    if (!product) {
      console.error(`Product with id ${productId} not found in cart`);
      return;
    }
    if (product.quantity > 1) {
      await updateQuantity(productId, product.quantity - 1);
    }
    console.log('Decrease quantity');
    console.log(cart);
  };

  const removeItem = async productId => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/carts`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: productId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setCart(data.data);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };
  const calculateTotal = () => {
    return cart.reduce((acc, currItem) => {
      const price = parseFloat(currItem.price.replace('$', ''));
      return acc + price * currItem.quantity;
    }, 0);
  };

  async function checkout() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart: cart,
          }),
        }
      );
      const result = await response.json();
      location.replace(result.data.url);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='cart-container'>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className='cart-items'>
          {cart.map((item, index) => (
            <li key={index} className='cart-item'>
              <img src={item.images[0]?.url} className='image' />
              <div className='item-info'>
                <h2>{item.name}</h2>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className='cart-total'>
        <h2>Total: ${calculateTotal().toFixed(2)}</h2>
        <button onClick={checkout}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
