'use client';

import { useState } from 'react';

export default function TaskModal({ task, isOpen, onClose, onAskAI }) {
  const [activeTab, setActiveTab] = useState('lesson'); // 'lesson' | 'quiz'
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  if (!isOpen || !task) return null;

  // Mock quiz data tailored to the task
  const mockQuiz = {
    question: `Which of the following best describes how variables store data in ${task.title}?`,
    options: [
      'Variables hold fixed physical memory locations that cannot be re-allocated.',
      'Variables act as named references/pointers to values stored in memory.',
      'Variables can only store raw numerical digits, not text or booleans.',
      'Variables execute code blocks automatically when referenced.',
    ],
    correctIdx: 1,
    explanation: 'Variables serve as named labels pointing to data objects in memory.',
  };

  const handleQuizSubmit = () => {
    if (selectedOption !== null) {
      setQuizSubmitted(true);
    }
  };

  const handleClose = () => {
    setActiveTab('lesson');
    setSelectedOption(null);
    setQuizSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-[#010409] border-b border-[#30363d] px-6 py-4 flex justify-between items-center select-none">
          <div>
            <span className="font-mono text-xs text-[#58a6ff] uppercase tracking-wider block">
              Interactive AI Lesson
            </span>
            <h2 className="text-lg font-bold text-white mt-0.5">{task.title}</h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-[#8b949e] hover:text-white font-mono text-xs px-2.5 py-1 border border-[#30363d] rounded hover:bg-[#21262d] transition-colors"
          >
            ✕ Close
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#30363d] bg-[#0d1117]">
          <button
            type="button"
            onClick={() => setActiveTab('lesson')}
            className={`flex-1 py-3 text-xs font-mono font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'lesson'
                ? 'border-[#58a6ff] text-[#58a6ff] bg-[#161b22]'
                : 'border-transparent text-[#8b949e] hover:text-white'
            }`}
          >
            📖 30-Min Lesson
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quiz')}
            className={`flex-1 py-3 text-xs font-mono font-semibold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'quiz'
                ? 'border-[#58a6ff] text-[#58a6ff] bg-[#161b22]'
                : 'border-transparent text-[#8b949e] hover:text-white'
            }`}
          >
            🧩 Concept Check Quiz
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: 30-MIN LESSON */}
          {activeTab === 'lesson' && (
            <div className="space-y-4 text-sm text-[#c9d1d9] leading-relaxed">
              <div className="bg-[#0d1117] border border-[#30363d] p-4 rounded-md">
                <h3 className="font-mono text-xs text-[#238636] font-bold uppercase mb-2">
                  ⚡ Core Takeaway (30-Min Focus)
                </h3>
                <p className="text-xs text-[#8b949e]">
                  Understand how information is labeled, modified, and evaluated conditionally during runtime.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">1. What is {task.title}?</h4>
                <p>
                  At its core, programming is about receiving data, manipulating it, and outputting results.
                  Think of variables as named containers in your computer's memory where you can stash data to reuse later.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">2. Key Concepts & Example</h4>
                <p className="mb-2">
                  Data types define what kind of value a variable can store (e.g., Numbers, Strings/Text, Booleans `true/false`).
                </p>
                <div className="bg-[#010409] border border-[#30363d] p-3 rounded-md font-mono text-xs text-[#58a6ff] overflow-x-auto">
                  <code>
                    {`// Example Code Concept\nlet userScore = 10;           // Integer\nlet username = "Developer";   // String\nlet isCompleted = false;      // Boolean\n\nif (userScore >= 10) {\n  isCompleted = true;\n}`}
                  </code>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">3. Common Pitfalls to Avoid</h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-[#8b949e]">
                  <li>Trying to perform math operations on string numbers (e.g., <code className="text-white">"10" + 5</code>).</li>
                  <li>Referencing a variable before it has been declared or assigned in scope.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <div className="bg-[#0d1117] border border-[#30363d] p-4 rounded-md">
                <h3 className="font-mono text-xs text-[#58a6ff] font-bold uppercase mb-1">
                  Task Assessment
                </h3>
                <p className="text-sm font-semibold text-white">{mockQuiz.question}</p>
              </div>

              <div className="space-y-2">
                {mockQuiz.options.map((option, idx) => {
                  let buttonStyle = 'bg-[#0d1117] border-[#30363d] hover:border-[#58a6ff] text-[#c9d1d9]';

                  if (selectedOption === idx) {
                    buttonStyle = 'bg-[#58a6ff]/20 border-[#58a6ff] text-white font-semibold';
                  }

                  if (quizSubmitted) {
                    if (idx === mockQuiz.correctIdx) {
                      buttonStyle = 'bg-[#238636]/20 border-[#238636] text-[#2ea043] font-bold';
                    } else if (selectedOption === idx) {
                      buttonStyle = 'bg-red-500/20 border-red-500 text-red-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={quizSubmitted}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full p-3 rounded-md border text-left text-xs transition-all cursor-pointer ${buttonStyle}`}
                    >
                      <span className="font-mono mr-2 text-[#8b949e]">{String.fromCharCode(65 + idx)}.</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Quiz Results / Feedback */}
              {quizSubmitted && (
                <div
                  className={`p-4 rounded-md border text-xs font-mono ${
                    selectedOption === mockQuiz.correctIdx
                      ? 'bg-[#238636]/10 border-[#238636] text-[#2ea043]'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {selectedOption === mockQuiz.correctIdx ? (
                    <p>🎉 Correct! {mockQuiz.explanation}</p>
                  ) : (
                    <p>❌ Not quite! {mockQuiz.explanation}</p>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#010409] border-t border-[#30363d] flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              handleClose();
              onAskAI(task.title);
            }}
            className="px-4 py-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white rounded-md text-xs font-mono transition-colors cursor-pointer"
          >
            💬 Ask AI Tutor More
          </button>

          {activeTab === 'lesson' ? (
            <button
              type="button"
              onClick={() => setActiveTab('quiz')}
              className="px-5 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Take Quiz →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleQuizSubmit}
              disabled={selectedOption === null || quizSubmitted}
              className="px-5 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded-md text-xs font-mono font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Submit Answer
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
