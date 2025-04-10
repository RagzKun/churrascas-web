
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { businessInfo } from '../lib/productData';


const Footer = () => {
  return (
    <footer className="bg-churrasca-900 text-white py-12">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/logo.png" 
                alt="Churrascas Las Delicias 101" 
                className="w-[150px] h-[100px] object-contain"
              />
              {/* <span className="font-display text-xl font-medium">
                Churrascas Las Delicias 101
              </span> */}
            </div>
            <p className="text-white/80 max-w-md">
            {/* <p className="font-display text-xl font-medium"> */}
              Churrascas artesanales elaboradas con ingredientes de  calidad y recetas del sur de Chile.
            </p>
            <div className="flex space-x-4 mt-6">
              {/* <a 
                href={businessInfo.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a> */}
              <a 
                href={businessInfo.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              {/* <a 
                href={businessInfo.socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a> */}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-xl font-medium mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#productos" className="text-white/80 hover:text-white transition-colors">Menú</a>
              </li>
              <li>
                <a href="#ubicacion" className="text-white/80 hover:text-white transition-colors">Ubicación</a>
              </li>
              <li>
                <a href="#faq" className="text-white/80 hover:text-white transition-colors">Preguntas frecuentes</a>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-xl font-medium mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="text-white/80">{businessInfo.address}</li>
              <li className="text-white/80">{businessInfo.phone}</li>
              {/* <li className="text-white/80">{businessInfo.email}</li> */}
              <li className="text-white/80">Horario: {businessInfo.hours}</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Churrascas Las Delicias 101. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#faq" className="text-white/60 text-sm hover:text-white transition-colors">
              Términos y Condiciones
            </a>
            <a href="#faq" className="text-white/60 text-sm hover:text-white transition-colors">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
