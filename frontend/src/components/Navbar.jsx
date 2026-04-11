
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f8f9fb] dark:bg-slate-950 flex justify-between items-center px-8 py-4 font-headline tracking-tight">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[#191c1e] dark:text-white">
          <BrainCircuit className="text-primary w-8 h-8" strokeWidth={2.5} />
          NexHire AI
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-primary font-bold border-b-2 border-primary pb-1">Platform</Link>
          <Link to="/" className="text-slate-600 hover:text-primary transition-colors">Solutions</Link>
          <Link to="/" className="text-slate-600 hover:text-primary transition-colors">Resources</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-slate-600 font-medium px-4 py-2 hover:text-primary transition-colors">Sign In</Link>
        <Link to="/signup" className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-all shadow-sm">Get Started</Link>
      </div>
    </nav>
  );
}
  
