import React from 'react';
import { Link } from 'react-router-dom';

const JobMatching = () => {
  return (
    <div className="text-on-background min-h-screen font-body bg-surface">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-indigo-700 dark:text-indigo-300">
            TalentAI Curator
          </span>
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/dashboard" className="font-headline text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">
              Dashboard
            </Link>
            <Link to="/job-matching" className="font-headline text-sm font-medium text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 pb-1">
              Job Pipeline
            </Link>
            <Link to="#" className="font-headline text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">
              Analytics
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-full font-semibold text-sm bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors">
            Team Settings
          </button>
          <button className="px-5 py-2 rounded-full font-semibold text-sm bg-primary text-on-primary hover:opacity-90 active:scale-95 transition-all">
            Post New Job
          </button>
          <img
            alt="Recruiter Profile"
            className="w-8 h-8 rounded-full border-2 border-primary/20 object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8GX5MjZlqYHMPiTPFvdajNGfcB9TDJMF5L4BV5xT-cUT_1uVKcQtgOr_DCaNfmPdfNGELFrMj9Z3Ud7yCV4235FcsUGzhhf9_r0muTNp4UEe5ToSW_Nq1p3ZWtE116LjMgOafibgUBBLeRXFtwMpc_9Ga77elFMq6N0yriwrs-m4jas7Z_w3Wguz34-iIdUa-OkRNICfc-FfrFwjKh6lni-s_0bvBZXxxEeFPVAqUShQuG-VXDPAATauyNkC98poWIt7u7BFhKlQ"
          />
        </div>
      </nav>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 flex flex-col p-4 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-lg border-r border-slate-200/20">
        <div className="flex flex-col gap-1 px-4 py-6 mb-4">
          <span className="text-lg font-extrabold text-indigo-700">Curator Pro</span>
          <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">AI-Driven Sourcing</span>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <a className="flex items-center gap-3 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-xl px-4 py-3 shadow-sm font-semibold text-sm" href="#">
            <span className="material-symbols-outlined">radar</span> Matches
          </a>
          <a className="flex items-center gap-3 text-slate-500 dark:text-slate-400 px-4 py-3 hover:translate-x-1 transition-transform font-semibold text-sm" href="#">
            <span className="material-symbols-outlined">person_search</span> Sourcing
          </a>
          <a className="flex items-center gap-3 text-slate-500 dark:text-slate-400 px-4 py-3 hover:translate-x-1 transition-transform font-semibold text-sm" href="#">
            <span className="material-symbols-outlined">event</span> Interviews
          </a>
          <a className="flex items-center gap-3 text-slate-500 dark:text-slate-400 px-4 py-3 hover:translate-x-1 transition-transform font-semibold text-sm" href="#">
            <span className="material-symbols-outlined">description</span> Offers
          </a>
          <a className="flex items-center gap-3 text-slate-500 dark:text-slate-400 px-4 py-3 hover:translate-x-1 transition-transform font-semibold text-sm" href="#">
            <span className="material-symbols-outlined">inventory_2</span> Archive
          </a>
        </div>
        <div className="pt-4 border-t border-slate-200/20 flex flex-col gap-2">
          <div className="bg-indigo-600 rounded-2xl p-4 mb-4 text-white">
            <p className="text-xs font-bold mb-2">PRO PLAN</p>
            <p className="text-sm opacity-90 mb-3">Unlock advanced AI matching features.</p>
            <button className="w-full py-2 bg-white text-indigo-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">Upgrade Plan</button>
          </div>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-2 text-sm" href="#">
            <span className="material-symbols-outlined">help</span> Support
          </a>
          <a className="flex items-center gap-3 text-slate-500 px-4 py-2 text-sm" href="#">
            <span className="material-symbols-outlined">logout</span> Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 mt-16 p-8 min-h-screen bg-surface">
        <header className="mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-on-surface-variant mb-2 block">
            Curation Hub
          </span>
          <h1 className="text-3xl font-headline font-bold text-on-surface">Candidate Matching</h1>
        </header>

        {/* Filter Bar */}
        <section className="mb-10 p-4 bg-white/80 backdrop-blur-md rounded-xl shadow-sm flex items-center gap-6">
          <div className="flex-1 flex gap-4">
            <div className="relative group">
              <button className="px-4 py-2.5 rounded-full bg-surface-container-high text-on-surface font-semibold text-sm flex items-center gap-2 hover:bg-surface-container-highest transition-all">
                Match Score: 80%+ <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
            <div className="relative group">
              <button className="px-4 py-2.5 rounded-full bg-surface-container-high text-on-surface font-semibold text-sm flex items-center gap-2 hover:bg-surface-container-highest transition-all">
                Experience: 5+ Years <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
            <div className="relative group">
              <button className="px-4 py-2.5 rounded-full bg-surface-container-high text-on-surface font-semibold text-sm flex items-center gap-2 hover:bg-surface-container-highest transition-all">
                Location: Remote <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
          </div>
          <div className="h-8 w-px bg-outline-variant/30"></div>
          <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
            <span className="material-symbols-outlined">filter_list</span> 12 Filters Applied
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: Job Description Area */}
          <div className="col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container-low rounded-xl p-8 sticky top-24">
              <h2 className="text-xl font-headline font-semibold mb-6">Job Requirements</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                    Job Title
                  </label>
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-xl px-4 py-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all shadow-sm"
                    placeholder="e.g. Lead Engineer"
                    type="text"
                    defaultValue="Senior Product Designer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                    Description &amp; Skills
                  </label>
                  <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm min-h-[400px] flex flex-col">
                    <div className="border-b border-surface-container p-2 flex gap-2">
                      <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-lg">format_bold</span>
                      </button>
                      <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-lg">format_italic</span>
                      </button>
                      <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-lg">format_list_bulleted</span>
                      </button>
                      <button className="p-2 hover:bg-surface-container-high rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-lg">link</span>
                      </button>
                    </div>
                    <textarea
                      className="flex-1 w-full bg-transparent border-none p-4 text-sm text-on-surface resize-none focus:ring-0 focus:outline-none leading-relaxed"
                      placeholder="Paste the job description here..."
                      defaultValue={`We are looking for a Senior Product Designer to join our team...

Requirements:
• 5+ years of experience in SaaS
• Proficient in Figma and Design Systems
• Strong portfolio demonstrating UX strategy
• Experience with AI-driven interfaces is a plus`}
                    />
                  </div>
                </div>
                <button className="w-full py-4 bg-primary text-on-primary rounded-full font-bold text-lg shadow-lg hover:translate-y-[-2px] active:translate-y-0 transition-all flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined">auto_awesome</span>
                  Generate Matches
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Candidate Results */}
          <div className="col-span-7 flex flex-col gap-6">
            {/* Result Stats */}
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-headline font-semibold">
                Top Matches <span className="text-on-surface-variant text-sm font-normal ml-2">24 candidates found</span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                Sort by: <b>Relevance</b> <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
              </div>
            </div>

            {/* Candidate Card 1 */}
            <div className="group bg-surface-container-lowest rounded-xl p-1 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/5">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      alt="Candidate"
                      className="w-16 h-16 rounded-2xl object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZhPhev8gFfqJzq6MI491ywKbxhOVvKAnJ65RqLYNYJO9E7qGzLNhGP5BQZxjWW4ne-BZx6dviyfwkLdb8PNtCjw2V3XiRA0TaqwnhCr7IGbiRUGUv2Nem7iM7srM_tedUdDn1oBhkHAb6WyTiav7jnwHNtQGb-mso4B-2HKwQpkpv8FswixC-Bv146WxtgL2da9_LpYd7-BOnxF_Xz4oPPQIGZQMgsRXt9DTuTIZobutKcKJKgMLRdAkv-9U3Mmgq1pC9agpbvC8"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-on-surface">Elena Rodriguez</h3>
                      <p className="text-sm text-on-surface-variant">Principal Designer @ DesignSync</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">location_on</span> San Francisco (Remote)
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">work</span> 8 years exp.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary-container px-4 py-2 rounded-xl text-on-secondary-container flex flex-col items-end">
                    <span className="text-xs font-bold uppercase tracking-tighter">AI Score</span>
                    <span className="text-2xl font-headline font-extrabold leading-tight">98%</span>
                  </div>
                </div>

                {/* AI Insight Section */}
                <div className="bg-surface-container-low rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      auto_awesome
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider">AI Explanation</span>
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">
                    Elena's background at DesignSync mirrors your need for a designer who can bridge the gap between complex data visualization and intuitive UI. Her experience leading the "Aura AI" redesign directly correlates with your requirement for AI-driven interface expertise.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">
                      Skills Matched
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Design Systems
                      </span>
                      <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Figma Pro
                      </span>
                      <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> UX Strategy
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">
                      Missing Skills
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold opacity-60">
                        <span className="material-symbols-outlined text-[14px]">error</span> Webflow
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-surface-container/30 rounded-b-xl flex justify-between items-center">
                <button className="text-sm font-bold text-primary hover:underline">View Portfolio</button>
                <div className="flex gap-2">
                  <button className="p-2 rounded-xl hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined">star</span>
                  </button>
                  <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-md hover:opacity-90 transition-all">
                    Invite to Interview
                  </button>
                </div>
              </div>
            </div>

            {/* Candidate Card 2 */}
            <div className="group bg-surface-container-lowest rounded-xl p-1 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/5">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      alt="Candidate"
                      className="w-16 h-16 rounded-2xl object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh93UUPdluBaO13HpPn9Go9iV4OzPWrl7RvGxsF3cQyMJEOnqBpFfrg323BzEi9Njd4tpFQs3DtHvPNaD_7XXWMYuSv6bAkUqZAdWvuGJSoaKRibbFhPJXVAIbdmfYdXvQEdpztufC6Y3pE71TE9kyi0D8WzDIF3a3sxHY2M68xPEQO53O42_RHhsXpIuvqquM7ed2t48YuFRqf7D07IbVWpOpawUnm2iIzpmWB_Ly2FmqysWk9EPmEjUqBIwXa1DLzQu862_spSE"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-on-surface">Marcus Chen</h3>
                      <p className="text-sm text-on-surface-variant">Senior UX Designer @ FinStream</p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">location_on</span> New York (Hybrid)
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">work</span> 6 years exp.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary-container px-4 py-2 rounded-xl text-on-secondary-container flex flex-col items-end">
                    <span className="text-xs font-bold uppercase tracking-tighter">AI Score</span>
                    <span className="text-2xl font-headline font-extrabold leading-tight">92%</span>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-2 mb-3 text-primary">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                      auto_awesome
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider">AI Explanation</span>
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">
                    Marcus is a strong visual storyteller with exceptional Figma skills. While he lacks direct experience in AI interfaces, his work on complex financial dashboards shows he can handle high-density data and maintain design system integrity.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">
                      Skills Matched
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Figma
                      </span>
                      <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> SaaS Design
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3">
                      Missing Skills
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold opacity-60">
                        <span className="material-symbols-outlined text-[14px]">error</span> AI Interface
                      </span>
                      <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold opacity-60">
                        <span className="material-symbols-outlined text-[14px]">error</span> Prototyping
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-surface-container/30 rounded-b-xl flex justify-between items-center">
                <button className="text-sm font-bold text-primary hover:underline">View Portfolio</button>
                <div className="flex gap-2">
                  <button className="p-2 rounded-xl hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined">star</span>
                  </button>
                  <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-md hover:opacity-90 transition-all">
                    Invite to Interview
                  </button>
                </div>
              </div>
            </div>

            {/* Load More Button */}
            <button className="py-6 border-2 border-dashed border-outline-variant/30 rounded-xl text-on-surface-variant font-bold text-sm hover:bg-surface-container-high hover:border-primary/20 transition-all">
              Load More Highly Relevant Candidates
            </button>
          </div>
        </div>
      </main>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
        <span className="material-symbols-outlined">chat</span>
      </button>
    </div>
  );
};

export default JobMatching;