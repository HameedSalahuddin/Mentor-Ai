"use client"

import { useState } from "react"
import {
  Terminal,
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  BookOpen,
  HelpCircle,
  ArrowLeft,
  Flame,
  Clock,
  Send,
  Check,
  X,
  Code2,
} from "lucide-react"

// Types
type ViewState = "dashboard" | "lesson"

interface LessonData {
  chapterTitle: string
  lessonTitle: string
  content: string
  quiz: {
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }
}

export default function Dashboard() {
  const [view, setView] = useState<ViewState>("dashboard")
  const [activeTab, setActiveTab] = useState<"learn" | "quiz">("learn")
  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null)
  
  // Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // AI Chat State
  const [messages, setMessages] = useState<Array<{ sender: "ai" | "user"; text: string }>>([
    { sender: "ai", text: "Hello! I'm your AI Mentor for this quest. Read through the material on the left or ask me any questions here!" },
  ])
  const [inputMsg, setInputMsg] = useState("")

  // Mock Lesson Handler
  const openLesson = (chapter: string, lesson: string) => {
    setSelectedLesson({
      chapterTitle: chapter,
      lessonTitle: lesson,
      content: `Welcome to ${lesson}! In this module, we will explore fundamental concepts required for building real-world applications.

### Key Concepts
1. **Understanding the Logic:** Master control flow and structure.
2. **Writing Clean Syntax:** Follow best practices to ensure your code is readable and scalable.
3. **Handling Data Effectively:** Learn how state and variables interact under the hood.

> *Tip: Try asking the AI Mentor on the right if you get stuck on any concept!*`,
      quiz: {
        question: `Which of the following best describes the core concept behind ${lesson}?`,
        options: [
          "It manages data states deterministically.",
          "It replaces all backend logic completely.",
          "It runs strictly inside a database query.",
          "It is used only for styling visual components."
        ],
        correctAnswer: 0,
        explanation: "Correct! Managing data states deterministically ensures predictable behavior throughout execution."
      }
    })
    setMessages([
      { sender: "ai", text: `Welcome to "${lesson}"! Ask me anything about this chapter if you need hints or code reviews.` }
    ])
    setSelectedOption(null)
    setQuizSubmitted(false)
    setActiveTab("learn")
    setView("lesson")
  }

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return
    const newMsgs = [...messages, { sender: "user" as const, text: inputMsg }]
    setMessages(newMsgs)
    setInputMsg("")

    // Simulated AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `That's a great question about "${selectedLesson?.lessonTitle || 'this topic'}"! Remember to break down the logic step-by-step and verify your variables. Let me know if you want a code snippet!`,
        },
      ])
    }, 800)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-md border-2 border-emerald-400 bg-emerald-400/10 text-emerald-400">
            <Terminal className="size-5" />
          </div>
          <span className="font-mono text-lg font-bold">
            Mentor<span className="text-emerald-400">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-full bg-violet-400/10 text-violet-300 border border-violet-400/30">
            ● Python • Web Dev
          </span>
          <span className="px-3 py-1.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
            🎯 60 Days | ⏱️ 1 hr/day
          </span>
          <button className="px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition">
            Change Plan
          </button>
        </div>
      </header>

      {/* VIEW 1: MAIN DASHBOARD */}
      {view === "dashboard" && (
        <main className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Progress Overview */}
          <section className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-mono text-zinc-400">Overall Progress</h2>
              <span className="bg-emerald-400/10 text-emerald-400 font-mono text-xs px-2.5 py-1 rounded border border-emerald-400/20 font-bold">
                35% Completed
              </span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
              <div className="bg-emerald-400 h-full w-[35%] rounded-full transition-all duration-500" />
            </div>
            <p className="text-xs font-mono text-zinc-500 mt-2">2 of 6 modules complete</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Quests & Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-lg font-bold">Learning Quests</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Quest 1 */}
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="p-2 bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 rounded-lg">
                        <BookOpen className="size-5" />
                      </div>
                      <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">500 XP</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">Chapter 1</span>
                    <h4 className="font-bold text-base mt-0.5">Python Fundamentals</h4>
                    <p className="text-xs text-zinc-400 mt-1">Syntax, variables, and your first scripts.</p>
                  </div>
                  <button 
                    onClick={() => openLesson("Chapter 1", "Python Fundamentals")}
                    className="mt-4 w-full py-2 bg-emerald-400/10 border border-emerald-400/40 text-emerald-400 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-400/20 transition"
                  >
                    <CheckCircle2 className="size-4" /> Review Completed
                  </button>
                </div>

                {/* Quest 2 */}
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="p-2 bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 rounded-lg">
                        <Code2 className="size-5" />
                      </div>
                      <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">750 XP</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">Chapter 2</span>
                    <h4 className="font-bold text-base mt-0.5">Data Structures</h4>
                    <p className="text-xs text-zinc-400 mt-1">Lists, dicts, sets, and when to use each.</p>
                  </div>
                  <button 
                    onClick={() => openLesson("Chapter 2", "Data Structures")}
                    className="mt-4 w-full py-2 bg-emerald-400/10 border border-emerald-400/40 text-emerald-400 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-400/20 transition"
                  >
                    <CheckCircle2 className="size-4" /> Review Completed
                  </button>
                </div>

                {/* Quest 3 (ACTIVE) */}
                <div className="bg-zinc-900/60 border border-emerald-400/50 rounded-xl p-5 flex flex-col justify-between ring-1 ring-emerald-400/20">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="p-2 bg-emerald-400 text-zinc-950 rounded-lg">
                        <Play className="size-5 fill-current" />
                      </div>
                      <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">900 XP</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">Chapter 3</span>
                    <h4 className="font-bold text-base mt-0.5">Web with Flask</h4>
                    <p className="text-xs text-zinc-400 mt-1">Build routes, templates, and a real API.</p>
                  </div>
                  <button 
                    onClick={() => openLesson("Chapter 3", "Web with Flask")}
                    className="mt-4 w-full py-2 bg-emerald-400 text-zinc-950 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-300 transition"
                  >
                    Start Quest <Play className="size-3 fill-current" />
                  </button>
                </div>

                {/* Quest 4 (LOCKED) */}
                <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-5 flex flex-col justify-between opacity-60">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="p-2 bg-zinc-800 text-zinc-500 rounded-lg">
                        <Lock className="size-5" />
                      </div>
                      <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">1200 XP</span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">Chapter 4</span>
                    <h4 className="font-bold text-base mt-0.5 text-zinc-400">Deploy Your App</h4>
                    <p className="text-xs text-zinc-500 mt-1">Ship your project to production.</p>
                  </div>
                  <button disabled className="mt-4 w-full py-2 bg-zinc-800 text-zinc-500 rounded-lg text-xs font-bold cursor-not-allowed flex items-center justify-center gap-2">
                    <Lock className="size-3" /> Locked
                  </button>
                </div>
              </div>

              {/* Module Timeline */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-mono text-sm font-bold text-zinc-200">Week 1: Core Fundamentals</h4>
                  <span className="text-xs font-mono text-zinc-500">5/5</span>
                </div>
                
                {[
                  { title: "Install Python & set up your editor", duration: "20 mins" },
                  { title: "Variables, numbers & strings", duration: "45 mins" },
                  { title: "Lists, tuples & dictionaries", duration: "45 mins" },
                  { title: "Conditionals & loops", duration: "60 mins" },
                  { title: "Mini project: build a CLI quiz", duration: "50 mins" },
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => openLesson("Week 1", item.title)}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-900 border border-zinc-800/80 hover:border-emerald-400/50 cursor-pointer transition group"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="size-4 text-emerald-400" />
                      <span className="text-xs font-medium text-zinc-300 group-hover:text-emerald-300 transition">{item.title}</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                      <Clock className="size-3" /> {item.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Activity Streak */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold">Activity</h4>
                  <span className="flex items-center gap-1 text-xs font-mono bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded">
                    <Flame className="size-3 fill-current" /> 1 Day Streak
                  </span>
                </div>
                {/* Mock heatmap grid */}
                <div className="grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 rounded-sm ${
                        i === 27 ? "bg-emerald-400" : i % 3 === 0 ? "bg-emerald-500/40" : "bg-zinc-800"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* AI Mentor Callout */}
              <div className="bg-gradient-to-b from-violet-950/40 to-zinc-900/80 border border-violet-500/30 rounded-xl p-5 space-y-3">
                <div className="p-2.5 bg-violet-500/10 border border-violet-400/30 text-violet-300 rounded-lg w-fit">
                  <Sparkles className="size-5" />
                </div>
                <h4 className="font-bold text-base">AI Mentor</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Stuck on a concept? Summon your mentor for hints, code reviews, and a nudge in the right direction.
                </p>
                <button 
                  onClick={() => openLesson("General", "AI Coaching Session")}
                  className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  Summon Mentor <Sparkles className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEW 2: INTERACTIVE LESSON & QUIZ VIEW */}
      {view === "lesson" && selectedLesson && (
        <main className="max-w-7xl mx-auto p-6 flex flex-col h-[calc(100vh-80px)]">
          {/* Header navigation back */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800">
            <button
              onClick={() => setView("dashboard")}
              className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-emerald-400 transition"
            >
              <ArrowLeft className="size-4" /> Back to Dashboard
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-500">{selectedLesson.chapterTitle}</span>
              <span className="text-xs text-zinc-600">•</span>
              <span className="text-xs font-bold text-emerald-400">{selectedLesson.lessonTitle}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-hidden">
            {/* Left Column: Lesson Material / Quiz Tabs (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-zinc-800 bg-zinc-900">
                <button
                  onClick={() => setActiveTab("learn")}
                  className={`flex-1 py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${
                    activeTab === "learn"
                      ? "border-emerald-400 bg-emerald-400/5 text-emerald-400"
                      : "border-transparent text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <BookOpen className="size-4" /> 1. Learn Material
                </button>
                <button
                  onClick={() => setActiveTab("quiz")}
                  className={`flex-1 py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${
                    activeTab === "quiz"
                      ? "border-amber-400 bg-amber-400/5 text-amber-400"
                      : "border-transparent text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <HelpCircle className="size-4" /> 2. Chapter Quiz
                </button>
              </div>

              {/* Tab 1 Content: Material */}
              {activeTab === "learn" && (
                <div className="p-6 overflow-y-auto flex-1 space-y-4">
                  <h2 className="text-xl font-bold">{selectedLesson.lessonTitle}</h2>
                  <div className="prose prose-invert prose-sm text-zinc-300 leading-relaxed whitespace-pre-line font-sans">
                    {selectedLesson.content}
                  </div>
                  <div className="pt-6 border-t border-zinc-800 flex justify-end">
                    <button
                      onClick={() => setActiveTab("quiz")}
                      className="px-4 py-2 bg-emerald-400 text-zinc-950 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-emerald-300 transition"
                    >
                      Proceed to Quiz <ArrowLeft className="size-3 rotate-180" />
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2 Content: Interactive Quiz */}
              {activeTab === "quiz" && (
                <div className="p-6 overflow-y-auto flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">Knowledge Check</span>
                    <h3 className="text-base font-bold text-zinc-100 mt-2 mb-4">
                      {selectedLesson.quiz.question}
                    </h3>

                    <div className="space-y-2.5">
                      {selectedLesson.quiz.options.map((opt, i) => {
                        const isSelected = selectedOption === i
                        const isCorrect = i === selectedLesson.quiz.correctAnswer

                        let btnStyle = "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700"
                        if (quizSubmitted) {
                          if (isCorrect) btnStyle = "border-emerald-400 bg-emerald-400/10 text-emerald-300"
                          else if (isSelected) btnStyle = "border-rose-500 bg-rose-500/10 text-rose-300"
                        } else if (isSelected) {
                          btnStyle = "border-amber-400 bg-amber-400/10 text-amber-300"
                        }

                        return (
                          <button
                            key={i}
                            disabled={quizSubmitted}
                            onClick={() => setSelectedOption(i)}
                            className={`w-full text-left p-3.5 rounded-lg border text-xs font-medium transition flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && <Check className="size-4 text-emerald-400" />}
                            {quizSubmitted && isSelected && !isCorrect && <X className="size-4 text-rose-400" />}
                          </button>
                        )
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className={`mt-4 p-4 rounded-lg border text-xs leading-relaxed ${
                        selectedOption === selectedLesson.quiz.correctAnswer
                          ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-300"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                      }`}>
                        {selectedLesson.quiz.explanation}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-zinc-800 flex justify-end">
                    {!quizSubmitted ? (
                      <button
                        disabled={selectedOption === null}
                        onClick={() => setQuizSubmitted(true)}
                        className="px-5 py-2.5 bg-amber-400 text-zinc-950 font-bold rounded-lg text-xs hover:bg-amber-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={() => setView("dashboard")}
                        className="px-5 py-2.5 bg-emerald-400 text-zinc-950 font-bold rounded-lg text-xs hover:bg-emerald-300 transition"
                      >
                        Complete Quest & Return
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: AI Tutor Chat (5 Cols) */}
            <div className="lg:col-span-5 bg-zinc-900/60 border border-zinc-800 rounded-xl flex flex-col overflow-hidden">
              <div className="p-3.5 border-b border-zinc-800 bg-zinc-900 flex items-center gap-2">
                <div className="p-1.5 bg-violet-400/10 text-violet-400 rounded-md border border-violet-400/20">
                  <Sparkles className="size-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">AI Mentor Assistant</h4>
                  <p className="text-[10px] text-zinc-500">Online • Ready to teach</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-xl text-xs leading-relaxed ${
                        m.sender === "user"
                          ? "bg-emerald-400 text-zinc-950 rounded-br-none font-medium"
                          : "bg-zinc-800 text-zinc-200 rounded-bl-none border border-zinc-700/60"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-zinc-800 bg-zinc-900 flex gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask a question or request code help..."
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:outline-none focus:border-violet-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-3 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center"
                >
                  <Send className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}
