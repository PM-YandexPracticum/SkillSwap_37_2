import React from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

interface InputProps {
  label?: string;
  className?: string;
  placeholder?: string;
  errorMessage?: string;
  error?: boolean; 
  id?: string;
  icon?: string; 
  type?: 'text' | 'search' | 'tel' | 'email' | 'password';
};

export const Input = ({
  label, 
  placeholder, 
  errorMessage, 
  error, 
  id, 
  type = 'text',
  icon,
  className,
  ...otherProps
}: InputProps) => {
  return (
    <div className={styles.wrapper}> 
      {label && (
        <label htmlFor={id} className={styles.label}> 
          {label} 
        </label>
      )}
      <div className={styles.inputContainer}>
        {icon && (
          <div className={styles.iconContainer}>
            <img src={icon}/>
          </div>
        )}
        <input 
          className={clsx(
            styles.input, 
            { 
              [styles.error]: error,
              [styles.withicon]: icon 
            },
            className
          )} 
          placeholder={placeholder} 
          id={id}
          type={type}
          {...otherProps}
        />
      </div>
      {error && (
        <span className={styles.textError}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};