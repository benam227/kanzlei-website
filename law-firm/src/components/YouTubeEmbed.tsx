import { useState } from 'react';
import { useConsent } from '../context/ConsentContext';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const { hasExternalMedia } = useConsent();
  const [showVideo, setShowVideo] = useState(hasExternalMedia);

  const handleClick = () => {
    setShowVideo(true);
  };

  if (!showVideo) {
    return (
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handleClick}
            className="px-6 py-3 bg-[#c53030] text-white rounded-lg hover:bg-[#e53e3e] transition-colors flex items-center gap-2"
            aria-label={`Video ${title} abspielen`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Video abspielen
          </button>
        </div>
        <p className="absolute bottom-2 left-2 text-xs text-gray-500">
          Durch Klicken stimmen Sie der YouTube-Nutzung zu.
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}
