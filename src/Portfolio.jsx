import React, { useEffect, useRef, useState } from 'react';
import PixelCard from './PixelCard';
import './Portfolio.css';

const Portfolio = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const portfolioItems = [
    {
      id: 1,
      title: "E-Commerce",
      description: "Tienda online moderna con integración de pagos",
      variant: "default",
      link: "https://example.com/project1",
      image: "🛒",
      thumbnail: "src/assets/chippsstore.webp"
    },
    {
      id: 2,
      title: "Sitio Web",
      description: "Sitio web empresarial profesional con CMS",
      variant: "default",
      link: "https://example.com/project2",
      image: "🏢",
      thumbnail: "src/assets/Cubesat.webp"
    },
    {
      id: 3,
      title: "Plataforma de Blog",
      description: "Sistema de gestión de contenido con editor avanzado",
      variant: "default",
      link: "https://example.com/project3",
      image: "📝",
      thumbnail: "src/assets/Cubesat.webp"
    },
    {
      id: 4,
      title: "Landing Page",
      description: "Diseño de página de aterrizaje de alta conversión",
      variant: "default",
      link: "https://example.com/project4",
      image: "🚀",
      thumbnail: "src/assets/Cubesat.webp"
    }
  ];

  const handleCardClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="portafolio" ref={sectionRef} className={`portfolio-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h2 className="portfolio-title">Nuestro Portafolio</h2>
          <p className="portfolio-subtitle">
            Descubre nuestros últimos trabajos y proyectos exitosos
          </p>
        </div>
        
        <div className="portfolio-grid">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className={`portfolio-card-wrapper ${isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <PixelCard
                variant={item.variant}
                className="portfolio-pixel-card"
                onClick={() => handleCardClick(item.link)}
                thumbnail={item.thumbnail}
              >
                <div className="portfolio-card-inner">
                  <div className="portfolio-card-icon">
                    {item.image}
                  </div>
                  <h3 className="portfolio-card-title">{item.title}</h3>
                  <p className="portfolio-card-description">{item.description}</p>
                  <div className="portfolio-card-overlay">
                    <span className="portfolio-card-cta">Ver Proyecto →</span>
                  </div>
                </div>
              </PixelCard>
            </div>
          ))}
        </div>
        
       
      </div>
    </section>
  );
};

export default Portfolio;
