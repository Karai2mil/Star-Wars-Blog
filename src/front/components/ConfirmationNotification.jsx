import React from 'react';
import { toast } from 'react-toastify';
import styles from './Styles.module.css'

const ConfirmationNotification = ({ message, onConfirm }) => {
  const confirmAction = () => {
    toast.dismiss(); // Cierra la notificación actual
    onConfirm(); // Ejecuta la función de confirmación
  };

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <p className={styles.font} style={{margin: '0'}}>{message}</p>
      <button className={styles.confirmBtn} onClick={confirmAction}>yes</button>
    </div>
  );
};

export default ConfirmationNotification;
