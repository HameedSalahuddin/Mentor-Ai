'use client';

import { useState } from 'react';

const LANGUAGES = ['Python', 'C++', 'Java', 'Rust', 'Go', 'JavaScript'];
const LEVELS = ['Beginner', 'Know the basics', 'Intermediate', 'Advanced'];
const GOALS = ['College', 'Placement', 'Data Science', 'AI', 'Web Development', 'Automation'];
const TIMELINES = ['14 Days', '30 Days', '60 Days', '90 Days', '6 Months'];
const DAILY_HOURS = ['30 mins', '1 hour', '2 hours', '3+ hours'];

export default function OnboardingWizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    language: 'Python',
    level: '',
    goal: '',
    timeline: '60 Days',
    dailyHours: '1 hour',
  });

  const handleSelect = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    if (onComplete) onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xl bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-[#010409] border-b border-[#30363d] px-6 py-4 flex justify-between items-center select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
            <span className="ml-2 font-mono text-xs text-[#8b949e]">MentorAI / Setup Path</span>
          </div>
          <span className="font-mono text-xs text-[#8b949e]">Step {step} of 5</span>
        </div>

        {/* Wizard Form Area */}
        <div className="p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-1 text-white">What would you like to learn?</h2>
              <p className="text-sm text-[#8b949e] mb-6">Select a language to generate your personalized path.</p>
              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleSelect('language', lang)}
                    className={`p-4 rounded-md border text-left font-mono transition-all cursor-pointer ${
                      formData.language === lang
                        ? 'border-[#58a6ff] bg-[#58a6ff]/20 text-[#58a6ff] font-bold'
                        : 'border-[#30363d] bg-[#0d1117] hover:bg-[#21262d] text-[#c9d1d9]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-1 text-white">How experienced are you?</h2>
              <p className="text-sm text-[#8b949e] mb-6">Be honest—MentorAI adapts to your starting point.</p>
              <div className="flex flex-col gap-3">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => handleSelect('level', lvl)}
                    className={`p-4 rounded-md border text-left transition-all cursor-pointer ${
                      formData.level === lvl
                        ? 'border-[#58a6ff] bg-[#58a6ff]/20 text-[#58a6ff] font-bold'
                        : 'border-[#30363d] bg-[#0d1117] hover:bg-[#21262d] text-[#c9d1d9]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-1 text-white">What is your primary goal?</h2>
              <p className="text-sm text-[#8b949e] mb-6">This shapes the real-world projects in your roadmap.</p>
              <div className="grid grid-cols-2 gap-3">
                {GOALS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleSelect('goal', g)}
                    className={`p-4 rounded-md border text-left transition-all cursor-pointer ${
                      formData.goal === g
                        ? 'border-[#58a6ff] bg-[#58a6ff]/20 text-[#58a6ff] font-bold'
                        : 'border-[#30363d] bg-[#0d1117] hover:bg-[#21262d] text-[#c9d1d9]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold mb-1 text-white">How much time do you have?</h2>
              <p className="text-sm text-[#8b949e] mb-6">Choose your target duration.</p>
              <div className="grid grid-cols-3 gap-3">
                {TIMELINES.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleSelect('timeline', time)}
                    className={`p-4 rounded-md border text-center font-mono transition-all cursor-pointer ${
                      formData.timeline === time
                        ? 'border-[#58a6ff] bg-[#58a6ff]/20 text-[#58a6ff] font-bold'
                        : 'border-[#30363d] bg-[#0d1117] hover:bg-[#21262d] text-[#c9d1d9]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold mb-1 text-white">How many hours can you study each day?</h2>
              <p className="text-sm text-[#8b949e] mb-6">Consistent daily commitment beats cramming.</p>
              <div className="grid grid-cols-2 gap-3">
                {DAILY_HOURS.map((hr) => (
                  <button
                    key={hr}
                    type="button"
                    onClick={() => handleSelect('dailyHours', hr)}
                    className={`p-4 rounded-md border text-center font-mono transition-all cursor-pointer ${
                      formData.dailyHours === hr
                        ? 'border-[#58a6ff] bg-[#58a6ff]/20 text-[#58a6ff] font-bold'
                        : 'border-[#30363d] bg-[#0d1117] hover:bg-[#21262d] text-[#c9d1d9]'
                    }`}
                  >
                    {hr}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-4 border-t border-[#30363d] flex justify-between items-center">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 border border-[#30363d] rounded-md text-sm hover:bg-[#21262d] text-white transition-colors cursor-pointer"
              >
                Back
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={
                  (step === 2 && !formData.level) || 
                  (step === 3 && !formData.goal)
                }
                className="px-5 py-2 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded-md text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#238636] hover:bg-[#2ea043] text-white font-semibold rounded-md text-sm transition-colors shadow-lg cursor-pointer"
              >
                Generate My Learning Plan 🚀
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
