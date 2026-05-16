export interface Plan {
  id: string
  name: string
  price: number
  period: string
  stripeProductId: string | null
  stripePriceId: string | null
  features: string[]
  highlight: boolean
  chipVariant: 'cyan' | 'violet' | 'amber' | 'green' | 'red' | 'default'
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Ghost',
    price: 0,
    period: 'forever',
    stripeProductId: null,
    stripePriceId: null,
    features: [
      '3 active personas',
      '500 generations/month',
      '2 node connections',
      'Shadow Archive (7 days)',
      'Community support',
    ],
    highlight: false,
    chipVariant: 'default',
  },
  {
    id: 'pro',
    name: 'Phantom',
    price: 29,
    period: 'month',
    stripeProductId: 'prod_xxx',
    stripePriceId: 'price_xxx',
    features: [
      'Unlimited personas',
      '10,000 generations/month',
      '10 node connections',
      'Shadow Archive (90 days)',
      'Neural Reply + Arena access',
      'Priority support',
    ],
    highlight: true,
    chipVariant: 'cyan',
  },
  {
    id: 'shadow',
    name: 'Wraith',
    price: 99,
    period: 'month',
    stripeProductId: 'prod_yyy',
    stripePriceId: 'price_yyy',
    features: [
      'Everything in Phantom',
      'Unlimited generations',
      'Unlimited nodes',
      'Shadow Archive (forever)',
      'Live Audio access',
      'Global Telemetry',
      'Dedicated support',
    ],
    highlight: false,
    chipVariant: 'violet',
  },
]
