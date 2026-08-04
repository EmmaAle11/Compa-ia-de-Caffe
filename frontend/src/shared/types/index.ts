/**
 * [FRONTEND - FSD LAYER: Shared Types]
 * Domain-wide shared TypeScript interfaces and types.
 */

export type RoastLevelType = 'light' | 'medium' | 'medium-dark' | 'dark';

export type GrindOption = 
  | 'Grano Entero' 
  | 'Molido Medio' 
  | 'Prensa Francesa' 
  | 'Espresso' 
  | 'V60 / Pour Over'
  | 'Whole Bean' 
  | 'Ground Coffee' 
  | 'French Press' 
  | 'V60 Pour Over';

export interface BrewingRecommendation {
  method: string;
  ratio: string;
  grind: string;
  temp: string;
}

export interface FlavorScores {
  acidity: number;
  body: number;
  bitterness: number;
  sweetness: number;
}

export interface CoffeeProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'Whole Bean' | 'Ground Coffee' | 'Wholesale Bags' | 'Gift Sets';
  price: number;
  weight: string;
  region: string;
  elevation: string;
  process: 'Washed' | 'Honey' | 'Natural' | 'Anaerobic';
  roastLevel: 'Light Roast' | 'Medium Roast' | 'Medium-Dark Roast' | 'Dark Roast';
  flavorNotes: string[];
  description: string;
  image: string;
  isBestSeller?: boolean;
  isOrganic?: boolean;
  scores: FlavorScores;
  brewingRecs: BrewingRecommendation[];
}

export interface CartItem {
  cartId: string;
  product: CoffeeProduct;
  quantity: number;
  grind: GrindOption;
  unitPrice: number;
  totalPrice: number;
}

export type ActiveTab = 
  | 'home' 
  | 'shop' 
  | 'product_detail' 
  | 'story_process' 
  | 'contact' 
  | 'checkout' 
  | 'backoffice'
  | 'ai_sommelier';

export interface TechnicalStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  image: string;
}

export interface FarmInfo {
  id: string;
  name: string;
  region: string;
  elevation: string;
  producer: string;
  image: string;
  description: string;
  varieties: string[];
}

export interface OrderRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  items: { productName: string; qty: number; total: number }[];
  amount: number;
  date: string;
  status: 'Pendiente' | 'En Proceso' | 'Enviado' | 'Entregado';
  paymentMethod: string;
}

export interface AiRecommendationRequest {
  preference?: string;
  mood?: string;
  flavorNotes?: string;
  milkType?: string;
  temperature?: string;
}

export interface AiRecommendationResponse {
  title: string;
  description: string;
  reason: string;
  flavorNotes: string[];
  pairings: string[];
  roastLevel: string;
}
