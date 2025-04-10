
import { Product } from '../context/CartContext';

export const products: Product[] = [
  {
    id: "churrasca-tradicional",
    name: "Tradicional",
    description: "Nuestra churrasca clásica, hecha con receta tradicional del sur de Chile.",
    price: 1000,
    image: "churras5.jpg",
    extras: [
      { id: "mantequilla", name: "Mantequilla", price: 500 },
      { id: "queso", name: "Queso", price: 1000 },
      { id: "jamon", name: "Jamón", price: 1000 },
      // { id: "palta", name: "Palta", price: 700 },
      // { id: "huevo", name: "Huevo", price: 600 },
      // { id: "longaniza", name: "Longaniza", price: 900 },
      // { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-palta",
    name: "Palta",
    description: "Deliciosa churrasca con una generosa porción de palta fresca.",
    price: 2000,
    image: "logo.png",
    extras: [
      { id: "queso", name: "Queso", price: 1000 },
      { id: "jamon", name: "Jamón", price: 1000 },
      { id: "huevo", name: "Huevo", price: 1000 },
      // { id: "longaniza", name: "Longaniza", price: 900 },
      // { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-huevo",
    name: "Huevo",
    description: "Con huevo revuelto, una opción contundente y deliciosa.",
    price: 2000,
    image: "churrahuevo1.jpg",
    extras: [
      { id: "queso", name: "Queso", price: 1000 },
      { id: "jamon", name: "Jamón", price: 1000 },
      { id: "palta", name: "Palta", price: 1000 },
      { id: "longaniza", name: "Longaniza", price: 1000 },
      // { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-queso-jamon",
    name: "Queso/Jamón",
    description: "Churrasca con el clásico sabor del queso y jamón.",
    price: 2500,
    image: "logo.png",
    extras: [
      { id: "palta", name: "Palta", price: 1000 },
      { id: "huevo", name: "Huevo", price: 1000 },
      // { id: "longaniza", name: "Longaniza", price: 900 },
      // { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-ave-mayo",
    name: "Ave Mayo",
    description: "Churrasca con pechuga de ave desmenuzada y mayonesa.",
    price: 2500,
    image: "/logo.png",
    extras: [
      { id: "queso", name: "Queso", price: 1000 },
      { id: "jamon", name: "Jamón", price: 1000 },
      { id: "palta", name: "Palta", price: 1000 },
      { id: "huevo", name: "Huevo", price: 1000 },
      // { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-mechada",
    name: "Mechada de Cerdo",
    description: "La opción más contundente: jugosa carne mechada de cerdo con nuestro aderezo especial.",
    price: 2500,
    image: "churramechada1.jpg",
    extras: [
      { id: "queso", name: "Queso", price: 1000 },
      { id: "jamon", name: "Jamón", price: 1000 },
      { id: "palta", name: "Palta", price: 1000 },
      // { id: "huevo", name: "Huevo", price: 1000 },
      // { id: "longaniza", name: "Longaniza", price: 900 },
      // { id: "tomate", name: "Tomate", price: 300 }
    ]
  },
  {
    id: "churrasca-pernil",
    name: "Pernil",
    description: "La opción más sabrosa: jugoso pernil con un sazón irresistible.",
    price: 2500,
    image: "logo.png",
    extras: [ 
      { id: "queso", name: "Queso", price: 1000 },
      { id: "jamon", name: "Jamón", price: 1000 },
      { id: "palta", name: "Palta", price: 1000 },
      // { id: "huevo", name: "Huevo", price: 600 },
      // { id: "longaniza", name: "Longaniza", price: 900 },
      // { id: "tomate", name: "Tomate", price: 300 }
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
    answer: "Sí, ofrecemos bebidas, café, té y leche con autoservicio presencial en nuestro local."
  }
];

// Business information
export const businessInfo = {
  name: "Churrascas Las Delicias 101",
  address: "Av. Las Delicias 101, Rosario.",
  phone: "+56992729311",
  // email: "contacto@churrascasdelicicias.cl",
  hours: "Lunes a Viernes, 06:00Am hasta agotar stock.",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3294.119057843631!2d-70.8356873!3d-34.3474479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96636068273de8f3%3A0x9bbcd8d86e4b62b3!2sAv.%20Las%20Delicias%20101%2C%20Rengo%2C%20Libertador%20General%20Bernardo%20O%27Higgins!5e0!3m2!1ses!2scl!4v1743038899989!5m2!1ses!2scl",
  socials: {
    instagram: "https://www.instagram.com/churrascaslasdelicias101/",
    // facebook: "#",
    // twitter: "#"
  }
};
