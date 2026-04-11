
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
  