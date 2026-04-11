
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

export default function JobMatching() {
  const [desc, setDesc] = useState('');
  const [matching, setMatching] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleMatch = async () => {
    if (!desc.trim()) return;
    
    setMatching(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/match-all', {
        job_description: desc
      });
      // slice top 5 Matches
      setResults(response.data.matches.slice(0, 5));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch matches. Make sure the Python API is running.");
    } finally {
      setMatching(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <Sidebar />
      <main className="ml-64 pt-12 px-8 pb-12">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Job Intelligence Hub</h1>
          <p className="text-on-surface-variant">Paste job description to curate the most relevant candidates.</p>
        </header>

        <div className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 lg:col-span-8">
            <textarea 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Paste full job description..."
              className="w-full h-80 bg-surface-container-lowest rounded-xl border-none focus:ring-2 focus:ring-primary p-6"
            />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <button 
              onClick={handleMatch} disabled={matching || !desc.trim()}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-xl hover:opacity-90 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
            >
              {matching ? "Processing AI Match..." : "Match Candidates"}
              <span className="material-symbols-outlined text-white">bolt</span>
            </button>
            {error && <p className="mt-4 text-red-500 font-bold">{error}</p>}
          </div>
        </div>

        {results.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Top Matches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map((res, i) => (
                <div key={res.id || i} className="bg-surface-container-lowest p-8 rounded-xl flex justify-between shadow-sm border-b-4 border-primary/10">
                  <div>
                    <h4 className="text-xl font-bold">{res.name}</h4>
                    <p className="text-sm font-medium mb-4">{res.role}</p>
                    <div className="flex gap-2">
                        {res.skills.map(s => <span key={s} className="bg-secondary-container/30 px-3 py-1 rounded-full text-xs font-semibold">{s}</span>)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-primary">{res.score}%</div>
                    <span className="text-[10px] font-bold text-tertiary uppercase">AI Score</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
  