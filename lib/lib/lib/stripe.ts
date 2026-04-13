import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
})

export const STRIPE_PRICE_TO_PLAN: Record<string, string> = {
  [process.env.STRIPE_PRICE_STARTER!]: 'STARTER',
  [process.env.STRIPE_PRICE_PRO!]: 'PRO',
  [process.env.STRIPE_PRICE_BUSINESS!]: 'BUSINESS',
  [process.env.STRIPE_PRICE_ENTERPRISE!]: 'ENTERPRISE',
}

export const PLANS = [
  {
    id: 'STARTER',
    name: 'Starter',
    price: 29,
    priceId: process.env.STRIPE_PRICE_STARTER!,
    features: [
      '1 boutique connectée',
      '300 commandes / mois',
      'Tracking simple',
      'Sync stocks basique',
      'Support par email',
    ],
  },
  {
    id: 'PRO',
    name: 'Pro',
    price: 79,
    priceId: process.env.STRIPE_PRICE_PRO!,
    features: [
      '3 boutiques connectées',
      '2 000 commandes / mois',
      'Automatisation fournisseurs',
      'Multi-entrepôts',
      'Tracking personnalisé',
    ],
  },
  {
    id: 'BUSINESS',
    name: 'Business',
    price: 149,
    priceId: process.env.STRIPE_PRICE_BUSINESS!,
    popular: true,
    features: [
      'Boutiques illimitées',
      'IA avancée + prévisions',
      'Multi-plateformes complet',
      'API webhooks',
      'Support prioritaire 24/7',
    ],
  },
  {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    price: 499,
    priceId: process.env.STRIPE_PRICE_ENTERPRISE!,
    features: [
      'API privée dédiée',
      'Entrepôts multiples illimités',
      'Onboarding personnalisé',
      'SLA garanti 99.99%',
      'Account manager dédié',
    ],
  },
]

export const PLAN_LIMITS = {
  FREE:       { shops: 0,  orders: 0,    warehouses: 0 },
  STARTER:    { shops: 1,  orders: 300,  warehouses: 1 },
  PRO:        { shops: 3,  orders: 2000, warehouses: 3 },
  BUSINESS:   { shops: -1, orders: -1,   warehouses: -1 },
  ENTERPRISE: { shops: -1, orders: -1,   warehouses: -1 },
}
