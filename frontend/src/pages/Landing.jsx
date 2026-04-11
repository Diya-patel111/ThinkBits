
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
            AI-Powered <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-container">Resume Intelligence</span> & Smart Hiring
        </h1>
        <p className="text-on-surface-variant text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Transform your talent acquisition with deep-learning analysis. Move beyond keywords to understand human potential with editorial-grade clarity.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-linear-to-br from-primary to-primary-container text-white font-bold rounded-lg text-lg shadow-xl hover:shadow-primary/20 transition-all">
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
  
