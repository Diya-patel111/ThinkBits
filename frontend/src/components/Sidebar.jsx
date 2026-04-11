
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-[#f3f4f6] dark:bg-slate-900 pt-20 flex flex-col p-4 font-headline z-40">
      <div className="flex items-center gap-3 px-4 py-6 mb-4">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-primary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-white">person</span>
        </div>
        <div>
          <p className="text-on-surface font-black text-sm">NexHire Workspace</p>
          <p className="text-on-surface-variant text-xs uppercase">Recruiter Admin</p>
        </div>
      </div>
      <nav className="space-y-1 flex-1">
        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-[#e7e8ea] rounded-lg transition-all duration-200">
          <span className="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </Link>
        <Link to="/upload" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-[#e7e8ea] rounded-lg transition-all duration-200">
          <span className="material-symbols-outlined">cloud_upload</span>
          <span>Upload Resume</span>
        </Link>
        <Link to="/match" className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-[#e7e8ea] rounded-lg transition-all duration-200">
          <span className="material-symbols-outlined">join_inner</span>
          <span>Job Matching</span>
        </Link>
      </nav>
    </aside>
  );
}
  