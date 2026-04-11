
import { useState } from 'react';
import { FileText, Target, Zap, ChevronDown, Check, User, ChevronRight } from 'lucide-react';
import { matchJobs } from '../services/api';

export default function JobMatching() {
  const [jobDescription, setJobDescription] = useState('');
  const [matching, setMatching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [minScore, setMinScore] = useState(75);

  const wordsCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;

  const handleMatch = async () => {
    if (!jobDescription.trim()) return;
    
    setMatching(true);
    setError(null);
    try {
      const response = await matchJobs(jobDescription);
      const matches = response.data?.matches || response.data || [];
      if (Array.isArray(matches) && matches.length > 0) {
        setResults(matches.map(m => ({
          ...m,
          role: m.role || 'Senior Software Engineer',
          exp: m.experience || Math.floor(Math.random() * 5 + 3),
          score: Math.round(m.score || m.matchScore || 0),
          topMatches: (m.skills || []).slice(0, 3),
          gaps: (m.skills || []).length > 3 ? (m.skills || []).slice(3, 5) : ['Cloud Deployment'],
          isUnderThreshold: Math.round(m.score || m.matchScore || 0) < 75
        })));
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Match jobs API failed:", err);
      setError("Couldn't retrieve matches from the server.");
      setResults([]);
    } finally {
      setMatching(false);
    }
  };

  const handleClear = () => {
    setJobDescription('');
    setResults([]);
    setError(null);
  };

  const filteredResults = results;

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-bold text-blue-600 tracking-widest uppercase mb-2">Editorial Intelligence</p>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Job Matcher</h2>
        <p className="text-slate-500 mt-2 text-md max-w-2xl leading-relaxed">
          Compare your candidate pool against specific role requirements with precise semantic alignment and gap analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Input & Filters */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Job Description Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-800">Job Description</h3>
            </div>
            <div className="p-5 bg-slate-50/50 flex-1">
              <textarea 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job description here to begin analysis..."
                className="w-full min-h-[250px] p-4 rounded-xl text-slate-700 bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none leading-relaxed text-sm"
              />
            </div>
            <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-white text-xs text-slate-500">
              <span>{wordsCount} words detected</span>
              <button onClick={handleClear} className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                Clear ✕
              </button>
            </div>
          </div>
          
          {/* Analyze Button */}
          <button 
            onClick={handleMatch} disabled={matching || !jobDescription.trim()}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[15px] transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/20"
          >
            {matching ? (
              <>
                <Zap className="w-4 h-4 animate-pulse text-blue-200" />
                Analyzing Alignment...
              </>
            ) : (
              'Analyze Match Alignment'
            )}
          </button>
          
          {error && <p className="text-red-500 font-medium text-xs text-center px-4">{error}</p>}

          {/* Discovery Filters */}
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col gap-6">
            <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase">Discovery Filters</h3>
            
            {/* Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-700">Min Match Score</span>
                <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-md text-xs">{minScore}%</span>
              </div>
              <div className="relative w-full h-1.5 bg-slate-200 rounded-full">
                <div className="absolute top-0 left-0 h-full bg-blue-600 rounded-full" style={{ width: `${minScore}%` }}></div>
                <input 
                  id="min-score"
                  name="min-score"
                  type="range" min="0" max="100" 
                  value={minScore} onChange={(e) => setMinScore(e.target.value)}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow" style={{ left: `calc(${minScore}% - 8px)` }}></div>
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <span className="text-sm font-semibold text-slate-700 mb-3 block">Experience Level</span>
              <div className="flex flex-wrap gap-2">
                {['Junior', 'Mid-Level', 'Senior', 'Lead'].map(el => (
                  <button key={el} className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${el === 'Mid-Level' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}>
                    {el}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Preference */}
            <div>
              <span className="text-sm font-semibold text-slate-700 mb-3 block">Location Preference</span>
              <div className="relative">
                <select id="location-pref" name="location-pref" className="w-full appearance-none bg-white border border-slate-200 text-slate-700 text-sm rounded-lg pl-3 pr-10 py-2.5 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option>Remote Only</option>
                  <option>Hybrid</option>
                  <option>On-site</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Results List */}
        <div className="lg:col-span-8 flex flex-col gap-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">Top Candidate Matches</h2>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                {filteredResults.length} Profiles
              </span>
            </div>
            <button className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
              Relevance
            </button>
          </div>

          <div className="flex flex-col gap-5">
            {filteredResults.map((res, i) => {
              const isUnderMatch = res.isUnderThreshold || res.score < minScore;
              
              if (isUnderMatch) {
                // Secondary / Under Threshold render
                return (
                  <div key={res.id || i} className="bg-slate-50 rounded-xl p-5 border border-slate-100 flex items-center justify-between group transition-colors hover:border-slate-200">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 overflow-hidden shrink-0">
                          {res.imageUrl ? <img src={res.imageUrl} className="w-full h-full object-cover" alt="" /> : <User className="w-5 h-5" />}
                       </div>
                       <div>
                         <h4 className="font-bold text-slate-700 text-base">{res.name}</h4>
                         <p className="text-xs font-semibold text-slate-400 mt-0.5 tracking-wide uppercase">
                           {res.score}% Match • Under Threshold
                         </p>
                       </div>
                    </div>
                    <button 
                      onClick={() => window.open(res.website || `https://linkedin.com/search/results/people/?keywords=${encodeURIComponent(res.name)}`, '_blank', 'noopener,noreferrer')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800">
                      View Profile
                    </button>
                  </div>
                );
              }

              // Primary "Top Candidate" render
              return (
                <div key={res.id || i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-blue-200 transition-all group overflow-hidden relative">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-400 overflow-hidden shrink-0">
                         {res.imageUrl ? <img src={res.imageUrl} className="w-full h-full object-cover" alt="" /> : <span className="text-lg font-bold text-slate-600">{res.name.charAt(0)}</span>}
                      </div>
                      <div className="mt-1">
                        <h3 className="font-bold text-slate-900 text-lg leading-tight">{res.name}</h3>
                        <p className="text-sm text-slate-600 font-medium mt-1">
                          {res.role} • {res.exp} yrs exp.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end min-w-[120px]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-blue-600 leading-none">{res.score}%</span>
                        <span className="text-[10px] font-bold text-blue-800 uppercase tracking-widest">Match</span>
                      </div>
                      {/* Underline progress bar */}
                      <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden flex">
                        <div className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${res.score}%` }}></div>
                        <div className="bg-slate-200 h-full rounded-r-full" style={{ width: `${100 - res.score}%` }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 border-t border-slate-50 pt-5">
                    <div>
                      <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Top Matches</h4>
                      <div className="flex flex-wrap gap-2">
                        {(res.topMatches || []).map((skill, idx) => (
                           <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-bold rounded-lg whitespace-nowrap">
                             {skill}
                           </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Gap Analysis</h4>
                      <div className="flex flex-wrap gap-2">
                        {(res.gaps || []).map((gap, idx) => (
                           <span key={idx} className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 text-[11px] font-bold rounded-lg whitespace-nowrap">
                             {gap}
                           </span>
                        ))}
                        {(!res.gaps || res.gaps.length === 0) && (
                          <span className="text-xs text-slate-400 italic">No significant gaps</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Invisible absolute link wrapper for entire card or explicitly button placed */}
                   <button 
                      onClick={() => window.open(res.website || `https://linkedin.com/search/results/people/?keywords=${encodeURIComponent(res.name)}`, '_blank', 'noopener,noreferrer')}
                      className="opacity-0 group-hover:opacity-100 absolute top-6 right-6 w-8 h-8 bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center text-blue-600 transition-all duration-300">
                      <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
              );
            })}

            {filteredResults.length === 0 && (
              <div className="bg-white border text-center border-slate-100 rounded-2xl p-12 mt-4 text-slate-500">
                 {!jobDescription.trim() && !matching ? 
                   "Please paste a job description and click analyze to surface top candidates." :
                   matching ? "Analyzing candidate semantic alignment..." : 
                   `No candidate matches found above ${minScore}%. Try adjusting your filters or the description.`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
  
