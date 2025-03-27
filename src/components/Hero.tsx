
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
      className="min-h-screen relative flex items-center justify-center animate-on-scroll pt-16"
      id="hero"
    >
      {/* Background image only */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("/assets/hero-background.jpg")' }}
          aria-hidden="true"
        ></div>
      </div>
      
      {/* Dark overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Content container with higher z-index */}
      <div className="container mx-auto px-4 relative z-20">
        <div 
          ref={contentRef}
          className="max-w-3xl mx-auto text-center stagger-animation"
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
          
          {/* Title - Simplified with stronger contrast */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Churrascas Artesanales Hechas con Tradición
          </h1>
          
          {/* Subtitle - Simplified with better visibility */}
          <p className="text-xl md:text-2xl font-medium text-white mb-8 drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] bg-black/30 backdrop-blur-sm inline-block px-4 py-2 rounded-lg">
            Personaliza tu pedido y ordénalo en 3 minutos | Retira en Las Delicias 101
          </p>
          
          {/* CTA Button */}
          <a 
            href="#productos" 
            className="inline-flex items-center bg-churrasca-600 text-white px-8 py-4 rounded-lg text-lg font-medium 
            transition-all duration-300 hover:bg-churrasca-700 hover:scale-105 hover:shadow-xl focus-visible-ring"
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
