import Link from 'next/link';
import NavLinks from './nav-links';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-1">
        <NavLinks />
      </div>
      <div className="mt-auto border-t border-gray-800 pt-4 px-3">
        <Link 
          href="/"
          className="flex items-center gap-2 rounded-md py-2 px-3 text-sm hover:bg-[color:var(--f1-dark-blue)] text-gray-400 hover:text-white transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-5 h-5"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" 
            />
          </svg>
          Volver al sitio
        </Link>
      </div>
    </div>
  );
}
