import React from 'react';
import ReactDatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-dateploader.css';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  selected?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  placeholder = 'Дд.мм.гггг',
  label,
  error
}: DatePickerProps) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      
      <ReactDatePicker
        selected={selected}
        onChange={onChange}
        placeholderText={placeholder}
        dateFormat="dd.MM.yyyy"
        className={`${styles.input} ${error ? styles.error : ''}`}
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        yearDropdownItemNumber={100}
        scrollableYearDropdown
      />
      
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};