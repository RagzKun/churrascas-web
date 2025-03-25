
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const heroRef = useScrollAnimation<HTMLDivElement>();
  const contentRef = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={heroRef} 
      className="min-h-screen relative flex items-center justify-center animate-on-scroll pt-16"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-churrasca-900/70 via-churrasca-800/30 to-transparent z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("/assets/hero-background.jpg")' }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div 
          ref={contentRef}
          className="max-w-3xl mx-auto text-center stagger-animation"
        >
          {/* Logo */}
          <div className="mb-8 opacity-90">
            <div className="inline-block bg-white/90 backdrop-blur-sm p-6 rounded-full shadow-lg">
              <img 
                src="/lovable-uploads/4c455362-0d83-4f8b-b212-7b3daa814c87.png" 
                alt="Churrascas Las Delicias 101" 
                className="h-28 w-28 object-contain"
              />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
            Churrascas Artesanales Hechas con Tradición
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-medium text-white/90 mb-8">
            Personaliza tu pedido y ordénalo en 3 minutos | Retira en Las Delicias 101
          </p>
          
          {/* CTA Button */}
          <a 
            href="#productos" 
            className="inline-flex items-center bg-churrasca-600 text-white px-8 py-4 rounded-lg text-lg font-medium 
            transition-all duration-300 hover:bg-churrasca-700 hover:scale-105 hover:shadow-xl"
          >
            Ver Menú <ArrowRight className="ml-2 h-5 w-5" />
          </a>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
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
