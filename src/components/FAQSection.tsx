
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '../lib/productData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useScrollAnimation<HTMLDivElement>();
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section 
      id="faq" 
      ref={sectionRef} 
      className="section-padding bg-churrasca-50 animate-on-scroll"
    >
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-churrasca-100 text-churrasca-800 rounded-full text-sm font-medium mb-3">
            PREGUNTAS FRECUENTES
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-churrasca-900">
            ¿Dudas sobre nuestro servicio?
          </h2>
          <p className="mt-4 text-churrasca-700 max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicio de pedidos.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="mb-4 border border-churrasca-200 rounded-xl overflow-hidden bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left transition-colors"
              >
                <h3 className="font-medium text-xl text-churrasca-900">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-churrasca-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-churrasca-600 flex-shrink-0" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}>
                <div className="p-5 pt-0 text-churrasca-700">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
