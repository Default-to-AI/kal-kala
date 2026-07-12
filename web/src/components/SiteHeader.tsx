import { Link, useLocation } from 'react-router-dom';

export function SiteHeader() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--surface-alt)] bg-[var(--bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="t-hero text-2xl hover:opacity-80 transition-opacity"
        >
          <span style={{ fontFamily: '"Playfair Display", serif' }}>Kal-Kala</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link 
            to="/equity" 
            className={`text-sm font-semibold transition-colors ${currentPath.includes('equity') ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          >
            הון עצמי
          </Link>
          <Link 
            to="/loans" 
            className={`text-sm font-semibold transition-colors ${currentPath.includes('liabilities') || currentPath.includes('loans') ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          >
            התחייבויות
          </Link>
          <Link 
            to="/bonds" 
            className={`text-sm font-semibold transition-colors ${currentPath.includes('bonds') ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          >
            אג״ח
          </Link>
        </nav>
      </div>
    </header>
  );
}
