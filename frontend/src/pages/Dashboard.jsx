
import { useState, useEffect } from 'react';
import { Users, FileText, CheckCircle, TrendingUp, Search, Filter } from 'lucide-react';
import { getCandidates } from '../services/api';

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback mock data if API fails to show design
  const fallbackCandidates = [
    { id: 1, name: 'Alice Chen', email: 'alice.c@example.com', skills: ['React', 'Node.js', 'TypeScript', 'AWS'], status: 'Interviewing', score: 92 },
    { id: 2, name: 'Michael Ross', email: 'michael.r@example.com', skills: ['Python', 'Django', 'SQL', 'Docker'], status: 'Screening', score: 85 },
    { id: 3, name: 'Tanya Smith', email: 'tanya.smith@example.com', skills: ['Figma', 'UI/UX', 'Wireframing', 'Prototyping'], status: 'Hired', score: 98 },
    { id: 4, name: 'Evan Davis', email: 'evandev@example.com', skills: ['Java', 'Spring Boot', 'Kafka', 'Kubernetes'], status: 'Sourced', score: 71 },
    { id: 5, name: 'Sophia Li', email: 'sli@domain.com', skills: ['Go', 'Microservices', 'GCP', 'PostgreSQL'], status: 'Interviewing', score: 88 },
  ];

  useEffect(() => {
    getCandidates()
      .then(res => {
        const payload = res.data?.candidates || res.data?.data || res.data || [];
        setCandidates(Array.isArray(payload) ? payload : fallbackCandidates);
      })
      .catch(err => {
        console.error("Failed to fetch candidates:", err);
        setCandidates(fallbackCandidates);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 hidden">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Overview</h2>
        <p className="text-slate-500 mt-1">Here is what's happening with your candidates today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
          <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Candidates</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{loading ? '...' : candidates.length}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
          <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Hired This Month</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">24</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Resumes Parsed</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{loading ? '...' : candidates.length}</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
          <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Jobs</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">15</h3>
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900">Recent Candidates</h3>
          
          <div className="flex items-center gap-3">
             <div className="relative">
               <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
               <input 
                 type="text" 
                 placeholder="Search by name or skill..." 
                 className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64" 
               />
             </div>
             <button className="flex items-center gap-2 border border-slate-200 px-4 py-2 text-sm rounded-lg text-slate-700 hover:bg-slate-50 font-medium">
               <Filter className="w-4 h-4" /> Filter
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-100">Candidate</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-100">Status</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-100">AI Match Score</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-100">Top Skills</th>
                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                 <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading candidates...</td></tr>
              ) : candidates.length > 0 ? (
                candidates.slice(0, 8).map((c, i) => (
                  <tr key={c.id || i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                           {c.name ? c.name.charAt(0) : '?'}
                         </div>
                         <div>
                           <p className="text-sm font-semibold text-slate-900">{c.name}</p>
                           <p className="text-sm text-slate-500">{c.email}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        c.status === 'Hired' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        c.status === 'Interviewing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {c.status || 'Sourced'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-200 rounded-full h-2 max-w-[100px]">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${c.score || Math.floor(Math.random() * 40 + 50)}%` }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">{c.score || Math.floor(Math.random() * 40 + 50)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(c.skills || []).slice(0, 3).map((s, idx) => (
                          <span key={idx} className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                            {s}
                          </span>
                        ))}
                        {(c.skills || []).length > 3 && (
                          <span className="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-md font-medium">
                            +{(c.skills || []).length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">View Profile</button>
                    </td>
                  </tr>
                ))
              ) : (
                 <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No candidates available.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
  