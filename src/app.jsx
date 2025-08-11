import React from 'react';
import './index.css';
import GooeyNav from './Gooeynav';
import Hero from './hero';
import Services from './Services';
import Portfolio from './Portfolio';
import Contact from './Contact';
import { LanguageProvider, useI18n } from './i18n.jsx';
import LanguageBar from './LanguageBar';

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
  <LanguageProvider initial="es">
    <MainApp />
  </LanguageProvider>
);

export default App;