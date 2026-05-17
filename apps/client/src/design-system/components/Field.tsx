import { useId, forwardRef } from 'react'
import { cn } from '@/lib/cn'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface BaseFieldProps {
  label?: string
  error?: string
  helpText?: string
  className?: string
}

interface InputFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {
  as?: 'input'
}

interface TextareaFieldProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: 'textarea'
  rows?: number
}

type FieldProps = InputFieldProps | TextareaFieldProps

/**
 * Field — Accessible form input with label, error, help text.
 * Full a11y: htmlFor → id binding, aria-describedby on errors.
 * Maps to: .field CSS class
 */
export const Field = forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
  function Field(props, ref) {
    const generatedId = useId()
    const { label, error, helpText, className, as = 'input', ...rest } = props
    const inputId = (rest as InputHTMLAttributes<HTMLInputElement>).id ?? generatedId
    const errorId = error ? `${inputId}-error` : undefined
    const helpId = helpText ? `${inputId}-help` : undefined

    const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined

    const sharedProps = {
      id: inputId,
      'aria-describedby': describedBy,
      'aria-invalid': error ? (true as const) : undefined,
      className: cn('field', error && 'border-red/40 focus:border-red/60', className),
    }

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="mono txt-2" style={{ fontSize: 10 }}>
            {label}
          </label>
        )}

        {as === 'textarea' ? (
          <textarea
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            {...sharedProps}
            ref={ref as React.Ref<HTMLTextAreaElement>}
          />
        ) : (
          <input
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            {...sharedProps}
            ref={ref as React.Ref<HTMLInputElement>}
          />
        )}

        {error && (
          <span id={errorId} className="mono text-[10px]" style={{ color: 'var(--red)' }} role="alert">
            {error}
          </span>
        )}
        {helpText && !error && (
          <span id={helpId} className="mono txt-2 text-[10px]">
            {helpText}
          </span>
        )}
      </div>
    )
  }
)
