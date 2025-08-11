import React, { useRef, useEffect, useState } from 'react';
import './GooeyNav.css'; // reutiliza estilos
import { useI18n } from './i18n.jsx';

// Barra inferior para cambiar idioma (ES/EN) con efecto gooey simplificado
const LanguageBar = () => {
  const { lang, setLang, t } = useI18n();
  const containerRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(lang === 'es' ? 0 : 1);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const items = [
    { code: 'es', label: t('lang_es') },
    { code: 'en', label: t('lang_en') }
  ];

  useEffect(() => {
    setActiveIndex(lang === 'es' ? 0 : 1);
  }, [lang]);

  useEffect(() => {
    const control = () => {
      const y = window.scrollY;
      if (y < 10) setIsVisible(true);
      else if (y > lastScrollY && y > 120) setIsVisible(false);
      else if (y < lastScrollY) setIsVisible(true);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', control);
    return () => window.removeEventListener('scroll', control);
  }, [lastScrollY]);

  const updatePosition = (el) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const rectC = containerRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    const style = {
      left: `${rect.x - rectC.x}px`,
      top: `${rect.y - rectC.y}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`
    };
    Object.assign(filterRef.current.style, style);
    Object.assign(textRef.current.style, style);
    textRef.current.innerText = el.innerText;
  };

  const labelsDep = items.map(i => i.label).join('|');
  useEffect(() => {
    const active = containerRef.current?.querySelectorAll('li')[activeIndex];
    if (active) {
      updatePosition(active);
      textRef.current?.classList.add('active');
    }
  }, [activeIndex, labelsDep]);

  const handleClick = (idx) => (e) => {
    e.preventDefault();
    if (idx === activeIndex) return;
    setActiveIndex(idx);
    setLang(items[idx].code);
    const li = e.currentTarget.parentElement;
    if (li) updatePosition(li);
    if (textRef.current) {
      textRef.current.classList.remove('active');
      void textRef.current.offsetWidth;
      textRef.current.classList.add('active');
    }
  };

  return (
    <div
      className={`gooey-nav-container language-bar ${isVisible ? 'nav-visible' : 'nav-hidden'}`}
      ref={containerRef}
      style={{ bottom: '20px', top: 'auto' }}
    >
      <nav>
        <ul>
          {items.map((it, i) => (
            <li key={it.code} className={i === activeIndex ? 'active' : ''}>
              <a href="#" onClick={handleClick(i)}>{it.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
};

export default LanguageBar;
