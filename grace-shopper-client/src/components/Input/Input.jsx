/* eslint-disable react/prop-types */
import styles from './Input.module.css';

const Input = ({ value, setValue, required, name, type, label }) => {
  return (
    <fieldset className={styles.fieldset}>
      <label
        htmlFor={name}
        className={`${styles.label} ${value && styles.active}`}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        id={name}
        required={required}
        value={value}
        onChange={event => setValue(event.target.value)}
        className={styles.input}
      />
    </fieldset>
  );
};

export default Input;
