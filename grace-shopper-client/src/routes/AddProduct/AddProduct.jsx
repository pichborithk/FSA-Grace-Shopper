import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useOutletContext } from 'react-router-dom';
import DynamicInput from '../../components/DynamicInput/DynamicInput';
import Input from '../../components/Input/Input';

import styles from './AddProduct.module.css';

const AddProduct = () => {
  const { token } = useOutletContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState([]);

  async function createProduct() {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/products`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price,
          quantity: Number(quantity),
          type,
          category,
          urls: images,
        }),
      }
    );

    console.log(response);
    return await response.json();
  }

  async function handleSubmit(event) {
    console.log(images);
    event.preventDefault();

    try {
      const result = await createProduct();
      console.log(result);

      if (result.error) {
        toast.error(result.message);
      }

      if (result.data) {
        // setProducts(prev => [...prev, result.data]);
        toast.success('Successful create new product');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setType('');
      setCategory('');
      setImages([]);
    }
  }

  function handleCancel() {
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setType('');
    setCategory('');
    setImages([]);
    navigate('/');
  }

  return (
    <div id="product-form">
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Create New Product</h1>
      <Input
        value={name}
        setValue={setName}
        name='product-name'
        type='text'
        required={true}
        label='Name*'
      />
      <Input
        value={description}
        setValue={setDescription}
        name='routine-name'
        type='text'
        required={true}
        label='Description*'
      />
      <Input
        value={price}
        setValue={setPrice}
        name='product-price'
        type='text'
        required={true}
        label='Price*'
      />
      <Input
        value={quantity}
        setValue={setQuantity}
        name='product-quantity'
        type='text'
        required={true}
        label='Quantity*'
      />
      <Input
        value={type}
        setValue={setType}
        name='product-type'
        type='text'
        required={true}
        label='Type*'
      />
      <Input
        value={category}
        setValue={setCategory}
        name='product-category'
        type='text'
        required={true}
        label='Category*'
      />
      <DynamicInput
        value={images}
        setValue={setImages}
        name='picture'
        type='text'
        required={true}
        label='Picture URL'
      />
      <div className={styles.buttons}>
        <button>Create</button>
        <button type='button' onClick={() => handleCancel()}>
          Cancel
        </button>
      </div>
    </form>
    </div>
  );
};

export default AddProduct;
