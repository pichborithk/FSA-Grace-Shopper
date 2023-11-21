/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import styles from './ProductReviews.module.css';

const ProductReviews = ({ reviews, token, productId, setProduct }) => {
  const [content, setContent] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/reviews/${productId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content,
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success(result.messages);
        setProduct(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setContent('');
    }
  }

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.map(review => (
        <div key={review.id} className={styles.reviews}>
          <div className={styles.reviewer}>
            <p>{review.name[0].toUpperCase()}</p>
            <h2>{review.name}</h2>
          </div>
          <p>{review.content}</p>
          <hr />
        </div>
      ))}
      {token && (
        <form onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset}>
            <input
              name='review'
              placeholder='Tell me you thought...'
              value={content}
              onChange={event => setContent(event.target.value)}
              required
              className={styles.input}
            />
            {content && (
              <button>
                <i className='fa-sharp fa-solid fa-share fa-rotate-180'></i>
              </button>
            )}
          </fieldset>
        </form>
      )}
    </div>
  );
};

export default ProductReviews;
