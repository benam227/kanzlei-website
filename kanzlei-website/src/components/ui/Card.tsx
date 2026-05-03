interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-surface border border-border rounded-card shadow-card hover:shadow-cardHover transition-shadow ${className}`}
    >
      {children}
    </div>
  );
}
