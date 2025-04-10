
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
// import { motion } from 'framer-motion';

const Hero = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const contentRef = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={heroRef} 
      className="min-h-screen relative flex items-center justify-center overflow-hidden pt-16"
      id="hero"
    >
      {/* Flaming background with animation */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 z-0 flames-container">
        <div className="flame-wrapper">
          <div className="flame red"></div>
          <div className="flame orange"></div>
          <div className="flame gold"></div>
          <div className="flame white"></div>
        </div>
        <div className="flame-wrapper offset-right">
          <div className="flame red"></div>
          <div className="flame orange"></div>
          <div className="flame gold"></div>
          <div className="flame white"></div>
        </div>
        <div className="flame-wrapper offset-left">
          <div className="flame red"></div>
          <div className="flame orange"></div>
          <div className="flame gold"></div>
          <div className="flame white"></div>
        </div>
      </div>
      
      {/* Dark overlay to improve text visibility */}
      <div 
        className="absolute inset-0 z-1 bg-gradient-to-t from-black/70 to-black/20"
        aria-hidden="true"
      />
      
      {/* Content with guaranteed visibility */}
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={contentRef}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Attention-grabbing hook element */}
          <div className="mb-4 animate-bounce">
            <span className="inline-flex items-center gap-2 bg-churrasca-600 text-white px-4 py-2 rounded-full text-lg font-medium">
              <Sparkles className="h-5 w-5 " aria-hidden="true" />
              <span className='font-display text-2xl font-normal'>¡Prueba Nuestras Churrascas!</span>
            </span>
          </div>
          
          {/* Imagen de Churras */}
          <div className="mb-8 opacity-90 transition-transform hover:scale-105 duration-300">
            <div className="inline-block backdrop-blur-sm p-6 rounded-full shadow-lg">
              <img 
                src="/churras1.jpg" //PONER ACÁ IMAGEN DE LA CHURRASCA NUEVA.
                alt="Churrascas Las Delicias 101" 
                className="h-25 w-25 object-contain"
              />  
            </div>
            <p className="text-xl md:text-2xl text-white mb-8 font-medium px-4 py-2 inline-block rounded-lg font-display text-2xl font-normal">
            Personaliza tu pedido y ordénalo en 3 minutos | 
            Retira en Las Delicias 101
          </p>
          </div>
          
          {/* Title with guaranteed visibility */}
          {/* <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6 font-bold">
            Churrascas Artesanales Hechas con Tradición
          </h1> */}
          
          {/* Subtitle with guaranteed visibility */}
          
          
          {/* CTA Button */}
          <a 
            href="#productos" 
            className="inline-flex items-center bg-churrasca-600 text-white px-8 py-4 rounded-lg text-lg font-medium 
            transition-all duration-300 hover:bg-churrasca-700 hover:scale-105 hover:shadow-xl"
            aria-label="Ver menú de churrascas"
          >
            Ver Menú <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" aria-hidden="true">
            <div className="animate-float">
              <div className="w-1 h-16 mx-auto">
                <div className="w-1 h-8 bg-white/50 rounded-full mx-auto mb-1"></div>
                <div className="w-1 h-4 bg-white/30 rounded-full mx-auto mb-1"></div>
                <div className="w-1 h-2 bg-white/20 rounded-full mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;