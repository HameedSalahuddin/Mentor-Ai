"use client"

import { useMemo, useState } from "react"

import {
  Terminal,
  Search,
  Check,
  ArrowRight,
  ArrowLeft,
  Globe,
  ChevronDown,
  Sprout,
  GitBranch,
  Gauge,
  BarChart3,
  AppWindow,
  BrainCircuit,
  Code2,
  Bot,
  Rocket,
  CalendarDays,
  CalendarRange,
  CalendarClock,
  Infinity as InfinityIcon,
  Coffee,
  Clock,
  Zap,
  Flame,
  type LucideIcon,
} from "lucide-react"

type Accent = "emerald" | "violet" | "amber"

interface Option {
  id: string
  icon: LucideIcon
  title: string
  desc: string
  accent: Accent
}

interface Topic {
  id: string
  label: string
  group: "Language" | "Skill"
}

interface OnboardingProps {
  onComplete?: (data: Record<string, unknown>) => void
}

const topics: Topic[] = [
  { id: "python", label: "Python", group: "Language" },
  { id: "javascript", label: "JavaScript", group: "Language" },
  { id: "typescript", label: "TypeScript", group: "Language" },
  { id: "cpp", label: "C++", group: "Language" },
  { id: "java", label: "Java", group: "Language" },
  { id: "go", label: "Go", group: "Language" },
  { id: "rust", label: "Rust", group: "Language" },
  { id: "php", label: "PHP", group: "Language" },
  { id: "csharp", label: "C#", group: "Language" },
  { id: "dsa", label: "Data Structures & Algorithms", group: "Skill" },
  { id: "system-design", label: "System Design", group: "Skill" },
  { id: "sql", label: "SQL & Databases", group: "Skill" },
  { id: "devops", label: "DevOps & Cloud", group: "Skill" },
]

const levels: Option[] = [
  {
    id: "beginner",
    icon: Sprout,
    title: "Beginner",
    desc: "Starting from scratch.",
    accent: "emerald",
  },
  {
    id: "intermediate",
    icon: GitBranch,
    title: "Intermediate",
    desc: "I know the basics & syntax.",
    accent: "violet",
  },
  {
    id: "advanced",
    icon: Gauge,
    title: "Advanced",
    desc: "Looking to master & optimize.",
    accent: "amber",
  },
]

const goals: Option[] = [
  {
    id: "data-science",
    icon: BarChart3,
    title: "Data Science & Analytics",
    desc: "Turn raw data into insight and decisions.",
    accent: "emerald",
  },
  {
    id: "web-app",
    icon: AppWindow,
    title: "Web App Development",
    desc: "Design and ship full web applications.",
    accent: "violet",
  },
  {
    id: "ml-ai",
    icon: BrainCircuit,
    title: "Machine Learning & AI",
    desc: "Build and train intelligent models.",
    accent: "amber",
  },
  {
    id: "interviews",
    icon: Code2,
    title: "Ace Coding Interviews",
    desc: "Master DSA and problem-solving under pressure.",
    accent: "emerald",
  },
  {
    id: "automate",
    icon: Bot,
    title: "Automate Tasks",
    desc: "Script away the repetitive work in your day.",
    accent: "violet",
  },
]

const timelines: Option[] = [
  {
    id: "sprint",
    icon: CalendarDays,
    title: "30 Days (Sprint)",
    desc: "Fast, focused, high-intensity push.",
    accent: "amber",
  },
  {
    id: "standard",
    icon: CalendarRange,
    title: "60 Days (Standard)",
    desc: "Balanced pace with room to absorb.",
    accent: "violet",
  },
  {
    id: "deep-dive",
    icon: CalendarClock,
    title: "90 Days (Deep Dive)",
    desc: "Thorough coverage and deep practice.",
    accent: "emerald",
  },
  {
    id: "self-paced",
    icon: InfinityIcon,
    title: "Self-Paced",
    desc: "No deadline. Move at your own rhythm.",
    accent: "emerald",
  },
]

const commitments: Option[] = [
  {
    id: "casual",
    icon: Coffee,
    title: "30 mins/day",
    desc: "Casual pace. Steady progress without pressure.",
    accent: "emerald",
  },
  {
    id: "focused",
    icon: Clock,
    title: "1 hr/day",
    desc: "Focused daily habit. The sweet spot for momentum.",
    accent: "violet",
  },
  {
    id: "intense",
    icon: Zap,
    title: "2 hrs/day",
    desc: "Intense sprint. Level up fast and go deep.",
    accent: "amber",
  },
  {
    id: "beast",
    icon: Flame,
    title: "4+ hrs/day",
    desc: "Full immersion. Maximum velocity learning.",
    accent: "amber",
  },
]

const accentClasses: Record<
  Accent,
  { selBorder: string; selBg: string; icon: string; iconSel: string; ring: string; chip: string }
> = {
  emerald: {
    selBorder: "border-emerald-400",
    selBg: "bg-emerald-400/10",
    icon: "border-zinc-700 bg-zinc-800 text-zinc-400",
    iconSel: "border-emerald-400 bg-emerald-400/10 text-emerald-400",
    ring: "hover:border-emerald-400/50",
    chip: "text-emerald-400",
  },
  violet: {
    selBorder: "border-violet-400",
    selBg: "bg-violet-400/10",
    icon: "border-zinc-700 bg-zinc-800 text-zinc-400",
    iconSel: "border-violet-400 bg-violet-400/10 text-violet-300",
    ring: "hover:border-violet-400/50",
    chip: "text-violet-300",
  },
  amber: {
    selBorder: "border-amber-400",
    selBg: "bg-amber-400/10",
    icon: "border-zinc-700 bg-zinc-800 text-zinc-400",
    iconSel: "border-amber-400 bg-amber-400/10 text-amber-400",
    ring: "hover:border-amber-400/50",
    chip: "text-amber-400",
  },
}

const STEP_META = [
  { title: "What to Learn", heading: "What do you want to learn?" },
  { title: "Skill Level", heading: "What is your current skill level?" },
  { title: "Primary Goal", heading: "What is your primary goal?" },
  { title: "Target Timeline", heading: "What is your target timeline?" },
  { title: "Daily Commitment", heading: "How much time can you invest daily?" },
]
const TOTAL_STEPS = STEP_META.length

export default function OnboardingPage({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0)
  const [language, setLanguage] = useState("en")
  const [query, setQuery] = useState("")
  const [topic, setTopic] = useState<string | null>(null)
  const [level, setLevel] = useState<string | null>(null)
  const [goal, setGoal] = useState<string | null>(null)
  const [customGoal, setCustomGoal] = useState("")
  const [timeline, setTimeline] = useState<string | null>(null)
  const [commitment, setCommitment] = useState<string | null>(null)

  const meta = STEP_META[step]
  const isLast = step === TOTAL_STEPS - 1

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return topics
    return topics.filter((t) => t.label.toLowerCase().includes(q))
  }, [query])

  const canContinue = (() => {
    switch (step) {
      case 0:
        return Boolean(topic)
      case 1:
        return Boolean(level)
      case 2:
        return Boolean(goal) || customGoal.trim().length > 0
      case 3:
        return Boolean(timeline)
      case 4:
        return Boolean(commitment)
      default:
        return false
    }
  })()

  function back() {
    if (step > 0) setStep((s) => s - 1)
  }

  function next() {
    if (!canContinue || isLast) return
    setStep((s) => s + 1)
  }

  function handleFinish() {
    if (!canContinue) return

    const formData = {
      topic,
      level,
      goal,
      customGoal,
      timeline,
      commitment,
      language,
    }

    // Call onComplete callback if passed from parent
    if (onComplete) {
      onComplete(formData)
    }

    console.log("Roadmap generated:", formData)
  }

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6">
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-md border-2 border-emerald-400 bg-emerald-400/10 text-emerald-400">
              <Terminal className="size-6" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-mono text-xl font-bold tracking-tight leading-none">
                Mentor<span className="text-emerald-400">AI</span>
                <span
                  className="ml-1 inline-block size-2 -translate-y-0.5 bg-emerald-400"
                  aria-hidden="true"
                />
              </h1>
              <span className="mt-1 font-mono text-xs text-violet-300">
                Step {step + 1} of {TOTAL_STEPS}: {meta.title}
              </span>
            </div>
          </div>

          {/* Language selector */}
          <div className="group relative w-full sm:w-auto">
            <label htmlFor="language" className="sr-only">
              Interface language
            </label>
            <Globe
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-emerald-400"
              aria-hidden="true"
            />
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-md border-2 border-zinc-800 bg-zinc-900 py-2 pl-9 pr-9 font-mono text-sm font-medium text-zinc-100 transition-colors hover:border-emerald-400/50 focus:border-emerald-400 focus:outline-none sm:w-44"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-emerald-400"
              aria-hidden="true"
            />
          </div>
        </header>

        {/* Step progress bar */}
        <div className="flex items-center gap-2" aria-hidden="true">
          {STEP_META.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-emerald-400" : "bg-zinc-800"
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <section aria-labelledby="step-heading" className="flex flex-1 flex-col">
          <h2 id="step-heading" className="mb-1 text-2xl font-bold text-balance">
            {meta.heading}
          </h2>
          <p className="mb-6 text-sm text-zinc-400">
            {step === 0
              ? "Search or scroll to pick the language or skill you want to focus on."
              : "Pick one to personalize your roadmap. You can change this later."}
          </p>

          {/* STEP 1 */}
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search languages & skills..."
                  aria-label="Search languages and skills"
                  className="w-full rounded-md border-2 border-zinc-800 bg-zinc-900 py-2.5 pl-9 pr-3 text-sm text-zinc-100 transition-colors placeholder:text-zinc-600 hover:border-emerald-400/50 focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div
                role="radiogroup"
                aria-label="Languages and skills"
                className="grid max-h-[350px] grid-cols-2 gap-3 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 sm:grid-cols-3"
              >
                {filteredTopics.map((t) => {
                  const isSel = topic === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={isSel}
                      onClick={() => setTopic(t.id)}
                      className={`flex items-center justify-between gap-2 rounded-md border-2 px-3 py-3 text-left text-sm font-semibold transition-all active:translate-y-px ${
                        isSel
                          ? "border-emerald-400 bg-emerald-400/10 text-emerald-300"
                          : "border-zinc-800 bg-zinc-900 text-zinc-200 hover:border-emerald-400/50"
                      }`}
                    >
                      <span className="flex flex-col">
                        <span>{t.label}</span>
                        <span className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-zinc-500">
                          {t.group}
                        </span>
                      </span>
                      {isSel && (
                        <Check className="size-4 shrink-0 text-emerald-400" strokeWidth={3} aria-hidden="true" />
                      )}
                    </button>
                  )
                })}
                {filteredTopics.length === 0 && (
                  <p className="col-span-full py-8 text-center text-sm text-zinc-500">
                    No matches for &ldquo;{query}&rdquo;.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEPS 2-5 */}
          {step > 0 && (
            <>
              {(() => {
                const config: Record<
                  number,
                  { options: Option[]; value: string | null; set: (id: string) => void; label: string; cols: string }
                > = {
                  1: { options: levels, value: level, set: setLevel, label: "Skill level", cols: "sm:grid-cols-3" },
                  2: { options: goals, value: goal, set: setGoal, label: "Primary goal", cols: "sm:grid-cols-3" },
                  3: { options: timelines, value: timeline, set: setTimeline, label: "Target timeline", cols: "sm:grid-cols-2" },
                  4: { options: commitments, value: commitment, set: setCommitment, label: "Daily commitment", cols: "sm:grid-cols-2" },
                }
                const c = config[step]
                return (
                  <div role="radiogroup" aria-label={c.label} className={`grid gap-4 ${c.cols}`}>
                    {c.options.map((opt) => {
                      const OptIcon = opt.icon
                      const isSel = c.value === opt.id
                      const a = accentClasses[opt.accent]
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          role="radio"
                          aria-checked={isSel}
                          onClick={() => c.set(opt.id)}
                          className={`relative flex flex-col rounded-lg border-2 p-4 text-left transition-all active:translate-y-px ${
                            isSel ? `${a.selBorder} ${a.selBg}` : `border-zinc-800 bg-zinc-900 ${a.ring}`
                          }`}
                        >
                          {isSel && (
                            <span
                              className={`absolute right-3 top-3 flex size-5 items-center justify-center rounded-full ${a.selBorder} border-2 ${a.chip}`}
                              aria-hidden="true"
                            >
                              <Check className="size-3" strokeWidth={3} />
                            </span>
                          )}
                          <span
                            className={`mb-3 flex size-11 items-center justify-center rounded-md border-2 transition-colors ${
                              isSel ? a.iconSel : a.icon
                            }`}
                          >
                            <OptIcon className="size-6" aria-hidden="true" />
                          </span>
                          <span className="text-base font-bold text-zinc-100">{opt.title}</span>
                          <span className="mt-1 text-sm leading-relaxed text-zinc-400">{opt.desc}</span>
                        </button>
                      )
                    })}
                  </div>
                )
              })()}

              {step === 2 && (
                <div className="mt-6">
                  <label htmlFor="custom-goal" className="mb-2 block text-sm font-semibold text-zinc-300">
                    Or describe your custom end goal:
                  </label>
                  <textarea
                    id="custom-goal"
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    rows={4}
                    placeholder="e.g. Ship a SaaS side project, contribute to open source, or pass a certification exam..."
                    className="w-full resize-y rounded-lg border-2 border-zinc-800 bg-zinc-900 p-4 text-sm leading-relaxed text-zinc-100 transition-colors placeholder:text-zinc-600 hover:border-amber-400/50 focus:border-amber-400 focus:outline-none"
                  />
                  <p className="mt-2 font-mono text-xs text-zinc-500">
                    Optional — we&apos;ll blend this into your generated roadmap.
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-md border-2 border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition-all hover:border-zinc-600 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-zinc-800"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </button>

          {isLast ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={handleFinish}
              className={`inline-flex items-center gap-2 rounded-md border-2 px-5 py-2.5 text-sm font-bold transition-all active:translate-y-px ${
                canContinue
                  ? "border-emerald-400 bg-emerald-400 text-zinc-950 hover:bg-emerald-300 cursor-pointer"
                  : "cursor-not-allowed border-zinc-800 bg-zinc-900 text-zinc-600"
              }`}
            >
              Generate My Roadmap
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className="inline-flex items-center gap-2 rounded-md border-2 border-emerald-400 bg-emerald-400 px-5 py-2.5 text-sm font-bold text-zinc-950 transition-all hover:bg-emerald-300 active:translate-y-px disabled:cursor-not-allowed disabled:border-zinc-800 disabled:bg-zinc-900 disabled:text-zinc-600"
            >
              Next
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </footer>
    </main>
  )
}
