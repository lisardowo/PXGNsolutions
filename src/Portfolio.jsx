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
      description: "Modern online store with payment integration",
      variant: "default",
      link: "https://example.com/project1",
      image: "🛒",
      thumbnail: "src/assets/chippsstore.webp" // Add your image path here
    },
    {
      id: 2,
      title: "Website",
      description: "Professional business website with CMS",
      variant: "default",
      link: "https://example.com/project2",
      image: "🏢",
      thumbnail: "src/assets/Cubesat.webp" // Add your image path here
    },
    {
      id: 3,
      title: "Blog Platform",
      description: "Content management system with rich editor",
      variant: "default",
      link: "https://example.com/project3",
      image: "📝",
      thumbnail: "/images/blog-project.jpg" // Add your image path here
    },
    {
      id: 4,
      title: "Landing Page",
      description: "High-converting landing page design",
      variant: "default",
      link: "https://example.com/project4",
      image: "🚀",
      thumbnail: "/images/landing-project.jpg" // Add your image path here
    }
  ];

  const handleCardClick = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section ref={sectionRef} className={`portfolio-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h2 className="portfolio-title">Our Portfolio</h2>
          <p className="portfolio-subtitle">
            Discover our latest work and successful projects
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
                    <span className="portfolio-card-cta">View Project →</span>
                  </div>
                </div>
              </PixelCard>
            </div>
          ))}
        </div>
        
        <div className="portfolio-cta">
          <p>Want to see more projects? <a href="#contact" className="portfolio-cta-link">Get in touch with us</a></p>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
