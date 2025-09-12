import React from 'react';
import styles from './FormError.module.css';

type FormErrorProps = {
  message?: string;
};

export const FormError = ({ message }: FormErrorProps) => {
  return message ? <p className={styles.error}>{message}</p> : null;
};