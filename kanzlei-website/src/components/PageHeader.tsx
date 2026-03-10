interface PageHeaderProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function PageHeader({ title, subtitle, imageSrc, imageAlt }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-b from-[#1a365d] to-[#2c5282] text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        {imageSrc && (
          <div className="mb-6">
            <img
              src={imageSrc}
              alt={imageAlt || title}
              className="w-full max-h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl text-gray-200 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
