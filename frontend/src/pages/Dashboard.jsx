
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/candidates')
      .then(res => {
        setCandidates(res.data.candidates || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <Sidebar />
      <main className="ml-64 pt-12 px-8 pb-12">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">Workspace Overview</h1>
          <p className="text-on-surface-variant max-w-xl">Intelligent talent acquisition powered by NexHire AI.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest block mb-4">Total Candidates</span>
            <div className="text-6xl font-extrabold">{loading ? "..." : candidates.length}</div>
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-tertiary shadow-sm">
            <span className="text-sm font-semibold text-tertiary uppercase tracking-widest block mb-4">Top Matches</span>
            <div className="text-4xl font-extrabold">--</div>
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl shadow-sm">
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest block mb-4">Resumes</span>
            <div className="text-4xl font-extrabold">{loading ? "..." : candidates.length}</div>
          </div>
        </div>

        {!loading && candidates.length > 0 && (
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Recent Candidates</h3>
            <div className="space-y-4">
              {candidates.slice(0, 5).map(c => (
                <div key={c.id} className="p-4 bg-surface-container rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{c.name}</h4>
                    <p className="text-sm opacity-80">{c.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {c.skills.slice(0,3).map(s => <span key={s} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">{s}</span>)}
                    {c.skills.length > 3 && <span className="bg-surface-variant text-xs px-2 py-1 rounded">+{c.skills.length - 3}</span>}
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
  