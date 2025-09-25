import React from 'react';
import styles from './FormMessage.module.css';
import { memo } from 'react';
import clsx from 'clsx';

// Это компонент текста под полями input.
// Может быть как тип ошибка, тип успех, тип подсказка
export const MESSAGE_TYPES = {
  ERROR: 'error',
  SUCCESS: 'success',
  HINT: 'hint',
} as const;

type MessageType = typeof MESSAGE_TYPES[keyof typeof MESSAGE_TYPES]

type FormMessageProps = {
  message?: string;
  type?: MessageType;
};

/**
 * Компонент для отображения сообщений под полями ввода.
 * Поддерживает типы: ошибка, успех, подсказка.
 * @param message Текст сообщения
 * @param type Тип сообщения ('error', 'success', 'hint')
 */

export const FormMessage = memo(({ message, type = 'error' }: FormMessageProps) => {
  if (!message || message.trim() === '') return null;
  
  return (
    <p className={clsx(
      styles.message,
      type === 'error' && styles.error,
      type === 'success' && styles.success,
      type === 'hint' && styles.hint
      )}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      {message}
    </p>
  );
});