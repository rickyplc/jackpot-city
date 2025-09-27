type Props = { value?: number; className?: string }

export function Progress({ value = 0, className = '' }: Props) {
  return (
    <div className={`h-2 w-full rounded-full bg-white/10 overflow-hidden ${className}`}>
      <div
        className="h-full bg-white/40"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}
