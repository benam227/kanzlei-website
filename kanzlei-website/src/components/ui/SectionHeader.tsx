interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-6 md:mb-8 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-mutedText leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
