import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, register, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('recruiter'); // Maps to admin or user
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      const serverRole = role === 'recruiter' ? 'admin' : 'user';
      if (isRegister) {
        await register(email, password, serverRole);
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Invalid credentials or an error occurred.');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);
      navigate('/dashboard');
    } catch (_error) {
      setErrorMsg('Google Login Failed');
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-surface-container-low rounded-xl overflow-hidden shadow-[0px_24px_48px_rgba(25,28,29,0.06)] border border-outline-variant/10">
          
          {/* Left Column: Visual AI Narrative */}
          <div className="relative hidden md:flex flex-col justify-between p-12 shimmer-bg overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-container/30 rounded-full blur-3xl -ml-48 -mb-48"></div>
            <div className="relative z-10">
              <span className="font-headline font-bold text-2xl tracking-tight text-white mb-12 block">TalentAI</span>
              <h1 className="font-headline text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                 Curating the future of <br/><span className="text-secondary-fixed">intelligent connection.</span>
              </h1>
              <p className="text-on-primary-container/80 text-lg max-w-md font-medium">
                 Enter the portal where artificial intelligence meets human potential.
              </p>
            </div>
            <div className="relative z-10">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/10 max-w-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary-container">auto_awesome</span>
                  </div>
                  <div>
                    <p className="text-xs font-label uppercase tracking-widest text-white/60">AI Insight</p>
                    <p className="text-sm font-semibold text-white">Matching patterns found</p>
                  </div>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  Our neural engine has identified 12 high-affinity candidates for your Senior Designer role in the last hour.
                </p>
              </div>
            </div>
            <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
              <img alt="Abstract AI visualization" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi8Smb_u3QLTEtSpTf0OFXtMzXn-C25yjIjV5hLKFdGxA0gT21xDSmIP0I1d00QAIDkuOuV-DAIon9PAY_rATsHNAql-eX1M9OiFkxanchVZmEfIZYP9Yjt1EBGI8z9RV1M_XtP9vaqYOvOZYKzMaK92cD_jPzrGcjR_XiDWr05ZKVTEkFFiz1MnboeTKgfCHs3X2X8-WvWAvkMVqPB25cFJOW-qlOQ6z2UTOLrpobgxMTE89g8z9KxiL3XxiOA3IFpTFppyELqu0"/>
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="bg-surface-container-lowest p-8 md:p-16 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-10 text-center md:text-left">
                <h2 className="font-headline text-3xl font-bold text-on-background mb-2">
                  {isRegister ? 'Join TalentAI' : 'Welcome Back'}
                </h2>
                <p className="text-on-surface-variant">Access your curated talent dashboard.</p>
              </div>
              
              {/* Google Login (Overrides our basic social login) */}
              <div className="mb-8 flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setErrorMsg('Login Failed')}
                />
              </div>

              <div className="relative flex items-center justify-center mb-8">
                <div className="w-full h-px bg-outline-variant/20"></div>
                <span className="absolute px-4 bg-surface-container-lowest text-xs font-label uppercase tracking-widest text-outline">Or with email</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {isRegister && (
                  <div className="space-y-2">
                    <label className="text-xs font-label uppercase tracking-widest text-outline px-1">Access Role</label>
                    <div className="relative">
                      <select 
                        value={role} onChange={(e) => setRole(e.target.value)}
                        className="w-full appearance-none bg-surface-container-high border-none rounded-md px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200">
                        <option value="recruiter">Recruiter (Admin)</option>
                        <option value="candidate">Candidate (User)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-outline px-1">Work Email</label>
                  <input required value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full bg-surface-container-high border-none rounded-md px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200" placeholder="name@company.com" type="email"/>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-label uppercase tracking-widest text-outline">Password</label>
                    {!isRegister && <a className="text-xs font-semibold text-primary hover:text-primary-container transition-colors" href="#">Forgot?</a>}
                  </div>
                  <div className="relative">
                    <input required value={password} onChange={(e)=> setPassword(e.target.value)} className="w-full bg-surface-container-high border-none rounded-md px-5 py-4 text-sm font-medium focus:ring-1 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200" placeholder="••••••••" type="password"/>
                  </div>
                </div>

                {errorMsg && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-error-container text-on-error-container border border-error/10">
                    <span className="material-symbols-outlined text-lg">error</span>
                    <p className="text-xs font-medium">{errorMsg}</p>
                  </div>
                )}

                <button type="submit" className="w-full bg-primary text-on-primary font-headline font-bold py-4 rounded-full shadow-lg shadow-primary/20 hover:bg-primary-container hover:-translate-y-0.5 active:scale-95 transition-all duration-200 mt-4">
                  {isRegister ? 'Create Account' : 'Sign In to TalentAI'}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-on-surface-variant font-medium">
                {isRegister ? 'Already have an account? ' : 'New to TalentAI? '} 
                <button onClick={() => setIsRegister(!isRegister)} className="text-primary font-bold hover:underline">
                  {isRegister ? 'Sign In' : 'Request Access'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full py-12 flex flex-col items-center gap-4 px-6 bg-surface mt-auto">
        <p className="font-label text-[10px] font-medium uppercase tracking-[0.2em] text-outline opacity-60">© 2024 TalentAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;