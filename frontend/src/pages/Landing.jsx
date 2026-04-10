import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm dark:shadow-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="text-2xl font-bold tracking-tighter text-indigo-700 dark:text-indigo-300">TalentAI</div>
          <div className="hidden md:flex items-center gap-8">
            <a className="font-manrope text-sm font-semibold tracking-tight text-indigo-700 dark:text-indigo-300 border-b-2 border-indigo-600 transition-all duration-300" href="#">Platform</a>
            <a className="font-manrope text-sm font-semibold tracking-tight text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-all duration-300" href="#">Solutions</a>
            <a className="font-manrope text-sm font-semibold tracking-tight text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-all duration-300" href="#">Resources</a>
            <a className="font-manrope text-sm font-semibold tracking-tight text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-all duration-300" href="#">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="font-manrope text-sm font-semibold tracking-tight text-slate-600 dark:text-slate-400 hover:text-indigo-600 px-4 py-2">Login</Link>
            <Link to="/login" className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-manrope text-sm font-semibold tracking-tight hover:bg-primary-container active:scale-95 transition-all duration-300">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-8 py-20 lg:py-32 bg-surface">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-[0.75rem] font-bold tracking-widest uppercase mb-6">The Future of HR</span>
              <h1 className="text-5xl lg:text-[3.5rem] leading-[1.1] font-bold text-on-surface mb-6 tracking-tight font-headline">
                Hire Smarter with AI-Powered <span className="text-primary">Talent Intelligence</span>
              </h1>
              <p className="text-lg text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                Parse resumes, match candidates, and hire faster using AI. Our platform transforms your recruitment funnel into a precision-guided talent engine.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login" className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-primary/20 hover:bg-primary-container transition-all active:scale-95">Get Started</Link>
                <button className="bg-secondary-fixed text-on-secondary-fixed px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-fixed-dim transition-all">
                  <span className="material-symbols-outlined">play_circle</span>
                  Try Demo
                </button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-xl blur-3xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-white/70 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-white/40 overflow-hidden">
                <img alt="Futuristic digital interface showing AI scanning resume documents with glowing data points and neural network overlays" className="w-full h-auto rounded-lg" data-alt="abstract digital artwork of a translucent resume being scanned by glowing indigo laser beams with floating data icons and neural network patterns in the background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfEhZCk8f2tzBzFZB-GuCmCscpAy3gGEKt5JNKUBOwbRp_Na6lihMN8e4TPZlYG3scCUl6PdeIrm_ecAjieLYwoNoYjx-PjNF2bk8Vlsbb723Kh-DTdIBMCFVENjbY_VFatJl0ixg7rBAMxFa_rw-nmQ1OrNs93WOz8VrCswSu3tcTHDY3gw0t2OIvMFqS85K9Pf5-GFQsW4oFJbZu6Zb-rxOU2pXE_yGe0VcWLGD-MSMseOsUkB2LC1c0i8FAa4qnudH5oYOh13Q"/>
                <div className="absolute bottom-10 left-10 right-10 p-6 bg-white/70 backdrop-blur-xl rounded-xl border border-white/20 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-primary">psychology</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">Candidate Match: 98%</p>
                      <p className="text-xs text-on-surface-variant">Top choice based on skill density and cultural alignment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-surface-container-low py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-[0.75rem] font-bold tracking-widest text-primary uppercase">Precision Tools</span>
              <h2 className="text-3xl lg:text-[2.5rem] font-bold mt-2 font-headline">Engineered for Excellence</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group bg-surface-container-lowest p-8 rounded-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">description</span>
                </div>
                <h3 className="text-xl font-bold mb-4 font-headline">Resume Parsing</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">Automatically extract work history, skills, and education from any file format with 99.9% accuracy.</p>
                <div className="bg-secondary-container/30 px-3 py-1 rounded-sm inline-flex items-center gap-2">
                  <span className="text-[0.75rem] font-semibold text-on-secondary-container">AI ENHANCED</span>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="group bg-surface-container-lowest p-8 rounded-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">person_search</span>
                </div>
                <h3 className="text-xl font-bold mb-4 font-headline">Skill Matching</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">Go beyond keywords. Our NLP models understand context and hierarchy of expertise to find perfect fits.</p>
                <div className="bg-secondary-container/30 px-3 py-1 rounded-sm inline-flex items-center gap-2">
                  <span className="text-[0.75rem] font-semibold text-on-secondary-container">NLP ENGINE</span>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="group bg-surface-container-lowest p-8 rounded-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 bg-surface-tint/10 text-surface-tint rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">insights</span>
                </div>
                <h3 className="text-xl font-bold mb-4 font-headline">AI Insights</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">Predict candidate performance and retention risk using proprietary behavioral analysis algorithms.</p>
                <div className="bg-secondary-container/30 px-3 py-1 rounded-sm inline-flex items-center gap-2">
                  <span className="text-[0.75rem] font-semibold text-on-secondary-container">PREDICTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-8 bg-surface">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl lg:text-[2.5rem] font-bold font-headline">The Curation Process</h2>
              <p className="text-on-surface-variant mt-4">Simple, transparent, and intelligent recruitment steps.</p>
            </div>
            <div className="space-y-12 relative">
              {/* Vertical Line */}
              <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-outline-variant opacity-30 hidden md:block"></div>
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-8 items-start relative">
                <div className="z-10 w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-lg">
                  <span className="material-symbols-outlined">upload_file</span>
                </div>
                <div className="bg-surface-container-low p-8 rounded-xl w-full">
                  <h4 className="text-xl font-bold mb-2 font-headline">Ingest &amp; Parse</h4>
                  <p className="text-on-surface-variant">Upload candidate pools via CSV, PDF, or API. Our AI instantly transforms unstructured documents into rich data profiles.</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-8 items-start relative">
                <div className="z-10 w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-lg">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
                <div className="bg-surface-container-low p-8 rounded-xl w-full">
                  <h4 className="text-xl font-bold mb-2 font-headline">Vectorized Matching</h4>
                  <p className="text-on-surface-variant">Positions are compared against candidates using semantic vector search, ranking applicants by objective fit scores.</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-8 items-start relative">
                <div className="z-10 w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-lg">
                  <span className="material-symbols-outlined">checklist_rtl</span>
                </div>
                <div className="bg-surface-container-low p-8 rounded-xl w-full">
                  <h4 className="text-xl font-bold mb-2 font-headline">Shortlist &amp; Hire</h4>
                  <p className="text-on-surface-variant">Review top-tier AI-vetted candidates with rich behavioral insights. Schedule interviews directly from the dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-24 px-8 bg-surface-container-high overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/3">
                <h2 className="text-3xl lg:text-[2.5rem] font-bold mb-6 font-headline">Real-time <span className="text-primary">Talent Visibility</span></h2>
                <p className="text-on-surface-variant mb-8 leading-relaxed">
                  Monitor your recruitment pipeline with a dashboard built for clarity. Identify bottlenecks, track diversity metrics, and optimize your time-to-hire through intuitive visual data.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span className="font-semibold">Automated Scorecards</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span className="font-semibold">Bias Detection Heatmaps</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span className="font-semibold">Collaborative Review Tools</span>
                  </li>
                </ul>
              </div>
              <div className="lg:w-2/3">
                <div className="relative bg-white rounded-xl shadow-[0px_40px_80px_rgba(0,0,0,0.1)] p-4 border border-outline-variant/20">
                  <div className="bg-slate-50 rounded-lg overflow-hidden border border-outline-variant/10">
                    <img alt="High-fidelity UI dashboard for talent intelligence showing recruitment funnels, candidate match scores, and hiring analytics charts" className="w-full h-auto" data-alt="sleek modern SaaS dashboard interface with light gray backgrounds, indigo charts, and clean typography showing candidate management metrics" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrvvqkKTaO98k6cSxbIT8MxreF67dGAFunaUmlWPoi2fM4iwU7mhsC_TYq0ITkA8oGovEFjzINXfpAg_nQAqlWrhvsBD0rM32RoYstHU6V_9PHL8kN_GjS7A9KyluTcOyuzcec0b_P4XdrS7EO5zN6ove4RRRvL0OC-OFB8W_-zRI88qL2srGTdXqdC8s6nh2UQ2DkWK7fhhwc-6VY7MSUBtt1ZWuw97QpMXHvd2bwwto44C_ITWUJ_UGiDWX7WwpR1CZ4CNyRPTE"/>
                  </div>
                  {/* Floating Insight Card */}
                  <div className="absolute -bottom-6 -left-6 md:block hidden bg-white/70 backdrop-blur-xl p-6 rounded-xl border border-white/50 shadow-xl max-w-[240px]">
                    <div className="text-primary font-bold text-lg mb-1">12.5 days</div>
                    <div className="text-xs font-bold text-on-surface uppercase tracking-wider mb-2">Avg. Time to Hire</div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary w-[70%] h-full"></div>
                    </div>
                    <p className="text-[10px] text-on-surface-variant mt-2">↓ 4 days from last quarter</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8 bg-surface">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-xl overflow-hidden bg-primary p-12 lg:p-20 text-center">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-90"></div>
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-[3rem] font-bold text-on-primary mb-6 leading-tight font-headline">Ready to curate your dream team?</h2>
                <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">Join 500+ forward-thinking enterprises using TalentAI to build high-performance teams with the speed of thought.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/login" className="bg-white text-primary px-10 py-4 rounded-full font-bold shadow-lg hover:bg-surface-container-lowest transition-all active:scale-95">Get Started Now</Link>
                  <button className="bg-indigo-400/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold hover:bg-indigo-400/30 transition-all">Schedule a Demo</button>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 w-full py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="text-xl font-bold text-slate-900 dark:text-white font-headline">TalentAI</div>
            <p className="text-sm text-slate-500 max-w-xs">Building the intelligence layer for global recruitment and strategic human capital management.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <a className="text-sm text-slate-500 hover:text-indigo-600 underline decoration-indigo-500/30 underline-offset-4 transition-transform hover:translate-x-1" href="#">Product</a>
            <a className="text-sm text-slate-500 hover:text-indigo-600 underline decoration-indigo-500/30 underline-offset-4 transition-transform hover:translate-x-1" href="#">Features</a>
            <a className="text-sm text-slate-500 hover:text-indigo-600 underline decoration-indigo-500/30 underline-offset-4 transition-transform hover:translate-x-1" href="#">Case Studies</a>
            <a className="text-sm text-slate-500 hover:text-indigo-600 underline decoration-indigo-500/30 underline-offset-4 transition-transform hover:translate-x-1" href="#">Privacy</a>
            <a className="text-sm text-slate-500 hover:text-indigo-600 underline decoration-indigo-500/30 underline-offset-4 transition-transform hover:translate-x-1" href="#">Terms</a>
          </div>
          <div className="text-sm text-slate-500">
            © 2024 TalentAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;