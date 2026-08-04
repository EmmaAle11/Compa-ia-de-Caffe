/**
 * [FRONTEND - FSD LAYER: Entity - Product]
 * Mock catalog data for single origin coffee beans and sets.
 */

import { CoffeeProduct } from '../../../shared/types';

export const COFFEE_PRODUCTS: CoffeeProduct[] = [
  {
    id: 'oaxaca-sierra-norte',
    name: 'Oaxaca Sierra Norte',
    subtitle: 'Pluma Hidalgo, MX | Washed Process',
    category: 'Whole Bean',
    price: 28.00,
    weight: '340g',
    region: 'Oaxaca',
    elevation: '1,450m',
    process: 'Washed',
    roastLevel: 'Medium-Dark Roast',
    flavorNotes: ['Chocolate Amargo', 'Ciruela Negra', 'Vainilla', 'Nuez Caramelizada'],
    description: 'De las altas montañas de Oaxaca. Este microlote representa el "punto medio"—el equilibrio perfecto entre acidez floral, cuerpo sedoso y notas dulces de tueste de tambor.',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    isOrganic: true,
    scores: { acidity: 4, body: 8, bitterness: 6, sweetness: 7 },
    brewingRecs: [
      { method: 'Pour Over V60', ratio: '1:16 (18g café / 288ml agua)', grind: 'Medio Fino', temp: '92°C' },
      { method: 'Prensa Francesa', ratio: '1:15 (20g café / 300ml agua)', grind: 'Grueso', temp: '94°C (Infusión 4 min)' },
      { method: 'Espresso', ratio: '18g in / 36g out', grind: 'Fino Espresso', temp: '93°C (28 seg)' }
    ]
  },
  {
    id: 'ciclo-veracruzano',
    name: 'Ciclo Veracruzano',
    subtitle: 'Coatepec, MX | Honey Process',
    category: 'Whole Bean',
    price: 24.00,
    weight: '340g',
    region: 'Veracruz',
    elevation: '1,250m',
    process: 'Honey',
    roastLevel: 'Medium Roast',
    flavorNotes: ['Cacao Fino', 'Avellana', 'Caramelo Toffee', 'Naranja Dulce'],
    description: 'Cultivado bajo la sombra de la niebla veracruzana. Un perfil sumamente balanceado con dulzura natural acentuada por su proceso artesanal Honey.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    isOrganic: true,
    scores: { acidity: 5, body: 7, bitterness: 4, sweetness: 8 },
    brewingRecs: [
      { method: 'Chemex', ratio: '1:15', grind: 'Medio', temp: '93°C' },
      { method: 'Aeropress', ratio: '1:14', grind: 'Medio Fino', temp: '90°C' }
    ]
  },
  {
    id: 'noche-de-chiapas',
    name: 'Noche de Chiapas',
    subtitle: 'Jaltenango, MX | Natural Process',
    category: 'Whole Bean',
    price: 26.00,
    weight: '340g',
    region: 'Chiapas',
    elevation: '1,600m',
    process: 'Natural',
    roastLevel: 'Dark Roast',
    flavorNotes: ['Cacao Intenso', 'Humo Dulce', 'Especias', 'Frutos Rojos'],
    description: 'Cosechado a gran altura en la Sierra Madre de Chiapas. Tueste oscuro sutil que potencia notas de chocolate negro y humo artesanal.',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    isOrganic: true,
    scores: { acidity: 3, body: 9, bitterness: 7, sweetness: 6 },
    brewingRecs: [
      { method: 'Espresso', ratio: '1:2', grind: 'Fino', temp: '92°C' },
      { method: 'Cafetera Italiana (Moka)', ratio: '1:10', grind: 'Medio Fino', temp: 'Agua Caliente' }
    ]
  },
  {
    id: 'oaxaca-bright',
    name: 'Oaxaca Bright',
    subtitle: 'Sierra Sur, MX | Washed Process',
    category: 'Ground Coffee',
    price: 22.00,
    weight: '340g',
    region: 'Oaxaca',
    elevation: '1,500m',
    process: 'Washed',
    roastLevel: 'Light Roast',
    flavorNotes: ['Cítricos Claros', 'Miel de Azahar', 'Jazmín', 'Manzana Verde'],
    description: 'Perfil vibrante con acidez brillante y refrescante. Ideal para amantes del café de especialidad filtrado.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    isOrganic: true,
    scores: { acidity: 9, body: 5, bitterness: 2, sweetness: 8 },
    brewingRecs: [
      { method: 'V60', ratio: '1:16', grind: 'Medio Fino', temp: '91°C' }
    ]
  },
  {
    id: 'house-blend-1lb',
    name: 'House Blend (1lb)',
    subtitle: 'Mezcla Insignia | Veracruz & Oaxaca',
    category: 'Wholesale Bags',
    price: 18.00,
    weight: '454g',
    region: 'Veracruz',
    elevation: '1,350m',
    process: 'Washed',
    roastLevel: 'Medium Roast',
    flavorNotes: ['Nuez', 'Chocolate con Leche', 'Azúcar Mascabado'],
    description: 'Nuestra fórmula icónica para el uso diario. Consistencia, notas balanceadas y una crema aterciopelada.',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    isOrganic: false,
    scores: { acidity: 5, body: 6, bitterness: 5, sweetness: 7 },
    brewingRecs: [
      { method: 'Goteo Tradicional', ratio: '1:15', grind: 'Medio', temp: '92°C' }
    ]
  },
  {
    id: 'origin-discovery-kit',
    name: 'Origin Discovery Kit',
    subtitle: '4 x 4oz Assorted Roasts',
    category: 'Gift Sets',
    price: 48.00,
    weight: '450g Total',
    region: 'Oaxaca',
    elevation: '1,300m - 1,600m',
    process: 'Washed',
    roastLevel: 'Medium Roast',
    flavorNotes: ['Variedad de Orígenes', 'Cata Completa', 'Notas Florales & Frutales'],
    description: 'Set exclusivo de degustación con muestras de Oaxaca, Veracruz, Chiapas y nuestra mezcla de tueste medio.',
    image: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    isOrganic: true,
    scores: { acidity: 7, body: 7, bitterness: 5, sweetness: 8 },
    brewingRecs: [
      { method: 'Cata Guiada', ratio: '1:16', grind: 'Medio', temp: '93°C' }
    ]
  },
  {
    id: 'reserva-veracruz',
    name: 'Reserva Veracruz',
    subtitle: 'Coatepec Edición Limitada',
    category: 'Whole Bean',
    price: 38.00,
    weight: '340g',
    region: 'Veracruz',
    elevation: '1,550m',
    process: 'Anaerobic',
    roastLevel: 'Medium Roast',
    flavorNotes: ['Vino Tinto', 'Moras Silvestres', 'Cacao Criollo'],
    description: 'Fermentación anaeróbica en tanques sellados por 72 horas. Un perfil exótico y complejo para paladares exigentes.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    isOrganic: true,
    scores: { acidity: 8, body: 8, bitterness: 3, sweetness: 9 },
    brewingRecs: [
      { method: 'Syphon / V60', ratio: '1:16', grind: 'Medio Fino', temp: '92°C' }
    ]
  }
];
