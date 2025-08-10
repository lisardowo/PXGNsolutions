import React, { useEffect, useRef, useState } from 'react';
import './Services.css';

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

  const services = [
    {
      id: 1,
      title: "Landing Page",
      description: "Professional single-page websites designed to convert visitors into customers with compelling design and clear call-to-actions.",
      icon: "🚀",
      features: ["Responsive Design", "Fast Loading", "SEO Optimized", "Conversion Focused"],
      price: "From $299"
    },
    {
      id: 2,
      title: "Full Web Page",
      description: "Complete multi-page websites with custom functionality, perfect for businesses that need a comprehensive online presence.",
      icon: "🌐",
      features: ["Multi-page Design", "Custom Features", "Admin Panel", "Mobile Optimized"],
      price: "From $899"
    },
    {
      id: 3,
      title: "Blog",
      description: "Dynamic blog platforms with content management systems, perfect for sharing your expertise and building your audience.",
      icon: "📝",
      features: ["CMS Integration", "Social Sharing", "Comment System", "SEO Ready"],
      price: "From $599"
    },
    {
      id: 4,
      title: "E-commerce",
      description: "Full-featured online stores with secure payment processing, inventory management, and customer account systems.",
      icon: "🛒",
      features: ["Payment Gateway", "Inventory System", "Order Management", "Customer Accounts"],
      price: "From $1,299"
    }
  ];

  return (
    <section ref={sectionRef} className={`services-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">
            We create digital solutions that drive your business forward
          </p>
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
                  <button className="service-button">
                    Get Started
                    <span className="button-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="services-cta">
          <p>Need something custom? <a href="#contact" className="cta-link">Let's talk about your project</a></p>
        </div>
      </div>
    </section>
  );
};

export default Services;
