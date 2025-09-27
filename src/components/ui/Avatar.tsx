import * as React from 'react'

export function Avatar({ className = '', style, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`relative inline-flex overflow-hidden rounded-full bg-white/10 ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>

export function AvatarImage(props: ImgProps) {
  return (
    <img
      {...props}
      alt={props.alt ?? ''}
      className={`h-full w-full object-cover ${props.className ?? ''}`}
    />
  )
}

export function AvatarFallback({
  className = '',
  style,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex h-full w-full items-center justify-center ${className}`} style={style}>
      {children}
    </div>
  )
}
