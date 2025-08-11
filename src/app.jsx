import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GooeyNav from './Gooeynav';
import Hero from './hero';
import Services from './Services';
import Portfolio from './Portfolio';
import Contact from './Contact';

const items = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Contacto", href: "#contacto" },
];

const App = () => {


  return (
    <div>
      <GooeyNav 
       items={items}
       particleCount={15}
       particleDistances={[90, 10]}
       particleR={100}
        initialActiveIndex={0}
       animationTime={600}
       timeVariance={300}
       colors={[1, 2, 3, 1, 2, 3, 1, 4]}/>
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
    </div>
  )
}

 

export default App;