import React, { useState } from 'react';
import styles from './Buttonio.module.scss'
// Интерфейс для данных формы
export interface EventFormData {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  userName: string;
}

// Стили для кнопки добавления
const addButtonStyle = {
  backgroundColor: '#10b981',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  marginBottom: '16px'
};

// Компонент зеленой кнопки "Добавить"
export const AddButton: React.FC<{
  onClick: () => void;
  label?: string;
}> = ({ onClick, label = "Добавить" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        ...addButtonStyle,
        opacity: isHovered ? 0.9 : 1
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </button>
  );
};

// Стили для попапа
const popupStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  popup: {
    backgroundColor: '#2C384A',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  popupTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#6b7280',
    padding: '0',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box' as const
  },
  inputFocus: {
    outline: 'none',
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
  },
  dateTimeRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    marginTop: '24px'
  },
  cancelButton: {
    padding: '10px 20px',
    borderRadius: '4px',
    // backgroundColor: '#2c384a',
    backgroundColor: '#1d2633',
    color: '#fff',
    cursor: 'pointer',
    
    fontSize: '14px',
    fontWeight: '500'
  },
  submitButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#10b981',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  }
};

// Компонент попапа добавления
export const AddEventPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  formData: EventFormData;
  onFormChange: (field: keyof EventFormData, value: string) => void;
  onSubmit: () => void;
  title?: string;
}> = ({ isOpen, onClose, formData, onFormChange, onSubmit, title = "Добавить событие" }) => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const getInputStyle = (fieldName: string) => ({
    ...popupStyles.input,
    ...(focusedField === fieldName ? popupStyles.inputFocus : {})
  });

  return (
    <div style={popupStyles.overlay}>
      <div style={popupStyles.popup}>
        <div style={popupStyles.popupHeader}>
          <h2 style={popupStyles.popupTitle}>{title}</h2>
          <button
            style={popupStyles.closeButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            ×
          </button>
        </div>

        <div style={popupStyles.formGroup}>
          <label style={popupStyles.label}>Название события</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => onFormChange('title', e.target.value)}
            style={getInputStyle('title')}
            onFocus={() => setFocusedField('title')}
            onBlur={() => setFocusedField(null)}
            placeholder="Введите название события"
          />
        </div>

        <div style={popupStyles.formGroup}>
          <label style={popupStyles.label}>Дата и время начала</label>
          <div style={popupStyles.dateTimeRow}>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => onFormChange('startDate', e.target.value)}
              style={getInputStyle('startDate')}
              onFocus={() => setFocusedField('startDate')}
              className={styles.fast2}
              onBlur={() => setFocusedField(null)}
            />
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => onFormChange('startTime', e.target.value)}
              style={getInputStyle('startTime')}
              onFocus={() => setFocusedField('startTime')}
              className={styles.fast2}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        <div style={popupStyles.formGroup}>
          <label style={popupStyles.label}>Дата и время окончания</label>
          <div style={popupStyles.dateTimeRow}>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => onFormChange('endDate', e.target.value)}
              style={getInputStyle('endDate')}
              onFocus={() => setFocusedField('endDate')}
              className={styles.fast2}
              onBlur={() => setFocusedField(null)}
            />
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => onFormChange('endTime', e.target.value)}
              style={getInputStyle('endTime')}
              className={styles.fast2}
              onFocus={() => setFocusedField('endTime')}
              onBlur={() => setFocusedField(null)}
            />
          </div>
        </div>

        <div style={popupStyles.formGroup}>
          <label style={popupStyles.label}>Имя пользователя</label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => onFormChange('userName', e.target.value)}
            style={getInputStyle('userName')}
            onFocus={() => setFocusedField('userName')}
            onBlur={() => setFocusedField(null)}
            placeholder="Введите имя пользователя"
          />
        </div>

        <div style={popupStyles.buttonGroup}>
          <button
            style={popupStyles.cancelButton}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'white';
            }}
          >
            Отмена
          </button>
          <button
            style={popupStyles.submitButton}
            onClick={onSubmit}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};