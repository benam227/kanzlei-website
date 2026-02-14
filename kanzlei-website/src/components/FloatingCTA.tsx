import { Link } from 'react-router-dom';

export default function FloatingCTA() {
  return (
    <Link
      to="/termin-buchen"
      className="fixed bottom-6 right-6 z-50 px-6 py-3 bg-[#c53030] text-white rounded-full shadow-lg hover:bg-[#e53e3e] transition-colors font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
      aria-label="Termin buchen"
    >
      Termin buchen
    </Link>
  );
}
