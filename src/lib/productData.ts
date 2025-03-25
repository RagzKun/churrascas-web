
import { Product } from '../context/CartContext';

export const products: Product[] = [
  {
    id: "churrasca-tradicional",
    name: "Churrasca Tradicional",
    description: "Nuestra churrasca clásica, hecha con receta tradicional del sur de Chile.",
    price: 2500,
    image: "/assets/churrasca-tradicional.jpg",
    extras: [
      { id: "queso", name: "Queso", price: 500 },
      { id: "jamon", name: "Jamón", price: 500 },
      { id: "palta", name: "Palta", price: 700 },
      { id: "huevo", name: "Huevo", price: 600 },
      { id: "longaniza", name: "Longaniza", price: 900 },
      { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-palta",
    name: "Churrasca Palta",
    description: "Deliciosa churrasca con una generosa porción de palta fresca.",
    price: 3200,
    image: "/assets/churrasca-palta.jpg",
    extras: [
      { id: "queso", name: "Queso", price: 500 },
      { id: "jamon", name: "Jamón", price: 500 },
      { id: "huevo", name: "Huevo", price: 600 },
      { id: "longaniza", name: "Longaniza", price: 900 },
      { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-queso-jamon",
    name: "Churrasca Queso/Jamón",
    description: "Churrasca con el clásico sabor del queso derretido y jamón premium.",
    price: 3500,
    image: "/assets/churrasca-queso-jamon.jpg",
    extras: [
      { id: "palta", name: "Palta", price: 700 },
      { id: "huevo", name: "Huevo", price: 600 },
      { id: "longaniza", name: "Longaniza", price: 900 },
      { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-huevo",
    name: "Churrasca Huevo",
    description: "Con huevo frito perfectamente cocinado, una opción contundente y deliciosa.",
    price: 3100,
    image: "/assets/churrasca-huevo.jpg",
    extras: [
      { id: "queso", name: "Queso", price: 500 },
      { id: "jamon", name: "Jamón", price: 500 },
      { id: "palta", name: "Palta", price: 700 },
      { id: "longaniza", name: "Longaniza", price: 900 },
      { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-ave-mayo",
    name: "Churrasca Ave Mayo",
    description: "Churrasca con pechuga de ave desmenuzada y mayonesa casera.",
    price: 3700,
    image: "/assets/churrasca-ave-mayo.jpg",
    extras: [
      { id: "queso", name: "Queso", price: 500 },
      { id: "palta", name: "Palta", price: 700 },
      { id: "huevo", name: "Huevo", price: 600 },
      { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-mechada",
    name: "Churrasca Mechada de Cerdo",
    description: "La opción más contundente: jugosa carne mechada de cerdo con nuestro aderezo especial.",
    price: 4200,
    image: "/assets/churrasca-mechada.jpg",
    extras: [
      { id: "queso", name: "Queso", price: 500 },
      { id: "palta", name: "Palta", price: 700 },
      { id: "huevo", name: "Huevo", price: 600 },
      { id: "longaniza", name: "Longaniza", price: 900 },
      { id: "tomate", name: "Tomate", price: 300 }
    ]
  }
];

// FAQs
export const faqs = [
  {
    question: "¿Cómo puedo realizar mi pedido?",
    answer: "Puedes personalizar tu pedido directamente en nuestra página y al finalizar serás redirigido a WhatsApp para confirmar los detalles."
  },
  {
    question: "¿Cuánto tiempo de anticipación necesito para hacer un pedido?",
    answer: "Recomendamos hacer tu pedido con al menos 2 horas de anticipación para garantizar disponibilidad."
  },
  {
    question: "¿Tienen opciones para personas con restricciones alimentarias?",
    answer: "Consulta por opciones especiales a través de nuestro WhatsApp, podemos adaptar algunas opciones según tus necesidades."
  },
  {
    question: "¿Hacen entregas a domicilio?",
    answer: "En este momento solo trabajamos con retiro en tienda. Estamos evaluando implementar delivery en el futuro."
  },
  {
    question: "¿Puedo hacer pedidos para eventos o cantidades grandes?",
    answer: "¡Claro! Para pedidos de más de 20 unidades, contáctanos directamente por WhatsApp para obtener precios especiales."
  },
  {
    question: "¿Ofrecen opciones de bebidas?",
    answer: "Sí, ofrecemos café, té, milo y leche con autoservicio presencial en nuestro local."
  }
];

// Business information
export const businessInfo = {
  name: "Churrascas Las Delicias 101",
  address: "Av. Las Delicias 101, Santiago",
  phone: "+56912345678",
  email: "contacto@churrascasdelicicias.cl",
  hours: "Lunes a Domingo, 10:00 - 20:00 hrs",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.0104550457257!2d-70.6045235!3d-33.4377764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI2JzE2LjAiUyA3MMKwMzYnMTYuMyJX!5e0!3m2!1ses!2scl!4v1573859783585!5m2!1ses!2scl",
  socials: {
    instagram: "#",
    facebook: "#",
    twitter: "#"
  }
};
