import React, { useEffect, useRef, useState } from 'react';
import PixelCard from './PixelCard';
import './Portfolio.css';
import { useI18n } from './i18n.jsx';

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

  const { t } = useI18n();
  const portfolioItems = [
    { id: 1, title: 'Chippstore', description: t('portfolio_item_ecom_desc'), variant: 'default', link: 'https://lisardowo.github.io/ChippsStore/', image: '🛒', thumbnail: '/images/chippsstore.webp' },
    { id: 2, title: 'Cubesat', description: t('portfolio_item_site_desc'), variant: 'default', link: 'https://lisardowo.github.io/CUBESAT/', image: '🏢', thumbnail: '/images/Cubesat.webp' },
  ];

  const handleCardClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="portafolio" ref={sectionRef} className={`portfolio-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h2 className="portfolio-title">{t('portfolio_title')}</h2>
          <p className="portfolio-subtitle">{t('portfolio_subtitle')}</p>
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
                    <span className="portfolio-card-cta">{t('portfolio_view_project')}</span>
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
