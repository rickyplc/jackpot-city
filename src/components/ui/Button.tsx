import * as React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}

export function Button({ className = '', ...props }: Props) {
  return (
    <button
      className={
        'inline-flex items-center justify-center rounded-lg px-4 py-2 border bg-white/10 text-white hover:bg-white/20 transition ' +
        className
      }
      {...props}
    />
  )
}
