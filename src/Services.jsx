import React, { useEffect, useRef, useState } from 'react';
import './Services.css';
import { useI18n } from './i18n.jsx';

const Services = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '-50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const { t } = useI18n();
  const services = [
    {
      id: 1,
      title: 'Landing Page',
      description: t('service_landing_desc'),
      icon: '🚀',
      features: t('service_landing_features').split('|'),
      price: `${t('service_price_from')} $50 USD`
    },
    {
      id: 2,
      title: 'Full web',
      description: t('service_full_desc'),
      icon: '🌐',
      features: t('service_full_features').split('|'),
      price: `${t('service_price_from')} $150 USD`
    },
    {
      id: 3,
      title: 'Blog',
      description: t('service_blog_desc'),
      icon: '📝',
      features: t('service_blog_features').split('|'),
      price: `${t('service_price_from')} $300 USD`
    },
    {
      id: 4,
      title: 'E-commerce',
      description: t('service_ecom_desc'),
      icon: '🛒',
      features: t('service_ecom_features').split('|'),
      price: `${t('service_price_from')} $500 USD`
    }
  ];

  return (
    <section id="servicios" ref={sectionRef} className={`services-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">{t('services_title')}</h2>
          <p className="services-subtitle">{t('services_subtitle')}</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={service.id} className={`service-card ${isVisible ? 'fade-in' : ''}`} style={{animationDelay: `${0.1 + index * 0.2}s`}}>
              <div className="service-icon">
                <span>{service.icon}</span>
              </div>
              
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index} className="service-feature">
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="service-footer">
                  <div className="service-price">{service.price}</div>
                  
                
                </div>
              </div>
            </div>
          ))}
        </div>
        
        
      </div>
    </section>
  );
};

export default Services;
