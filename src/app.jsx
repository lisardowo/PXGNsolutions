import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import GooeyNav from './GooeyNav.jsx';
import Hero from './hero';
import Services from './Services';
import Portfolio from './Portfolio';
import Contact from './Contact';
import { LanguageProvider, useI18n } from './i18n.jsx';
import LanguageBar from './LanguageBar';
import { Routes, Route, Navigate } from 'react-router-dom';

const MainApp = () => {
  const { t } = useI18n();
  const items = [
    { label: t('nav_inicio'), href: '#inicio' },
    { label: t('nav_servicios'), href: '#servicios' },
    { label: t('nav_portafolio'), href: '#portafolio' },
    { label: t('nav_contacto'), href: '#contacto' },
  ];

  return (
    <>
      <GooeyNav
        items={items}
        particleCount={15}
        particleDistances={[90, 10]}
        particleR={100}
        initialActiveIndex={0}
        animationTime={600}
        timeVariance={300}
        colors={[1, 2, 3, 1, 2, 3, 1, 4]}
      />
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
      <LanguageBar />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <LanguageProvider initial="es">
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/en" element={<MainApp />} />
        <Route path="/es" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  </BrowserRouter>
);

export default App;