import React, { useState, useRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker-custom.css";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import styles from "./DatePicker.module.css";
import calendarIcon from "../../assets/icons/calendar.svg";

registerLocale('ru', ru);

interface DatePickerProps {
  selected?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  className?: string;
}

interface CustomHeaderProps {
  date: Date;
  changeYear: (year: number) => void;
  changeMonth: (month: number) => void;
}

const CustomCalendarContainer = ({ 
  children, 
  onCancel, 
  onSelect 
}: { 
  children: React.ReactNode;
  onCancel: () => void;
  onSelect: () => void;
}) => {
  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarContent}>
        {children}
      </div>
      <div className={styles.footerButtons}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Отменить
        </button>
        <button
          type="button"
          className={styles.selectButton}
          onClick={onSelect}
        >
          Выбрать
        </button>
      </div>
    </div>
  );
};

export const DatePicker: React.FC<DatePickerProps> = ({
  selected,
  onChange,
  placeholder = 'Дд.мм.гггг',
  label,
  error,
  className,
}) => {
  const [tempDate, setTempDate] = useState<Date | null>(selected || null);
  const datePickerRef = useRef<ReactDatePicker>(null);

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
  }: CustomHeaderProps) => (
    <div className={styles.customHeader}>
      <div className={styles.selectors}>
        <select
          value={date.getMonth()}
          onChange={({ target: { value } }) => changeMonth(parseInt(value))}
          className={styles.monthSelector}
        >
          <option value={0}>Январь</option>
          <option value={1}>Февраль</option>
          <option value={2}>Март</option>
          <option value={3}>Апрель</option>
          <option value={4}>Май</option>
          <option value={5}>Июнь</option>
          <option value={6}>Июль</option>
          <option value={7}>Август</option>
          <option value={8}>Сентябрь</option>
          <option value={9}>Октябрь</option>
          <option value={10}>Ноябрь</option>
          <option value={11}>Декабрь</option>
        </select>
        
        <select
          value={date.getFullYear()}
          onChange={({ target: { value } }) => changeYear(parseInt(value))}
          className={styles.yearSelector}
        >
          {Array.from({ length: 100 }, (_, i) => {
            const year = new Date().getFullYear() - 80 + i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );

  const CustomInput = ({ value, onClick }: { value?: string; onClick?: () => void }) => (
    <div className={styles.inputContainer} onClick={onClick}>
      <input
        className={`${styles.input} ${error ? styles.error : ''}`}
        value={value}
        placeholder={placeholder}
        readOnly
      />
      <img src={calendarIcon} alt="calendar" className={styles.calendarIcon} />
    </div>
  );

  const handleCancel = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  const handleSelect = () => {
    if (tempDate) {
      onChange(tempDate);
    }
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setTempDate(date);
  };

  const calendarContainer = ({ children }: { children: React.ReactNode }) => (
    <CustomCalendarContainer onCancel={handleCancel} onSelect={handleSelect}>
      {children}
    </CustomCalendarContainer>
  );

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      
      <ReactDatePicker
        ref={datePickerRef}
        selected={tempDate}
        onChange={handleDateChange}
        customInput={<CustomInput />}
        dateFormat="dd.MM.yyyy"
        renderCustomHeader={renderCustomHeader}
        locale="ru"
        showPopperArrow={false}
        fixedHeight
        isClearable={false}
        onCalendarOpen={() => {
          setTempDate(selected || null);
        }}
        shouldCloseOnSelect={false}
        calendarContainer={calendarContainer}
        popperClassName={styles.popper}
      />
      
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};