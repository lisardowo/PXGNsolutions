import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GooeyNav from './Gooeynav';
import Hero from './hero';
import Services from './Services';

const items = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "Contact", href: "#" },
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
    </div>
  )
}

 

export default App;