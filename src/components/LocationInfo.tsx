import React from "react";
import { MapPin, Clock, Phone } from "lucide-react";
import { businessInfo } from "../lib/productData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const LocationInfo = () => {
  const sectionRef = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      id="ubicacion"
      ref={sectionRef}
      className="section-padding bg-white animate-on-scroll"
    >
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-churrasca-100 text-churrasca-800 rounded-full text-sm font-medium mb-3">
            UBICACIÓN
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-churrasca-900">
            Dónde Encontrarnos
          </h2>
          <p className="mt-4 text-churrasca-700 max-w-2xl mx-auto">
            Visítanos en nuestra ubicación central para retirar tu pedido.
            Estamos abiertos todos los días.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Map */}
          <div className="lg:col-span-3 h-96 rounded-xl overflow-hidden shadow-sm border border-churrasca-100">
            <iframe
              src={businessInfo.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Churrascas Las Delicias 101"
              className="w-full h-full"
            />
          </div>

          {/* Info cards */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-churrasca-100 flex-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-churrasca-100 flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-churrasca-600" />
                </div>
                <h3 className="text-xl font-medium leading-7 tracking-normal antialiased text-churrasca-900">
                  Dirección
                </h3>
              </div>
              <p className="text-churrasca-700">{businessInfo.address}</p>
              <p className="text-churrasca-700 mt-2">
                Estamos ubicados frente a la copa de agua en Rosario.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-churrasca-100 flex-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-churrasca-100 flex items-center justify-center mr-4">
                  <Clock className="h-5 w-5 text-churrasca-600" />
                </div>
                <h3 className="text-xl font-medium leading-7 tracking-normal antialiased text-churrasca-900">
                  Horario
                </h3>
              </div>
              <p className="text-churrasca-700">{businessInfo.hours}</p>
              <p className="text-churrasca-700 mt-2">
                Recuerda que para pedidos grandes, te recomendamos llamar con
                anticipación.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-churrasca-100 flex-1">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-churrasca-100 flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 text-churrasca-600" />
                </div>
                <h3 className="text-xl font-medium leading-7 tracking-normal antialiased text-churrasca-900">
                  Contacto
                </h3>
              </div>
              <p className="text-churrasca-700">
                Teléfono: {businessInfo.phone}
              </p>
              {/* <p className="text-churrasca-700">Email: {businessInfo.email}</p> */}
              <a
                href={`https://wa.me/${businessInfo.phone.replace(/\+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-churrasca-100 text-churrasca-900 px-4 py-2 rounded-lg font-medium 
                hover:bg-churrasca-200 transition-colors"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationInfo;
