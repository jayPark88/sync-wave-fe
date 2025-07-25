import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import '../../styles/ScheduleForm.css';

const ScheduleForm = ({ schedule, onSubmit, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDateTime: '',
    endDateTime: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (schedule && isEdit) {
      setFormData({
        title: schedule.title || '',
        description: schedule.description || '',
        startDateTime: schedule.startDateTime ? format(new Date(schedule.startDateTime), "yyyy-MM-dd'T'HH:mm") : '',
        endDateTime: schedule.endDateTime ? format(new Date(schedule.endDateTime), "yyyy-MM-dd'T'HH:mm") : ''
      });
    }
  }, [schedule, isEdit]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요';
    } else if (formData.title.length > 100) {
      newErrors.title = '제목은 100자 이하여야 합니다';
    }

    if (!formData.description.trim()) {
      newErrors.description = '설명을 입력해주세요';
    } else if (formData.description.length > 500) {
      newErrors.description = '설명은 500자 이하여야 합니다';
    }

    if (!formData.startDateTime) {
      newErrors.startDateTime = '시작 시간을 선택해주세요';
    }

    if (!formData.endDateTime) {
      newErrors.endDateTime = '종료 시간을 선택해주세요';
    }

    if (formData.startDateTime && formData.endDateTime) {
      const startDate = new Date(formData.startDateTime);
      const endDate = new Date(formData.endDateTime);
      
      if (startDate >= endDate) {
        newErrors.endDateTime = '종료 시간은 시작 시간보다 늦어야 합니다';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // datetime-local 형식을 yyyy-MM-dd HH:mm:ss 형식으로 변환
      const formatDateTime = (dateTimeString) => {
        return dateTimeString.replace('T', ' ') + ':00';
      };
      
      const submitData = {
        ...formData,
        startDateTime: formatDateTime(formData.startDateTime),
        endDateTime: formatDateTime(formData.endDateTime)
      };
      onSubmit(submitData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 실시간 유효성 검사
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="schedule-form-overlay">
      <div className="schedule-form-modal">
        <div className="schedule-form-header">
          <h2>{isEdit ? '일정 수정' : '새 일정 추가'}</h2>
          <button 
            type="button" 
            className="close-button"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="schedule-form">
          <div className="form-group">
            <label htmlFor="title">제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="일정 제목을 입력하세요"
              className={errors.title ? 'error' : ''}
              maxLength={100}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">설명 *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="일정에 대한 설명을 입력하세요"
              className={errors.description ? 'error' : ''}
              maxLength={500}
              rows={4}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="startDateTime">시작 시간 *</label>
              <input
                type="datetime-local"
                id="startDateTime"
                name="startDateTime"
                value={formData.startDateTime}
                onChange={handleChange}
                className={errors.startDateTime ? 'error' : ''}
              />
              {errors.startDateTime && <span className="error-message">{errors.startDateTime}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="endDateTime">종료 시간 *</label>
              <input
                type="datetime-local"
                id="endDateTime"
                name="endDateTime"
                value={formData.endDateTime}
                onChange={handleChange}
                className={errors.endDateTime ? 'error' : ''}
              />
              {errors.endDateTime && <span className="error-message">{errors.endDateTime}</span>}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              취소
            </button>
            <button type="submit" className="submit-button">
              {isEdit ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleForm; 