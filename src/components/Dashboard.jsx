'use client';

import { useState } from 'react';
import AIChatModal from '@/components/AIChatModal';
import TaskModal from '@/components/TaskModal';

export default function Dashboard({ planData, onReset }) {
  const [completedTasks, setCompletedTasks] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTaskContext, setActiveTaskContext] = useState('');

  const toggleTask = (e, id) => {
    e.stopPropagation(); // Prevents opening the modal when clicking the checkbox
    setCompletedTasks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const dummyModules = [
    {
      id: 'm1',
      title: 'Week 1: Core Fundamentals & Syntax',
      tasks: [
        { id: 't1', title: 'Variables, Data Types & Control Flow', time: '45 mins' },
        { id: 't2', title: 'Functions & Scope Mechanics', time: '60 mins' },
        { id: 't3', title: 'Mini Project: Interactive CLI Tool', time: '90 mins' },
      ],
    },
    {
      id: 'm2',
      title: 'Week 2: Data Structures & Algorithms Basis',
      tasks: [
        { id: 't4', title: 'Arrays, Lists & Hash Maps', time: '60 mins' },
        { id: 't5', title: 'Time Complexity & Big-O Notation', time: '45 mins' },
        { id: 't6', title: 'LeetCode Practice: 3 Easy Problems', time: '60 mins' },
      ],
    },
  ];

  const totalTasks = dummyModules.reduce((acc, m) => acc + m.tasks.length, 0);
  const doneCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((doneCount / totalTasks) * 100);

  const handleOpenTaskAI = (taskTitle) => {
    setActiveTaskContext(taskTitle);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header / Nav Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#161b22] border border-[#30363d] rounded-lg gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-lg text-white">MentorAI</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#58a6ff]/10 border border-[#58a6ff] text-[#58a6ff] font-mono">
                {planData?.language || 'Python'} • {planData?.goal || 'Web Dev'}
              </span>
            </div>
            <p className="text-xs text-[#8b949e] mt-1">
              Target: {planData?.timeline || '60 Days'} @ {planData?.dailyHours || '1 hour'}/day
            </p>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-mono px-3 py-1.5 border border-[#30363d] rounded-md hover:bg-[#21262d] text-[#8b949e] hover:text-white transition-colors cursor-pointer"
          >
            ← Change Plan
          </button>
        </div>

        {/* Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Roadmap Area (2 columns) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">Your Custom Learning Roadmap</h2>
              <span className="text-sm font-mono text-[#8b949e]">{progressPercent}% Completed</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#21262d] rounded-full overflow-hidden border border-[#30363d]">
              <div
                className="h-full bg-[#238636] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Modules List */}
            <div className="space-y-4 mt-6">
              {dummyModules.map((module) => (
                <div key={module.id} className="bg-[#161b22] border border-[#30363d] rounded-lg p-5">
                  <h3 className="font-mono text-md font-semibold mb-3 text-[#58a6ff]">
                    {module.title}
                  </h3>
                  <div className="space-y-2">
                    {module.tasks.map((task) => {
                      const isDone = completedTasks[task.id];
                      return (
                        <div
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className={`flex items-center justify-between p-3 rounded-md border cursor-pointer transition-all select-none ${
                            isDone
                              ? 'bg-[#238636]/10 border-[#238636]/40 text-[#8b949e] line-through'
                              : 'bg-[#0d1117] border-[#30363d] hover:border-[#58a6ff] text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={!!isDone}
                              onChange={(e) => toggleTask(e, task.id)}
                              className="accent-[#238636] h-4 w-4 rounded cursor-pointer"
                            />
                            <span className="text-sm font-medium">{task.title}</span>
                          </div>
                          <span className="text-xs font-mono text-[#8b949e]">{task.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Panel: Daily Streak & AI Assistant (1 column) */}
          <div className="space-y-6">
            
            {/* Streak / Heatmap Mock */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5">
              <h3 className="font-bold text-sm mb-2 text-white flex items-center gap-2">
                ⚡ Learning Streak: <span className="text-[#58a6ff] font-mono">1 Day</span>
              </h3>
              <p className="text-xs text-[#8b949e] mb-4">Complete 1 task daily to maintain your momentum.</p>
              
              {/* GitHub Activity Grid Mock */}
              <div className="grid grid-cols-7 gap-1.5 pt-2 border-t border-[#30363d]">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-full aspect-square rounded-sm border ${
                      i === 27
                        ? 'bg-[#238636] border-[#2ea043]'
                        : 'bg-[#0d1117] border-[#30363d]'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* AI Tutor Card */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5">
              <h3 className="font-bold text-sm mb-2 text-white">🤖 MentorAI Assistant</h3>
              <p className="text-xs text-[#8b949e] mb-4">
                Got stuck on a topic or error message? Ask your AI tutor for a quick breakdown.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveTaskContext('');
                  setIsChatOpen(true);
                }}
                className="w-full py-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] font-mono text-xs rounded-md transition-colors text-white cursor-pointer"
              >
                Launch AI Chat →
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Modals */}
      <AIChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        activeTask={activeTaskContext}
      />

      <TaskModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onAskAI={handleOpenTaskAI}
      />
    </div>
  );
}
