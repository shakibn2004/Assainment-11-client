import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
}

export function Spinner({ size = 'md', variant = 'primary', className, ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };

  const variantClasses = {
    primary: 'border-primary/30 border-t-primary',
    secondary: 'border-secondary/30 border-t-secondary',
    white: 'border-white/30 border-t-white',
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)} {...props}>
      <div 
        className={cn(
          "rounded-full animate-spin",
          sizeClasses[size],
          variantClasses[variant]
        )} 
      />
      {/* Inner pulsing circle for extra eye-catching effect */}
      <div 
        className={cn(
          "absolute rounded-full animate-pulse opacity-50",
          variant === 'primary' ? 'bg-primary' : variant === 'secondary' ? 'bg-secondary' : 'bg-white',
          size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-8 h-8'
        )}
      />
    </div>
  );
}

export function LoadingScreen({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-6 animate-in fade-in duration-500">
      <div className="relative">
        {/* Outer glowing ring */}
        <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full animate-pulse" />
        <Spinner size="xl" variant="primary" className="relative z-10" />
      </div>
      <p className="text-muted-foreground font-medium animate-pulse tracking-widest uppercase text-sm">
        {text}
      </p>
    </div>
  );
}
