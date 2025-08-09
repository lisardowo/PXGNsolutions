import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import GooeyNav from './Gooeynav';
import Hero from './hero';

const items = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
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
    </div>
  )
}

 

export default App;