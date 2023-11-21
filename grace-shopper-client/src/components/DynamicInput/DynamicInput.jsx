/* eslint-disable react/prop-types */
import UploadWidget from '../UploadWidget/UploadWidget';
import styles from './DynamicInput.module.css';

const DynamicInput = props => {
  const { value, setValue, name, type, required, label } = props;

  function handleInput(index) {
    return function (event) {
      const newValue = [...value];
      newValue[index] = event.target.value;
      setValue(newValue);
    };
  }

  function handleUpload(index, url) {
    const newValue = [...value];
    newValue[index] = url;
    setValue(newValue);
  }

  function addField() {
    setValue([...value, '']);
  }

  function removeField(index) {
    const newValue = [...value];
    newValue.splice(index, 1);
    setValue(newValue);
  }

  return (
    <div className={styles.div}>
      {value.map((element, index) => (
        <fieldset key={index} className={styles.fieldset}>
          <label
            htmlFor={name + (index + 1)}
            className={`${styles.label} ${element && styles.active}`}
          >
            {label}
          </label>
          <input
            name={name + (index + 1)}
            type={type}
            id={name + (index + 1)}
            required={required}
            value={element}
            onChange={handleInput(index)}
            className={styles.input}
          />
          <UploadWidget index={index} handleUpload={handleUpload} />
          <button
            type='button'
            onClick={() => removeField(index)}
            className={styles.removeBtn}
          >
            -
          </button>
        </fieldset>
      ))}
      <button type='button' onClick={addField} className={styles.addBtn}>
        Add Photo
      </button>
    </div>
  );
};

export default DynamicInput;
