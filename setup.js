import fs from 'fs';
import path from 'path';

const dirs = [
  'src/components',
  'src/pages',
  'src/services',
  'src/utils'
];

dirs.forEach(dir => fs.mkdirSync(dir, { recursive: true }));

const files = {
  'src/index.css': `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
}
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
  `,
  'src/App.jsx': `
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import UploadResume from './pages/UploadResume';
import JobMatching from './pages/JobMatching';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadResume />} />
        <Route path="/match" element={<JobMatching />} />
      </Routes>
    </Router>
  );
}

export default App;
  `,
  'src/components/Navbar.jsx': `
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#f8f9fb] dark:bg-slate-950 flex justify-between items-center px-8 py-4 font-headline tracking-tight">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-[#191c1e] dark:text-white">NexHire AI</Link>
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
  `,
  'src/components/Sidebar.jsx': `
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
  `,
  'src/pages/Landing.jsx': `
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen">
      <Navbar />
      <main className="pt-24 flex flex-col items-center justify-center text-center px-8 py-20 lg:py-32">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary bg-secondary-container rounded-full">
            NEXT-GEN RECRUITMENT
        </span>
        <h1 className="font-headline text-5xl lg:text-7xl font-extrabold tracking-tight text-on-surface mb-8 leading-[1.1]">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Resume Intelligence</span> & Smart Hiring
        </h1>
        <p className="text-on-surface-variant text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform your talent acquisition with deep-learning analysis. Move beyond keywords to understand human potential with editorial-grade clarity.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-lg text-lg shadow-xl hover:shadow-primary/20 transition-all">
                Get Started
            </Link>
            <Link to="/login" className="px-8 py-4 bg-surface-container-high text-primary font-bold rounded-lg text-lg hover:bg-surface-container-highest transition-all">
                Login
            </Link>
        </div>
      </main>
    </div>
  );
}
  `,
  'src/pages/Login.jsx': `
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 md:p-16 bg-surface-container-lowest rounded-xl shadow-xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-headline font-extrabold text-on-surface mb-2 tracking-tight">Welcome back</h2>
          <p className="text-on-surface-variant">Sign in to your recruiter workspace.</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant ml-1">Work Email</label>
            <input type="email" placeholder="name@company.com" className="w-full px-4 py-3 bg-surface-container-low rounded-lg border-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant ml-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-surface-container-low rounded-lg border-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <button type="submit" className="w-full py-4 text-white bg-primary rounded-lg font-bold text-lg hover:scale-[1.01] transition-all">Login to NexHire</button>
        </form>
        <p className="mt-8 text-center text-sm text-on-surface-variant">
          Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Request Access</Link>
        </p>
      </div>
    </div>
  );
}
  `,
  'src/pages/Signup.jsx': `
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 md:p-16 bg-surface-container-lowest rounded-xl shadow-xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-headline font-extrabold text-on-surface mb-2 tracking-tight">Create Workspace</h2>
          <p className="text-on-surface-variant">Start your journey with our intuitive platform.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant ml-1">Full Name</label>
            <input type="text" placeholder="Alex Thompson" className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant ml-1">Work Email</label>
            <input type="email" placeholder="alex@company.com" className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant ml-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20" />
          </div>
          <button type="submit" className="w-full py-4 text-white bg-primary rounded-lg font-bold text-lg hover:scale-[1.01] transition-all">Create Account</button>
        </form>
        <p className="mt-8 text-center text-sm text-on-surface-variant">
          Already have a workspace? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
  `,
  'src/pages/Dashboard.jsx': `
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Dashboard() {
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
            <div className="text-6xl font-extrabold">1,284</div>
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl border-l-4 border-tertiary shadow-sm">
            <span className="text-sm font-semibold text-tertiary uppercase tracking-widest block mb-4">Top Matches</span>
            <div className="text-4xl font-extrabold">42</div>
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl shadow-sm">
            <span className="text-sm font-semibold text-secondary uppercase tracking-widest block mb-4">Resumes</span>
            <div className="text-4xl font-extrabold">856</div>
          </div>
        </div>
      </main>
    </div>
  );
}
  `,
  'src/pages/UploadResume.jsx': `
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function UploadResume() {
  const [files, setFiles] = useState([]);
  
  const handleUpload = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface">
      <Sidebar />
      <main className="ml-64 pt-12 px-8 pb-12">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Upload Resumes</h1>
          <p className="text-on-surface-variant">Upload candidate profiles in bulk; our AI will parse and categorize them.</p>
        </header>

        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-12 xl:col-span-7">
            <label className="flex flex-col items-center justify-center w-full min-h-[400px] border-2 border-dashed border-outline-variant/30 rounded-xl cursor-pointer hover:border-primary/50 transition-all bg-surface-container-lowest p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-4">upload_file</span>
              <h3 className="text-2xl font-bold mb-2">Drag & drop files here</h3>
              <p className="text-on-surface-variant mb-6">PDF, DOCX, or RTF. Max 25MB.</p>
              <span className="bg-primary text-white px-8 py-3 rounded-lg font-bold">Select Files</span>
              <input type="file" multiple className="hidden" onChange={handleUpload} accept=".pdf,.doc,.docx,.rtf" />
            </label>

            {files.length > 0 && (
              <div className="mt-8 space-y-4">
                <h4 className="font-bold text-lg">Active Uploads ({files.length})</h4>
                {files.map((file, i) => (
                  <div key={i} className="bg-surface-container-lowest p-6 rounded-xl flex items-center justify-between">
                    <span className="font-semibold">{file.name}</span>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">Uploaded</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
  `,
  'src/pages/JobMatching.jsx': `
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function JobMatching() {
  const [desc, setDesc] = useState('');
  const [matching, setMatching] = useState(false);
  const [results, setResults] = useState([]);

  const handleMatch = () => {
    setMatching(true);
    setTimeout(() => {
      setResults([
        { name: "Marcus Ardelio", role: "Senior Designer", score: 98, skills: ["Figma", "Design Systems"] },
        { name: "Sarah Jenkins", role: "UX Strategist", score: 94, skills: ["Workshop", "User Flows"] }
      ]);
      setMatching(false);
    }, 1500);
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
              onClick={handleMatch} disabled={matching}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold text-xl hover:opacity-90 transition-all flex justify-center items-center gap-2"
            >
              {matching ? "Matching..." : "Match Candidates"}
              <span className="material-symbols-outlined text-white">bolt</span>
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Top Matches</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {results.map((res, i) => (
                <div key={i} className="bg-surface-container-lowest p-8 rounded-xl flex justify-between shadow-sm border-b-4 border-primary/10">
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
  `,
  'src/services/api.js': `
import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const uploadResumes = (formData) => api.post('/parse', formData);
export const matchJobs = (data) => api.post('/match', data);
export const getCandidates = () => api.get('/candidates');
  `
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(process.cwd(), filepath), content);
}
console.log('Project generated perfectly.');