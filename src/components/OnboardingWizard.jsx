'use client';

import { useState } from 'react';

export default function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    language: 'Python',
    level: 'Beginner',
    goal: 'Build Projects & Gain Mastery',
    customGoal: '',
    timeline: '30 Days',
    dailyHours: '1 Hour',
  });

  // Expanded Tech Options with Custom Badges
  const techOptions = [
    { id: 'dsa', name: 'Data Structures & Algorithms', category: 'CS Fundamentals', badge: 'DSA' },
    { id: 'c', name: 'C', category: 'Low-Level Systems', badge: 'C' },
    { id: 'cpp', name: 'C++', category: 'Systems & High-Perf', badge: 'C++' },
    { id: 'python', name: 'Python', category: 'Language / AI', badge: 'PY' },
    { id: 'java', name: 'Java', category: 'Enterprise & Android', badge: 'JV' },
    { id: 'javascript', name: 'JavaScript', category: 'Web Development', badge: 'JS' },
    { id: 'typescript', name: 'TypeScript', category: 'Typed Web Dev', badge: 'TS' },
    { id: 'htmlcss', name: 'HTML & CSS / Tailwind', category: 'Frontend Basics', badge: 'CSS' },
    { id: 'react', name: 'React / Next.js', category: 'Frontend Framework', badge: 'RCT' },
    { id: 'node', name: 'Node.js / Express', category: 'Backend Runtime', badge: 'NODE' },
    { id: 'sql', name: 'SQL & Relational Databases', category: 'Databases', badge: 'SQL' },
    { id: 'nosql', name: 'MongoDB / Redis (NoSQL)', category: 'Databases', badge: 'MDB' },
    { id: 'golang', name: 'Go (Golang)', category: 'Cloud & Systems', badge: 'GO' },
    { id: 'rust', name: 'Rust', category: 'Systems Programming', badge: 'RS' },
    { id: 'aiml', name: 'AI & Machine Learning', category: 'Specialization', badge: 'AI' },
    { id: 'devops', name: 'DevOps & Docker / Cloud', category: 'Infrastructure', badge: 'OPS' },
    { id: 'systemdesign', name: 'System Design & Architecture', category: 'Advanced CS', badge: 'SYS' },
  ];

  // Dynamic Step 3 Goals based on topic selected
  const getGoalsForTech = (tech) => {
    if (tech.includes('Data Structures') || tech === 'C' || tech === 'C++') {
      return [
        'Ace Technical Interviews & LeetCode',
        'Master Core CS Fundamentals & Memory Management',
        'Competitive Programming & Performance',
        'Build High-Performance Systems',
      ];
    }
    if (tech.includes('AI') || tech === 'Python') {
      return [
        'Build Autonomous AI Agents & LLM Apps',
        'Data Science & Predictive Modeling',
        'Automation Scripts & Web Scraping',
        'Master Machine Learning Algorithms',
      ];
    }
    if (['JavaScript', 'TypeScript', 'HTML & CSS / Tailwind', 'React / Next.js', 'Node.js / Express'].includes(tech)) {
      return [
        'Build Production-Ready Full-Stack Web Apps',
        'Master Modern UI Architecture & Styling',
        'Launch a SaaS Product',
        'Become a Job-Ready Web Developer',
      ];
    }
    return [
      'Build Real-World Portfolio Projects',
      'Master Language Syntax & Best Practices',
      'Pass Technical Coding Reviews',
      'Automate Daily Workflows',
    ];
  };

  const handleTechSelect = (techName) => {
    const goals = getGoalsForTech(techName);
    setFormData((prev) => ({
      ...prev,
      language: techName,
      goal: goals[0],
      customGoal: '',
    }));
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 5));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalGoal = formData.goal === 'Custom' ? formData.customGoal : formData.goal;
    onComplete({
      ...formData,
      goal: finalGoal || 'Build Projects & Gain Mastery',
    });
  };

  const currentGoals = getGoalsForTech(formData.language);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col items-center justify-center p-4 font-sans select-none">
      <div className="w-full max-w-xl bg-[#161b22] border border-[#30363d] rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Step Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs font-mono text-[#8b949e] mb-2">
            <span>STEP {step} OF 5</span>
            <span>{Math.round((step / 5) * 100)}% COMPLETE</span>
          </div>
          <div className="w-full h-1.5 bg-[#21262d] rounded-full overflow-hidden border border-[#30363d]">
            <div
              className="h-full bg-[#238636] transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: SCROLLABLE TECH SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">What do you want to master?</h2>
                <p className="text-xs text-[#8b949e] mt-1">
                  Scroll and select a language, framework, or CS track.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                {techOptions.map((item) => {
                  const isSelected = formData.language === item.name;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleTechSelect(item.name)}
                      className={`p-3 rounded-lg border flex items-center gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#58a6ff]/10 border-[#58a6ff] text-white shadow-sm'
                          : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#c9d1d9]'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-md bg-[#161b22] border border-[#30363d] flex items-center justify-center font-mono font-bold text-xs text-[#58a6ff]">
                        {item.badge}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-sm font-semibold truncate">{item.name}</div>
                        <div className="text-[10px] font-mono text-[#8b949e]">{item.category}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: EXPERIENCE LEVEL */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">What is your current level in {formData.language}?</h2>
                <p className="text-xs text-[#8b949e] mt-1">This helps us gauge where to start your roadmap.</p>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'Beginner', desc: 'New to this subject or programming in general.' },
                  { title: 'Intermediate', desc: 'Know syntax/basic principles, ready for real projects.' },
                  { title: 'Advanced', desc: 'Looking for deep optimization, internals, and architecture.' },
                ].map((lvl) => (
                  <div
                    key={lvl.title}
                    onClick={() => setFormData({ ...formData, level: lvl.title })}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      formData.level === lvl.title
                        ? 'bg-[#58a6ff]/10 border-[#58a6ff] text-white'
                        : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#c9d1d9]'
                    }`}
                  >
                    <div className="text-sm font-bold">{lvl.title}</div>
                    <div className="text-xs text-[#8b949e] mt-1">{lvl.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: DYNAMIC PRIMARY GOAL + CUSTOM GOAL TEXTBOX */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  What is your primary goal for {formData.language}?
                </h2>
                <p className="text-xs text-[#8b949e] mt-1">
                  Choose an option or type your own custom goal below.
                </p>
              </div>

              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {currentGoals.map((g) => (
                  <div
                    key={g}
                    onClick={() => setFormData({ ...formData, goal: g, customGoal: '' })}
                    className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                      formData.goal === g
                        ? 'bg-[#58a6ff]/10 border-[#58a6ff] text-white'
                        : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#c9d1d9]'
                    }`}
                  >
                    <div className="text-sm font-semibold">{g}</div>
                  </div>
                ))}

                {/* Custom Goal Option */}
                <div
                  onClick={() => setFormData({ ...formData, goal: 'Custom' })}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    formData.goal === 'Custom'
                      ? 'bg-[#58a6ff]/10 border-[#58a6ff] text-white'
                      : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#c9d1d9]'
                  }`}
                >
                  <div className="text-sm font-semibold">✍️ Custom Goal</div>
                </div>
              </div>

              {/* Text Input Box for Custom Goal */}
              {formData.goal === 'Custom' && (
                <div className="pt-2">
                  <label className="block text-xs font-mono text-[#8b949e] mb-1">
                    Describe your goal:
                  </label>
                  <input
                    type="text"
                    value={formData.customGoal}
                    onChange={(e) => setFormData({ ...formData, customGoal: e.target.value })}
                    placeholder="e.g. Build an AI agent that controls my smart home..."
                    className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#58a6ff] rounded-md px-3 py-2 text-sm text-white outline-none transition-colors"
                    autoFocus
                  />
                </div>
              )}
            </div>
          )}

          {/* STEP 4: TIMELINE */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">How fast do you want to complete this path?</h2>
                <p className="text-xs text-[#8b949e] mt-1">We will structure your roadmap modules to fit this schedule.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['14 Days', '30 Days', '60 Days', '90 Days'].map((t) => (
                  <div
                    key={t}
                    onClick={() => setFormData({ ...formData, timeline: t })}
                    className={`p-4 rounded-lg border text-center font-mono cursor-pointer transition-all ${
                      formData.timeline === t
                        ? 'bg-[#58a6ff]/10 border-[#58a6ff] text-white font-bold'
                        : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#c9d1d9]'
                    }`}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: DAILY TIME COMMITMENT */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">Daily Learning Commitment</h2>
                <p className="text-xs text-[#8b949e] mt-1">How much time can you dedicate each day?</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['30 Mins', '1 Hour', '2 Hours', '3+ Hours'].map((h) => (
                  <div
                    key={h}
                    onClick={() => setFormData({ ...formData, dailyHours: h })}
                    className={`p-4 rounded-lg border text-center font-mono cursor-pointer transition-all ${
                      formData.dailyHours === h
                        ? 'bg-[#58a6ff]/10 border-[#58a6ff] text-white font-bold'
                        : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#c9d1d9]'
                    }`}
                  >
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-[#30363d]">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 border border-[#30363d] hover:bg-[#21262d] text-xs font-mono rounded-md text-white transition-colors cursor-pointer"
              >
                ← Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2 bg-[#238636] hover:bg-[#2ea043] text-xs font-mono font-semibold rounded-md text-white transition-colors cursor-pointer"
              >
                Next →
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-[#238636] hover:bg-[#2ea043] text-xs font-mono font-semibold rounded-md text-white transition-colors cursor-pointer"
              >
                🚀 Generate My Custom AI Roadmap
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}
