import React, { useState, useEffect, useRef } from 'react';
import LetterGlitch from "./LetterGlitch";
import './Contact.css';
import { useI18n } from './i18n.jsx';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Replace with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwTFpCootJwa06NILugU0YEGpVdsCPeGXa8jIX7XmY9YpEY2yt0VvQVcgzEWb2kIpIF/exec';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        mode: 'no-cors' // Required for Google Apps Script
      });

      // With no-cors mode, we can't read the response, so we assume success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const { t } = useI18n();

  return (
    <section 
      id="contacto"
      ref={sectionRef} 
      className={`contact-section ${isVisible ? 'is-visible' : ''}`}
    >
      {/* Smooth gradient overlay */}
      <div className="gradient-overlay"></div>
      
      <div className="contact-background">
        <LetterGlitch 
          className="letter-glitch-bg"
          glitchSpeed={30}
          centerVignette={false}
          outerVignette={false}
          smooth={true}
        />
      </div>

      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">{t('contact_title')}</h2>
          <p className="contact-subtitle">{t('contact_subtitle')}</p>
        </div>

        <div className="contact-content">
          {/* Contact Info Cards */}
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>{t('contact_location')}</h3>
              <p>{t('contact_location_val').split('\n').map((l,i)=><React.Fragment key={i}>{l}{i===0 && <br/>}</React.Fragment>)}</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>{t('contact_email')}</h3>
              <p>{t('contact_email_val').split('\n').map((l,i)=><React.Fragment key={i}>{l}{i===0 && <br/>}</React.Fragment>)}</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">�</div>
              <h3>{t('contact_phone')}</h3>
              <p>{t('contact_phone_val').split('\n').map((l,i)=><React.Fragment key={i}>{l}{i===0 && <br/>}</React.Fragment>)}</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">⏰</div>
              <h3>{t('contact_availability')}</h3>
              <p>{t('contact_availability_val').split('\n').map((l,i)=><React.Fragment key={i}>{l}{i===0 && <br/>}</React.Fragment>)}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
                {submitStatus === 'success' && (
              <div className="success-message">{t('contact_success')}</div>
            )}
            {submitStatus === 'error' && (
              <div className="error-message">{t('contact_error')}</div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t('contact_full_name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('contact_full_name_ph')}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">{t('contact_email_label')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('contact_email_ph')}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">{t('contact_phone_label')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('contact_phone_ph')}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">{t('contact_service_label')}</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">{t('contact_service_select')}</option>
                    <option value="Landing-Page">{t('contact_service_lp')}</option>
                    <option value="Full-Web">{t('contact_service_fw')}</option>
                    <option value="Blog">{t('contact_service_blog')}</option>
                    <option value="E-commerce">{t('contact_service_ecom')}</option>
                    <option value="Mantenimiento-Web">{t('contact_service_maint')}</option>
                    <option value="Otro">{t('contact_service_other')}</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact_project_details')} </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('contact_project_details_ph')}
                  rows="5"
                  
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="contact-button"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? t('contact_btn_sending') : t('contact_btn_send')}</span>
                <span className="button-arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;