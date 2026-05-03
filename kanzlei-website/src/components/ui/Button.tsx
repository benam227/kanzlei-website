import { type ButtonHTMLAttributes, type ReactNode, cloneElement, isValidElement } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

export default function Button({
  variant = 'primary',
  disabled = false,
  children,
  className = '',
  asChild = false,
  ...buttonProps
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-5 font-semibold tracking-tight transition-colors focus-visible:ring-2 focus-visible:ring-brand/30 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizeStyles = 'h-11 md:h-12';
  const radiusStyles = 'rounded-full';

  const variantStyles = {
    primary: 'bg-brand text-white hover:bg-brandMuted',
    secondary: 'bg-surface text-brand border border-border hover:bg-bg',
    ghost: 'bg-transparent text-brand hover:bg-bg',
  };

  const combinedClassName = `${baseStyles} ${sizeStyles} ${radiusStyles} ${variantStyles[variant]} ${className}`.trim();

  if (asChild && isValidElement<{ className?: string; [key: string]: unknown }>(children)) {
    return cloneElement(children, {
      className: `${combinedClassName} ${children.props.className || ''}`.trim(),
      ...buttonProps,
    });
  }

  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
