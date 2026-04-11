
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
  