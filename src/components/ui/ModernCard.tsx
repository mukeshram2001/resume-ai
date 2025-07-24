
import React from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'floating' | 'interactive' | 'glow';
  glowColor?: 'blue' | 'pink' | 'green' | 'purple';
  animated?: boolean;
}

const ModernCard = React.forwardRef<HTMLDivElement, ModernCardProps>(
  ({ className, children, variant = 'floating', glowColor = 'blue', animated = true, ...props }, ref) => {
    const variants = {
      floating: 'card-floating',
      interactive: 'card-interactive',
      glow: `card-floating card-glow-${glowColor}`
    };

    return (
      <div
        ref={ref}
        className={cn(
          variants[variant],
          animated && 'transform-gpu',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ModernCard.displayName = 'ModernCard';

export default ModernCard;
