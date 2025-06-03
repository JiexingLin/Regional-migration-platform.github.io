'use client';

import React, { useState } from 'react';
import styles from './contact.module.css';

export default function ContactUs() {
  // 表单状态管理
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // 错误状态管理
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  // 表单验证函数
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '電話番号を入力してください';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = '有効な電話番号を入力してください（ハイフンなし）';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容を入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 输入处理函数
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 表单提交处理
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // 这里可以添加实际的表单提交逻辑
        // 例如发送到API端点
        console.log('Form submitted:', formData);
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } catch (error) {
        setSubmitStatus('error');
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>お問い合わせフォーム</h1>
      
      {submitStatus === 'success' && (
        <div className={styles.success}>
          お問い合わせありがとうございます。担当者より折り返しご連絡いたします。
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="name">
          お名前
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <div className={styles.error}>{errors.name}</div>}

        <label className={styles.label} htmlFor="email">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}

        <label className={styles.label} htmlFor="phone">
          電話番号(ハイフンなし)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={styles.input}
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10,11}"
          required
        />
        {errors.phone && <div className={styles.error}>{errors.phone}</div>}

        <label className={styles.label} htmlFor="message">
          お問い合わせ内容
        </label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          value={formData.message}
          onChange={handleChange}
          required
        />
        {errors.message && <div className={styles.error}>{errors.message}</div>}

        <button type="submit" className={styles.submitButton}>
          送信
        </button>
      </form>
    </div>
  );
}
