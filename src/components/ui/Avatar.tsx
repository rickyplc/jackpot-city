import Image, { type ImageProps } from 'next/image'
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

type AvatarNextImageProps = Omit<ImageProps, 'fill' | 'width' | 'height'> & {
  sizes?: string
}

export function AvatarImage({
  className,
  alt = '',
  sizes = '64px',
  ...rest
}: AvatarNextImageProps) {
  return (
    <Image alt={alt} fill sizes={sizes} className={`object-cover ${className ?? ''}`} {...rest} />
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
