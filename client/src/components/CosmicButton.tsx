import React from 'react';
import { cn } from '@/lib/utils';

interface CosmicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const CosmicButton = React.forwardRef<HTMLButtonElement, CosmicButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'px-6 py-2 text-sm',
      md: 'px-8 py-3 text-base',
      lg: 'px-10 py-4 text-lg'
    };

    const variantClasses = {
      primary: 'bg-gradient-to-r from-purple-400/80 via-pink-300/70 to-purple-500/80 text-white border-purple-300/30',
      secondary: 'bg-gradient-to-r from-pink-200/60 via-purple-200/50 to-indigo-200/60 text-purple-800 border-purple-200/40'
    };

    return (
      <button
        ref={ref}
        className={cn(
          'cosmic-button relative font-semibold rounded-full border-2 transition-all duration-300 ease-in-out overflow-hidden group',
          sizeClasses[size],
          variantClasses[variant],
          'hover:shadow-lg hover:shadow-purple-300/50 hover:scale-105',
          'focus:outline-none focus:ring-4 focus:ring-purple-300/30',
          className
        )}
        {...props}
      >
        {/* Sparkle elements */}
        <div className="star-1 absolute top-1/4 left-1/4 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out">
          <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-300 fill-current">
            <path d="M12 0l2.939 8.561h9.061l-7.326 5.578 2.792 8.861-7.466-5.684-7.466 5.684 2.792-8.861-7.326-5.578h9.061z"/>
          </svg>
        </div>
        
        <div className="star-2 absolute top-2/3 left-1/6 w-2 h-2 opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out delay-200">
          <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-300 fill-current">
            <path d="M12 0l2.939 8.561h9.061l-7.326 5.578 2.792 8.861-7.466-5.684-7.466 5.684 2.792-8.861-7.326-5.578h9.061z"/>
          </svg>
        </div>

        <div className="star-3 absolute top-1/6 left-3/4 w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-all duration-900 ease-out delay-100">
          <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-300 fill-current">
            <path d="M12 0l2.939 8.561h9.061l-7.326 5.578 2.792 8.861-7.466-5.684-7.466 5.684 2.792-8.861-7.326-5.578h9.061z"/>
          </svg>
        </div>

        <div className="star-4 absolute top-1/2 left-4/5 w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out delay-300">
          <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-300 fill-current">
            <path d="M12 0l2.939 8.561h9.061l-7.326 5.578 2.792 8.861-7.466-5.684-7.466 5.684 2.792-8.861-7.326-5.578h9.061z"/>
          </svg>
        </div>

        <div className="star-5 absolute top-4/5 left-2/3 w-2 h-2 opacity-0 group-hover:opacity-100 transition-all duration-1200 ease-out delay-400">
          <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-300 fill-current">
            <path d="M12 0l2.939 8.561h9.061l-7.326 5.578 2.792 8.861-7.466-5.684-7.466 5.684 2.792-8.861-7.326-5.578h9.061z"/>
          </svg>
        </div>

        {/* Heart element */}
        <div className="heart absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-30 transition-all duration-1000 ease-out delay-500">
          <svg viewBox="0 0 24 24" className="w-full h-full text-pink-300 fill-current">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>

        {/* Button content */}
        <span className="relative z-10">{children}</span>

        {/* Cosmic glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
      </button>
    );
  }
);

CosmicButton.displayName = 'CosmicButton';

export default CosmicButton;