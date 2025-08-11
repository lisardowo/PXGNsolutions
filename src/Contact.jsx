import React, { useState, useEffect, useRef } from 'react';
import LetterGlitch from "./LetterGlitch";
import './Contact.css';

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

  return (
    <section 
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
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Ready to bring your vision to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Info Cards */}
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <h3>Location</h3>
              <p>Remote & Local<br />Available Worldwide</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>Email</h3>
              <p>hello@pxgnsolutions.com<br />Quick response guaranteed</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">�</div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567<br />Mon - Fri, 9AM - 6PM</p>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">⏰</div>
              <h3>Availability</h3>
              <p>24/7 Support<br />Fast turnaround</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            {submitStatus === 'success' && (
              <div className="success-message">
                ✅ ¡Gracias! Tu mensaje ha sido enviado exitosamente. Nos contactaremos contigo pronto.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="error-message">
                ❌ Algo salió mal. Por favor intenta de nuevo.
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nombre Completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ingresa tu nombre completo"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu.correo@ejemplo.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Número de Teléfono *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">Servicio de Interés *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="Landing-Page">Landing Page</option>
                    <option value="Full-Web">Full web</option>
                    <option value="Blog">Blog</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Mantenimiento-Web">Mantenimiento Web</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Detalles del Proyecto</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos sobre tu proyecto, cronograma y cualquier requisito específico..."
                  rows="5"
                  
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="contact-button"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
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