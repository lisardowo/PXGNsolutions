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
      description: "Sitios web profesionales de una sola página diseñados para convertir visitantes en clientes con diseño atractivo y llamadas a la acción claras.",
      icon: "🚀",
      features: ["Diseño Responsivo", "Carga Rápida", "SEO Optimizado", "Enfoque en Conversión"],
      price: "Desde $50"
    },
    {
      id: 2,
      title: "Sitio Web Completo",
      description: "Sitios web completos de múltiples páginas con funcionalidad personalizada, perfectos para empresas que necesitan una presencia online integral.",
      icon: "🌐",
      features: ["Diseño Multi-página", "Funciones Personalizadas", "Panel Administrativo", "Optimizado para Móvil"],
      price: "Desde $150"
    },
    {
      id: 3,
      title: "Blog",
      description: "Plataformas de blog dinámicas con sistemas de gestión de contenido, perfectas para compartir tu experiencia y construir tu audiencia.",
      icon: "📝",
      features: ["Integración CMS", "Compartir en Redes", "Sistema de Comentarios", "SEO Preparado"],
      price: "Desde $300"
    },
    {
      id: 4,
      title: "E-commerce",
      description: "Tiendas online completas con procesamiento seguro de pagos, gestión de inventario y sistemas de cuentas de clientes.",
      icon: "🛒",
      features: ["Pasarela de Pago", "Sistema de Inventario", "Gestión de Pedidos", "Cuentas de Clientes"],
      price: "Desde $500"
    }
  ];

  return (
    <section id="servicios" ref={sectionRef} className={`services-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Nuestros Servicios</h2>
          <p className="services-subtitle">
            Creamos soluciones digitales que impulsan tu negocio hacia adelante
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
                    Comenzar
                    <span className="button-arrow">→</span>
                  </button>
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
