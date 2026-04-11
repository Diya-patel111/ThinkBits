
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, Users, Settings, BrainCircuit, Code, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    toast.success('Successfully logged out!');
    navigate('/login');
  };

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-white border-r border-slate-200 flex flex-col font-sans z-40">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-primary">
          <BrainCircuit className="w-6 h-6 shrink-0" strokeWidth={2.5} />
          <span className="text-xl font-bold tracking-tight text-slate-900">NexHire AI</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 flex flex-col gap-1 overflow-y-auto">
        <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu</p>
        
        <Link 
          to="/dashboard" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
            isActive('/dashboard') 
              ? 'bg-blue-50 text-blue-700' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        
        <Link 
          to="/upload" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
            isActive('/upload') 
              ? 'bg-blue-50 text-blue-700' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <UploadCloud className="w-5 h-5" />
          <span>Upload Resume</span>
        </Link>
        
        <Link 
          to="/match" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
            isActive('/match') 
              ? 'bg-blue-50 text-blue-700' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Job Matching</span>
        </Link>
        
        <Link 
          to="/api-docs" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
            isActive('/api-docs') 
              ? 'bg-blue-50 text-blue-700' 
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Code className="w-5 h-5" />
          <span>API Access</span>
        </Link>
      </div>

      {/* Bottom Settings */}
      <div className="p-4 border-t border-slate-200 flex flex-col gap-1">
        <Link 
          to="#" 
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all text-left w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
  
