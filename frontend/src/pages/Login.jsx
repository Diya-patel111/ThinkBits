import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:5000/api/google-login', {
        token: credentialResponse.credential,
        mode: 'login' // Specify this is a strict login attempt
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.user.name);
      toast.success(response.data.message || 'Login successful!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // Display exact error message ("User does not exist...")
      } else {
        toast.error('Google login failed. Please try again.');
      }
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      // Store token/user info (e.g., localStorage)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.user.name);
      toast.success(response.data.message || 'Login successful!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // E.g., "User does not exist. Please sign up first."
      } else {
        toast.error('An error occurred during login. Please try again.');
      }
    }
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
            <input 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-low rounded-lg border-none focus:ring-2 focus:ring-primary/20" 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-on-surface-variant ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-low rounded-lg border-none focus:ring-2 focus:ring-primary/20" 
            />
          </div>
          <div className="space-y-4">
            <button type="submit" className="w-full py-4 text-white bg-primary rounded-lg font-bold text-lg hover:scale-[1.01] transition-all">Login to NexHire</button>
            <div className="flex items-center justify-center my-4">
              <span className="h-px bg-slate-300 w-full"></span>
              <span className="px-3 text-slate-500 text-sm font-medium">OR</span>
              <span className="h-px bg-slate-300 w-full"></span>
            </div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google Login Failed')}
                theme="filled_blue"
                shape="rectangular"
                width="315"
                text="signin_with"
              />
            </div>
          </div>
        </form>
        <p className="mt-8 text-center text-sm text-on-surface-variant">
          Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Request Access</Link>
        </p>
      </div>
    </div>
  );
}
  
