'use client';

export default function TaskModal({ task, isOpen, onClose, onAskAI }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-[#161b22] border border-[#30363d] rounded-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#010409] border-b border-[#30363d] px-6 py-4 flex justify-between items-center">
          <span className="font-mono text-xs text-[#58a6ff] uppercase tracking-wider">
            Module Detail
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8b949e] hover:text-white font-mono text-xs px-2 py-1 border border-[#30363d] rounded hover:bg-[#21262d]"
          >
            ✕ Close
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">{task.title}</h2>
            <span className="inline-block px-2 py-0.5 text-xs font-mono bg-[#30363d] text-[#c9d1d9] rounded">
              Estimated Time: {task.time}
            </span>
          </div>

          {/* Resources List */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono text-[#8b949e] uppercase">Recommended Learning Resources</h3>
            <div className="space-y-2">
              <a
                href="https://docs.python.org/3/"
                target="_blank"
                rel="noreferrer"
                className="block p-3 bg-[#0d1117] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
              >
                <div className="text-sm font-semibold text-[#58a6ff]">📖 Official Documentation</div>
                <div className="text-xs text-[#8b949e] mt-0.5">Read core concepts directly from the source.</div>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="block p-3 bg-[#0d1117] border border-[#30363d] rounded-md hover:border-[#58a6ff] transition-colors"
              >
                <div className="text-sm font-semibold text-[#58a6ff]">▶️ Recommended Video Breakdown</div>
                <div className="text-xs text-[#8b949e] mt-0.5">Watch a 15-minute visual walk-through.</div>
              </a>
            </div>
          </div>

          {/* Practice Exercise */}
          <div className="p-4 bg-[#0d1117] border border-[#30363d] rounded-md">
            <h4 className="text-xs font-mono text-[#238636] font-bold mb-1">⚡ Quick Practice Challenge</h4>
            <p className="text-xs text-[#c9d1d9]">
              Write a function that takes an integer array and returns true if any value appears at least twice.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#010409] border-t border-[#30363d] flex justify-between items-center">
          <button
            type="button"
            onClick={() => {
              onClose();
              onAskAI(task.title);
            }}
            className="px-4 py-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white rounded-md text-xs font-mono transition-colors"
          >
            💬 Ask AI Tutor About This Task
          </button>
        </div>

      </div>
    </div>
  );
}
