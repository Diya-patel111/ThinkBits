import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:5000/api/google-login', {
        token: credentialResponse.credential,
        mode: 'signup' // Specify this is a strict signup attempt
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.user.name);
      toast.success(response.data.message || 'Signup with Google successful!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // E.g., User already exists
      } else {
        toast.error('Google signup failed. Please try again.');
      }
      console.error(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        name,
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.user.name);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error); // E.g., User already exists
      } else {
        toast.error('An error occurred during signup. Please try again.');
      }
    }
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
            <label htmlFor="name" className="block text-sm font-semibold text-on-surface-variant ml-1">Full Name</label>
            <input 
              id="name"
              name="name"
              type="text" 
              placeholder="Alex Thompson" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20" 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-on-surface-variant ml-1">Work Email</label>
            <input 
              id="email"
              name="email"
              type="email" 
              placeholder="alex@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20" 
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-on-surface-variant ml-1">Password</label>
            <input 
              id="password"
              name="password"
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20" 
            />
          </div>
          <div className="space-y-4">
            <button type="submit" className="w-full py-4 text-white bg-primary rounded-lg font-bold text-lg hover:scale-[1.01] transition-all">Create Account</button>
            <div className="flex items-center justify-center my-4">
              <span className="h-px bg-slate-300 w-full"></span>
              <span className="px-3 text-slate-500 text-sm font-medium">OR</span>
              <span className="h-px bg-slate-300 w-full"></span>
            </div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error('Google Signup Failed')}
                theme="filled_blue"
                shape="rectangular"
                width="315"
                text="signup_with"
              />
            </div>
          </div>
        </form>
        <p className="mt-8 text-center text-sm text-on-surface-variant">
          Already have a workspace? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
  
