
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { businessInfo } from '../lib/productData';

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${businessInfo.phone.replace(/\+/g, '')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-30 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all hover:scale-110"
      aria-label="Contáctanos por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};

export default WhatsAppButton;
