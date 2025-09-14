import React from 'react';
import styles from './FormMessage.module.css';

import clsx from 'clsx';

// Это компонент текста под полями input.
// Может быть как тип ошибка, тип успех, тип подсказка

type FormMessageProps = {
  message?: string;
  type?: 'error' | 'success' | 'hint';
};

export const FormMessage = ({ message, type = 'error' }: FormMessageProps) => {
  if (!message) return null;
  
  return (
    <p className={clsx(
      styles.message,
      type === 'error' && styles.error,
      type === 'success' && styles.success,
      type === 'hint' && styles.hint
    )}>
      {message}
    </p>
  );
};