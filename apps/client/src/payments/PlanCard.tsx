import { GlassCard, Chip, Button, Icon } from '@/design-system/primitives'
import type { Plan } from '@/data/plans'

interface PlanCardProps {
  plan: Plan
  isCurrentPlan: boolean
  onSelect: (plan: Plan) => void
}

export function PlanCard({ plan, isCurrentPlan, onSelect }: PlanCardProps) {
  const isPremium = plan.highlight

  return (
    <GlassCard 
      variant={isPremium ? 'elevated' : 'default'} 
      style={{ 
        padding: '40px 32px', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        border: isPremium ? '1px solid var(--cyan)40' : '1px solid var(--border)',
        boxShadow: isPremium ? '0 0 30px rgba(0,229,255,0.1)' : 'none'
      } as React.CSSProperties}
    >
      {isPremium && (
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <Chip variant="cyan" style={{ fontSize: 9, fontWeight: 800 }}>RECOMMENDED</Chip>
        </div>
      )}

      <div style={{ marginBottom: 32 }}>
        <Chip variant={plan.chipVariant} className="chip-sm" style={{ marginBottom: 12 }}>{plan.name.toUpperCase()}</Chip>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: 'var(--ff-disp)', fontSize: 42, fontWeight: 800, color: isPremium ? 'var(--cyan)' : '#fff' }}>
            ${plan.price}
          </span>
          <span className="mono txt-2" style={{ fontSize: 12 }}>/{plan.period === 'forever' ? 'once' : 'mo'}</span>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div className="mono txt-2" style={{ fontSize: 9, marginBottom: 16, letterSpacing: '0.1em' }}>CAPABILITIES</div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 0, margin: 0, listStyle: 'none' }}>
          {plan.features.map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(52,211,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                <Icon name="check" size={10} color="var(--green)" />
              </div>
              <span style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.4 }}>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={isPremium ? 'primary' : 'ghost'}
        onClick={() => onSelect(plan)}
        disabled={isCurrentPlan}
        style={{ width: '100%', justifyContent: 'center', marginTop: 40, padding: '14px' }}
      >
        {isCurrentPlan ? 'CURRENT_PLAN' : plan.price === 0 ? 'INITIALIZE' : 'SELECT TIER'}
      </Button>
    </GlassCard>
  )
}
