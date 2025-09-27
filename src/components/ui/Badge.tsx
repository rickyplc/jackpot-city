import * as React from 'react'

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary'
}

export function Badge({ className = '', variant = 'default', ...props }: Props) {
  const base = 'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border'
  const variants = {
    default: 'bg-white/10 text-white border-white/20',
    secondary: 'bg-white/10 text-white border-white/30',
  } as const
  return <span className={`${base} ${variants[variant]} ${className}`} {...props} />
}
