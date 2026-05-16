import { GlassCard, Chip, Button, Icon } from '@/design-system/primitives'
import type { Plan } from '@/data/plans'
import React from 'react'

interface PlanCardProps {
  plan: Plan
  isCurrentPlan: boolean
  onSelect: (plan: Plan) => void
}

export function PlanCard({ plan, isCurrentPlan, onSelect }: PlanCardProps) {
  return (
    <GlassCard variant={plan.highlight ? 'elevated' : 'default'} style={{ position: 'relative', padding: '32px 24px' } as React.CSSProperties}>
      {plan.highlight && (
        <Chip variant="cyan" style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)' } as React.CSSProperties}>
          MOST POPULAR
        </Chip>
      )}
      <Chip variant={plan.chipVariant}>{plan.name}</Chip>
      <div className="h-xl mt-4" style={{ marginTop: 16 }}>
        {plan.price === 0 ? 'Free' : `$${plan.price}`}
        {plan.price > 0 && <span className="txt-2 text-sm">/{plan.period}</span>}
      </div>
      <ul style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12, padding: 0, listStyle: 'none' }}>
        {plan.features.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="txt-2 text-sm">
            <Icon name="check" size={14} color="var(--green)" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <Button
        variant={plan.highlight ? 'primary' : 'ghost'}
        style={{ width: '100%', marginTop: 32, justifyContent: 'center' }}
        disabled={isCurrentPlan}
        onClick={() => !isCurrentPlan && plan.price > 0 && onSelect(plan)}
      >
        {isCurrentPlan ? 'Current Plan' : plan.price === 0 ? 'Get Started' : 'Upgrade'}
      </Button>
    </GlassCard>
  )
}
