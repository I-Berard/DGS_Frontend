import { cn } from '../../lib/utils'
import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-zinc-800 text-foreground hover:bg-zinc-700',
    ghost: 'bg-transparent hover:bg-zinc-800/50'
  }
  const sizes = {
    sm: 'h-9 px-3 rounded-md text-sm',
    md: 'h-10 px-4 rounded-md',
    lg: 'h-12 px-5 rounded-lg text-lg'
  }
  return (
    <button
      className={cn('inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none', variants[variant], sizes[size], className)}
      {...props}
    />
  )
}
