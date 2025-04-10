import Link from "next/link";
import SideNav from "../ui/sidenav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Sidebar */}
      <div className="hidden md:block w-64 border-r border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="h-full px-3 py-6">
          <Link href="/" className="flex items-center px-3 mb-8">
            <span className="font-semibold text-xl text-blue-500">Edge</span>
            <span className="font-semibold text-xl">Racing</span>
          </Link>
          <SideNav />
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex flex-col w-full">
        <header className="md:hidden bg-black/80 border-b border-gray-800 py-4 px-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <span className="font-semibold text-xl text-blue-500">Edge</span>
              <span className="font-semibold text-xl">Racing</span>
            </Link>
            {/* Mobile menu button (you can add functionality later) */}
            <button className="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
