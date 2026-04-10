import React, { useEffect, useState, useMemo } from 'react';
// import api from '../services/api';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalCandidates: 0,
    shortlisted: 0
  });
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sorting and Filtering State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('match'); // 'match' or 'name'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example logic for a real API (uncomment when backend is ready):
        // const statsRes = await api.get('/api/stats');
        // const candidatesRes = await api.get('/api/candidates');
        // setStats(statsRes.data);
        // setCandidates(candidatesRes.data);
        
        // Simulating an API call with mock data
        setTimeout(() => {
          setStats({
            totalJobs: 12,
            totalCandidates: 145,
            shortlisted: 34
          });

          setCandidates([
            { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', match: 95, status: 'Shortlisted', date: '2023-10-01' },
            { id: 2, name: 'Bob Smith', role: 'Backend Developer', match: 88, status: 'Pending Review', date: '2023-10-02' },
            { id: 3, name: 'Charlie Green', role: 'Full Stack Developer', match: 92, status: 'Interviewing', date: '2023-10-03' },
            { id: 4, name: 'Diana Prince', role: 'UI/UX Designer', match: 75, status: 'Rejected', date: '2023-10-04' },
            { id: 5, name: 'Evan Wright', role: 'Data Scientist', match: 98, status: 'Shortlisted', date: '2023-10-05' },
            { id: 6, name: 'Fiona Lee', role: 'Product Manager', match: 82, status: 'Pending Review', date: '2023-10-06' },
          ]);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and Sort Logic
  const processedCandidates = useMemo(() => {
    let result = [...candidates];

    // Apply specific status filter
    if (statusFilter !== 'All') {
      result = result.filter(c => c.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply Sorting
    result.sort((a, b) => {
      if (sortBy === 'match') {
        return sortOrder === 'desc' ? b.match - a.match : a.match - b.match;
      } else if (sortBy === 'name') {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      }
      return 0;
    });

    return result;
  }, [candidates, searchTerm, statusFilter, sortBy, sortOrder]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc'); // default to desc for matches, asc for names potentially
    }
  };

  // Mock Chart Data
  const chartData = [
    { name: 'Mon', applicants: 12 },
    { name: 'Tue', applicants: 19 },
    { name: 'Wed', applicants: 15 },
    { name: 'Thu', applicants: 25 },
    { name: 'Fri', applicants: 22 },
    { name: 'Sat', applicants: 30 },
    { name: 'Sun', applicants: 28 },
  ];

  const pieData = [
    { name: 'Shortlisted', value: 34 },
    { name: 'Reviewing', value: 50 },
    { name: 'Rejected', value: 61 },
  ];
  const COLORS = ['#4f46e5', '#57dffe', '#ba1a1a'];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-bold text-2xl text-primary bg-surface">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary mr-4 border-t-transparent"></div>
      Loading Insights...
    </div>
  );

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen selection:bg-primary-fixed selection:text-on-primary-fixed p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-headline font-bold tracking-tight mb-2">Talent Dashboard</h1>
            <p className="text-on-surface-variant text-lg">AI-powered insights for your active pipelines.</p>
          </div>
          <button className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">upload_file</span>
            Upload Resumes
          </button>
        </header>

        {/* Stats Cards */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow relative overflow-hidden group">
             <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
             <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-12 h-12 bg-primary-container text-on-primary-container rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">work</span>
                </div>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold font-label tracking-wide">+2 Active</span>
             </div>
             <p className="text-on-surface-variant font-medium text-sm uppercase tracking-wider mb-2 relative z-10">Active Jobs</p>
             <h3 className="text-4xl font-headline font-extrabold relative z-10">{stats.totalJobs}</h3>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow relative overflow-hidden group">
             <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-secondary/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
             <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-12 h-12 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-xs font-bold font-label tracking-wide">+15 Today</span>
             </div>
             <p className="text-on-surface-variant font-medium text-sm uppercase tracking-wider mb-2 relative z-10">Total Candidates</p>
             <h3 className="text-4xl font-headline font-extrabold relative z-10">{stats.totalCandidates}</h3>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow relative overflow-hidden group">
             <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-tertiary/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
             <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold font-label tracking-wide">Top 20%</span>
             </div>
             <p className="text-on-surface-variant font-medium text-sm uppercase tracking-wider mb-2 relative z-10">Shortlisted</p>
             <h3 className="text-4xl font-headline font-extrabold relative z-10">{stats.shortlisted}</h3>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/20">
            <h2 className="text-xl font-headline font-bold mb-6">Applicant Volume</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Line type="monotone" dataKey="applicants" stroke="#4f46e5" strokeWidth={3} dot={{r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/20 relative">
            <h2 className="text-xl font-headline font-bold mb-6">Pipeline Breakdown</h2>
            <div className="h-64 flex flex-row items-center justify-between">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart cursor="pointer">
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              {/* Legend */}
              <div className="w-1/2 flex flex-col gap-4 pl-4 border-l border-outline-variant/20">
                {pieData.map((entry, i) => (
                  <div key={entry.name} className="flex justify-between items-center w-full">
                     <div className="flex items-center gap-3">
                       <div className="w-4 h-4 rounded-full shadow-sm" style={{backgroundColor: COLORS[i]}}></div>
                       <span className="text-sm font-semibold text-on-surface-variant tracking-wide">{entry.name}</span>
                     </div>
                     <span className="text-base font-bold text-on-surface">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Candidate Table with Filters & Sorting */}
        <section className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col">
          <div className="p-6 border-b border-outline-variant/20 flex gap-4 flex-col lg:flex-row items-start lg:items-center justify-between">
            <h2 className="text-xl font-headline font-bold">Recent Candidates</h2>
            
            <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative w-full lg:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">search</span>
                <input 
                  type="text" 
                  placeholder="Search by name or role..." 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filter */}
              <div className="relative w-full lg:w-48">
                 <select 
                   className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-sm appearance-none cursor-pointer"
                   value={statusFilter}
                   onChange={(e) => setStatusFilter(e.target.value)}
                 >
                   <option value="All">All Pipeline Stages</option>
                   <option value="Shortlisted">Shortlisted Candidates</option>
                   <option value="Interviewing">Interviewing</option>
                   <option value="Pending Review">Pending Review</option>
                   <option value="Rejected">Rejected</option>
                 </select>
                 <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline text-xl pointer-events-none">filter_list</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-b-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant text-[11px] font-label uppercase tracking-[0.2em] border-b border-outline-variant/20">
                  <th 
                    className="px-6 py-5 cursor-pointer hover:text-primary transition-colors group select-none"
                    onClick={() => toggleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Candidate Identity
                      <span className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${sortBy === 'name' ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-50'} ${sortOrder === 'desc' && sortBy === 'name' ? 'rotate-180' : ''}`}>arrow_upward</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 select-none">Target Role</th>
                  <th 
                    className="px-6 py-5 cursor-pointer hover:text-primary transition-colors group select-none"
                    onClick={() => toggleSort('match')}
                  >
                    <div className="flex items-center gap-2">
                      AI Fit Score
                      <span className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${sortBy === 'match' ? 'opacity-100 text-primary' : 'opacity-0 group-hover:opacity-50'} ${sortOrder === 'desc' && sortBy === 'match' ? 'rotate-180' : ''}`}>arrow_upward</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 select-none">Current Pipeline</th>
                  <th className="px-6 py-5 text-right select-none">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {processedCandidates.length > 0 ? processedCandidates.map((candidate, idx) => (
                  <tr key={candidate.id} className="hover:bg-surface-container-low/40 transition-colors group bg-white">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${idx % 2 === 0 ? 'bg-primary-container text-on-primary-container' : 'bg-tertiary-container text-on-tertiary-container'}`}>
                          {candidate.name.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div>
                          <span className="font-bold text-on-surface block tracking-tight">{candidate.name}</span>
                          <span className="text-[11px] text-outline font-medium">Applied {candidate.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/10">{candidate.role}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 w-40">
                        <div className="w-10 text-right">
                          <span className="font-bold text-[15px]">{candidate.match}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                          <div 
                            className={`h-full rounded-full transition-all duration-[1500ms] ease-out ${candidate.match >= 90 ? 'bg-primary' : candidate.match >= 80 ? 'bg-secondary' : 'bg-tertiary'}`}
                            style={{ width: `${candidate.match}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold tracking-wide uppercase shadow-sm ${
                        candidate.status === 'Shortlisted' ? 'bg-primary-container/80 text-on-primary-container border border-primary/20' : 
                        candidate.status === 'Interviewing' ? 'bg-secondary-container/80 text-on-secondary-container border border-secondary/20' :
                        candidate.status === 'Rejected' ? 'bg-error-container/80 text-on-error-container border border-error/20' :
                        'bg-surface-variant text-on-surface-variant border border-outline-variant/30'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${candidate.status === 'Shortlisted' ? 'bg-primary' : candidate.status === 'Interviewing' ? 'bg-secondary' : candidate.status === 'Rejected' ? 'bg-error' : 'bg-outline'}`}></div>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-outline hover:text-primary hover:bg-surface-tint/10 p-2.5 rounded-full transition-colors group-hover:shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-20 text-center text-on-surface-variant bg-surface-container-lowest">
                      <span className="material-symbols-outlined text-5xl mb-4 opacity-30">search_off</span>
                      <p className="font-bold text-lg mb-1 tracking-tight">No candidates found</p>
                      <p className="font-medium text-sm max-w-sm mx-auto opacity-70">We couldn't find any matches for your current sorting or filtering criteria. Try adjusting your parameters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;