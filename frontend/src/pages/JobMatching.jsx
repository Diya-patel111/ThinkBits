
import { useState } from 'react';
import { Target, Zap, Building, ChevronRight, UserCheck, Star } from 'lucide-react';
import { matchJobs } from '../services/api';

export default function JobMatching() {
  const [jobDescription, setJobDescription] = useState('');
  const [matching, setMatching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // Mock results for fallback/design display
  const mockResults = [
    { id: 101, name: 'Alice Chen', role: 'Senior Frontend Engineer', score: 94, skills: ['React', 'TypeScript', 'Node.js', 'Tailwind'] },
    { id: 102, name: 'Sophia Li', role: 'Full Stack Developer', score: 88, skills: ['React', 'Go', 'PostgreSQL', 'Docker'] },
    { id: 103, name: 'Evan Davis', role: 'Software Engineer', score: 81, skills: ['React', 'JavaScript', 'Spring Boot', 'SQL'] },
  ];

  const handleMatch = async () => {
    if (!jobDescription.trim()) return;
    
    setMatching(true);
    setError(null);
    try {
      const response = await matchJobs(jobDescription);
      const matches = response.data?.matches || response.data || [];
      setResults(Array.isArray(matches) ? matches.slice(0, 5) : mockResults);
    } catch (err) {
      console.error("Match jobs API failed:", err);
      // Fallback to mock results for design presentation if API offline
      setError("Couldn't retrieve matches from the server. Showing demo data.");
      setResults(mockResults);
    } finally {
      setMatching(false);
    }
  };

  const handleClear = () => {
    setJobDescription('');
    setResults([]);
    setError(null);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Job Matching</h2>
          <p className="text-slate-500 mt-2">Paste a job description to instantly surface the best candidates from your database.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Area */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
              <Building className="w-5 h-5 text-slate-400" />
              <h3 className="font-semibold text-slate-800">Job Requisition</h3>
            </div>
            <textarea 
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description, requirements, and responsibilities here..."
              className="flex-1 w-full min-h-[300px] lg:min-h-[400px] p-6 text-slate-700 bg-white border-none focus:ring-0 outline-none resize-none leading-relaxed"
            />
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleClear} disabled={matching || (!jobDescription.trim() && results.length === 0)}
              className="flex-1 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold text-lg transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear
            </button>
            <button 
              onClick={handleMatch} disabled={matching || !jobDescription.trim()}
              className="flex-[2] py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {matching ? (
                <>
                  <Zap className="w-5 h-5 animate-pulse text-indigo-200" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Target className="w-6 h-6" />
                  Analyze
                </>
              )}
            </button>
          </div>
          
          {error && <p className="text-red-500 font-medium text-sm text-center">{error}</p>}
        </div>

        {/* Results Area */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                Top Fits
              </h3>
              {results.length > 0 && (
                <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  {results.length} found
                </span>
              )}
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((res, i) => (
                    <div key={res.id || i} className="group p-5 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all bg-white relative overflow-hidden">
                      {/* Score indicator line */}
                      <div className={`absolute top-0 left-0 w-1 h-full ${(res.score || res.matchScore || 0) >= 90 ? 'bg-emerald-500' : (res.score || res.matchScore || 0) >= 80 ? 'bg-indigo-500' : 'bg-amber-500'}`}></div>
                      
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg leading-tight">{res.name}</h4>
                          <p className="text-sm text-slate-500 font-medium">{res.role || 'Candidate'}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`text-2xl font-black ${
                            (res.score || res.matchScore || 0) >= 90 ? 'text-emerald-600' : (res.score || res.matchScore || 0) >= 80 ? 'text-indigo-600' : 'text-amber-600'
                          }`}>
                            {Math.round(res.score || res.matchScore || 0)}%
                          </span>
                          <span className="text-[10px] items-center flex gap-1 font-bold text-slate-400 uppercase tracking-wider">
                            Match <Star className="w-3 h-3 text-slate-300" fill="currentColor" />
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(res.skills || []).slice(0, 4).map(s => (
                          <span key={s} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
                            {s}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={() => window.open(res.website || `https://linkedin.com/search/results/people/?keywords=${encodeURIComponent(res.name)}`, '_blank', 'noopener,noreferrer')}
                        className="w-full py-2 bg-slate-50 hover:bg-indigo-50 text-indigo-600 border border-slate-200 hover:border-indigo-200 rounded-lg text-sm font-semibold transition-colors flex justify-center items-center gap-1 group-hover:text-indigo-700">
                        View Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-10 h-10 text-slate-300" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-700 mb-1">No matches yet</h4>
                  <p className="text-sm text-slate-500">Paste a job description and hit match to see candidates.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  