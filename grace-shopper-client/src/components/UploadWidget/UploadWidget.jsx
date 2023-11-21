/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

const UploadWidget = ({ index, handleUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
      },
      function (error, result) {
        if (result.event === 'success') {
          handleUpload(index, result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <button onClick={() => widgetRef.current.open()} type='button'>
      Upload
    </button>
  );
};

export default UploadWidget;
