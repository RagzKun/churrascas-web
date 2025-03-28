
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';

const Hero = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const contentRef = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={heroRef} 
      className="min-h-screen relative flex items-center justify-center overflow-hidden pt-16"
      id="hero"
    >
      {/* Background image with a specific z-index */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'url("/assets/hero-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)'
        }}
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
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              <span>¡Prueba Nuestras Nuevas Churrascas!</span>
            </span>
          </div>
          
          {/* Logo */}
          <div className="mb-8 opacity-90 transition-transform hover:scale-105 duration-300">
            <div className="inline-block bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-lg">
              <img 
                src="/lovable-uploads/4c455362-0d83-4f8b-b212-7b3daa814c87.png" 
                alt="Churrascas Las Delicias 101" 
                className="h-28 w-28 object-contain"
              />
            </div>
          </div>
          
          {/* Title with guaranteed visibility */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6 font-bold">
            Churrascas Artesanales Hechas con Tradición
          </h1>
          
          {/* Subtitle with guaranteed visibility */}
          <p className="text-xl md:text-2xl text-white mb-8 font-medium px-4 py-2 bg-black/30 inline-block rounded-lg">
            Personaliza tu pedido y ordénalo en 3 minutos | Retira en Las Delicias 101
          </p>
          
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
