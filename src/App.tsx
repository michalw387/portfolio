import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  GraduationCap,
  Mail,
  Menu,
  Trophy,
  X,
} from 'lucide-react'
import { lazy, Suspense, useEffect, useState, type PointerEvent, type ReactNode } from 'react'
import { content, links, type Lang, type Project } from './content'
import ProjectArt from './ProjectArt'

const year = new Date().getFullYear()
const Scene = lazy(() => import('./Scene'))

/* ---------- ikony marek (lucide ich nie zawiera) ---------- */

const GitHubIcon = ({ className = 'size-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const LinkedInIcon = ({ className = 'size-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

/* ---------- interakcje ---------- */

/** Poświata tła podąża za kursorem; jej barwa zależy od pozycji myszy. */
function usePointerGlow() {
  useEffect(() => {
    const root = document.documentElement
    const onMove = (e: globalThis.PointerEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      root.style.setProperty('--mx', `${x * 100}%`)
      root.style.setProperty('--my', `${y * 100}%`)
      root.style.setProperty('--hue', `${Math.round(180 + x * 100 + y * 40)}`)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
}

/** Elementy z klasą .reveal pojawiają się przy wejściu w viewport. */
function useReveal(dep: unknown) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

/** Przechył 3D karty i poświata pod kursorem. */
const tilt = {
  onPointerMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== 'mouse') return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--cx', `${x * 100}%`)
    el.style.setProperty('--cy', `${y * 100}%`)
    el.style.setProperty('--ry', `${(x - 0.5) * 7}deg`)
    el.style.setProperty('--rx', `${(0.5 - y) * 7}deg`)
  },
  onPointerLeave(e: PointerEvent<HTMLElement>) {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  },
}

/* ---------- drobne klocki ---------- */

const btn =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition duration-200 hover:-translate-y-0.5 active:translate-y-0'
const btnPrimary = `${btn} bg-gradient-to-r from-cyan to-violet text-slate-950 shadow-[0_0_30px_-8px] shadow-cyan/60 hover:shadow-cyan/90`
const btnGhost = `${btn} glass text-ink hover:border-white/25 hover:bg-white/10`
// Pasek i menu: ciemne tło (a nie .glass), żeby tekst był czytelny także nad jasnymi elementami strony
const headerBg = 'border border-white/10 bg-bg/80 backdrop-blur-xl'

/** Kolejność sekcji na stronie: z niej biorą się linki w menu i numery „01 —” nad nagłówkami. */
const sections = ['about', 'projects', 'skills', 'achievements', 'contact'] as const
type SectionId = (typeof sections)[number]

function Section({ id, kicker, title, children }: { id: SectionId; kicker: string; title: string; children: ReactNode }) {
  const n = String(sections.indexOf(id) + 1).padStart(2, '0')
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="reveal mb-12">
        <p className="mb-3 font-mono text-xs tracking-widest text-cyan uppercase">
          {n} — {kicker}
        </p>
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300">
      {children}
    </span>
  )
}

function ProjectCard({ p, labels }: { p: Project; labels: { code: string; details: string } }) {
  return (
    <article {...tilt} className="card glass group reveal flex flex-col overflow-hidden rounded-2xl">
      <div className="aspect-[40/21] overflow-hidden border-b border-white/8">
        <ProjectArt art={p.art} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold">{p.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2">
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noreferrer" className={`${btnGhost} px-4 py-2`}>
              <GitHubIcon className="size-4" /> {labels.code}
            </a>
          )}
          {p.details && (
            <a href={p.details} target="_blank" rel="noreferrer" className={`${btnGhost} px-4 py-2`}>
              {labels.details} <ArrowUpRight className="size-4" />
            </a>
          )}
          {p.note && <span className="font-mono text-xs text-muted">// {p.note}</span>}
        </div>
      </div>
    </article>
  )
}

function Timeline({ items }: { items: { period: string; title: string; place?: string; text?: string }[] }) {
  return (
    <ol className="relative ml-2 space-y-8 border-l border-white/10 pl-6">
      {items.map((it) => (
        <li key={it.title} className="reveal relative">
          <span className="absolute top-1.5 -left-[29.5px] size-2.5 rounded-full bg-gradient-to-br from-cyan to-violet ring-4 ring-bg" />
          <p className="font-mono text-xs text-cyan">{it.period}</p>
          <h4 className="mt-1 font-display font-semibold">{it.title}</h4>
          {it.place && <p className="text-sm text-slate-300">{it.place}</p>}
          {it.text && <p className="mt-1 text-sm text-muted">{it.text}</p>}
        </li>
      ))}
    </ol>
  )
}

/* ---------- strona ---------- */

function initialLang(): Lang {
  const saved = localStorage.getItem('lang')
  if (saved === 'pl' || saved === 'en') return saved
  return navigator.language.startsWith('pl') ? 'pl' : 'en'
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  const t = content[lang]

  usePointerGlow()
  useReveal(lang)

  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('lang', lang)
  }, [lang])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = sections.map((id) => [`#${id}`, t.nav[id]])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(links.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const socials = [
    { href: links.github, label: 'GitHub', icon: <GitHubIcon /> },
    { href: links.linkedin, label: 'LinkedIn', icon: <LinkedInIcon /> },
    { href: `mailto:${links.email}`, label: 'Email', icon: <Mail className="size-5" /> },
  ]

  return (
    <>
      {/* Tło: warstwa z-0 (kolejność w DOM: poświata → siatka → scena), treść ma z-10.
          h-lvh = wysokość ekranu ze schowanym paskiem adresu — tło nie „doskakuje” przy scrollu na telefonie. */}
      <div aria-hidden className="spotlight pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh" />
      <div aria-hidden className="grid-bg pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh" />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      {/* ---------- Header ---------- */}
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled || menuOpen ? `${headerBg} shadow-lg shadow-black/30` : 'border border-transparent'
          }`}
        >
          <a href="#top" className="font-mono text-lg font-medium tracking-tight" aria-label="Michał Wiśniewski">
            <span className="gradient-text">MW</span>
            <span className="text-muted">.dev</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-white/5 hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'pl' ? 'en' : 'pl')}
              className="rounded-full border border-white/10 px-2.5 py-1.5 font-mono text-xs text-muted transition hover:border-white/25 hover:text-ink"
              aria-label={lang === 'pl' ? 'Switch to English' : 'Przełącz na polski'}
            >
              {lang === 'pl' ? 'EN' : 'PL'}
            </button>
            <a href={links.cv} download className={`${btnPrimary} hidden px-4 py-2 sm:inline-flex`}>
              <Download className="size-4" /> {t.nav.cv}
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full p-2 text-ink transition hover:bg-white/10 lg:hidden"
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className={`${headerBg} mx-auto mt-2 flex max-w-6xl flex-col rounded-2xl p-2 lg:hidden`} aria-label="Mobile">
            {nav.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-ink transition hover:bg-white/10"
              >
                {label}
              </a>
            ))}
            <a href={links.cv} download className={`${btnPrimary} m-2 sm:hidden`}>
              <Download className="size-4" /> {t.nav.cv}
            </a>
          </nav>
        )}
      </header>

      <main id="top" className="relative z-10">
        {/* ---------- Hero ---------- */}
        <section className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-5 pt-24 pb-16 sm:px-8">
          <div className="max-w-2xl">
            <p className="reveal font-mono text-sm text-cyan">{t.hero.hello}</p>
            <h1 className="reveal mt-3 font-display text-5xl leading-[1.05] font-bold tracking-tight sm:text-7xl">
              Michał <span className="gradient-text">Wiśniewski</span>
            </h1>
            <p className="reveal mt-5 font-display text-xl text-slate-200 sm:text-2xl">{t.hero.role}</p>
            <p className="reveal mt-5 max-w-xl leading-relaxed text-muted">{t.hero.lead}</p>

            <div className="reveal mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={btnPrimary}>
                {t.hero.ctaProjects} <ArrowRight className="size-4" />
              </a>
              <a href="#contact" className={btnGhost}>
                {t.hero.ctaContact}
              </a>
            </div>

            <div className="reveal mt-8 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="glass rounded-full p-3 text-muted transition duration-200 hover:-translate-y-1 hover:border-cyan/50 hover:text-cyan"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <a
            href="#about"
            className={`absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-[11px] text-muted transition-all duration-300 hover:text-ink ${
              scrolled ? 'invisible opacity-0' : ''
            }`}
          >
            {t.hero.scroll}
            <ChevronDown className="size-4 motion-safe:animate-bounce" />
          </a>
        </section>

        {/* ---------- O mnie ---------- */}
        <Section id="about" kicker={t.about.kicker} title={t.about.title}>
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="reveal space-y-4 leading-relaxed text-slate-300 lg:col-span-3">
              {t.about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 lg:col-span-2">
              {t.about.facts.map((f) => (
                <div key={f.label} {...tilt} className="card glass reveal rounded-2xl p-4">
                  <p className="gradient-text font-display text-2xl font-bold">{f.value}</p>
                  <p className="mt-1 text-xs text-muted">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ---------- Projekty ---------- */}
        <Section id="projects" kicker={t.projects.kicker} title={t.projects.title}>
          <p className="reveal -mt-8 mb-10 text-muted">{t.projects.subtitle}</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.projects.items.map((p) => (
              <ProjectCard key={p.title} p={p} labels={t.projects} />
            ))}
          </div>
        </Section>

        {/* ---------- Umiejętności ---------- */}
        <Section id="skills" kicker={t.skills.kicker} title={t.skills.title}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.skills.groups.map((g) => (
              <div key={g.title} {...tilt} className="card glass reveal rounded-2xl p-5">
                <h3 className="mb-4 font-display font-semibold">{g.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- Wykształcenie & Osiągnięcia ---------- */}
        <Section id="achievements" kicker={t.timeline.kicker} title={t.timeline.title}>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="reveal mb-6 flex items-center gap-2 font-display text-lg font-semibold">
                <GraduationCap className="size-5 text-cyan" /> {t.timeline.education}
              </h3>
              <Timeline items={t.timeline.educationItems} />
            </div>
            <div>
              <h3 className="reveal mb-6 flex items-center gap-2 font-display text-lg font-semibold">
                <Trophy className="size-5 text-cyan" /> {t.timeline.achievements}
              </h3>
              <Timeline items={t.timeline.achievementItems} />
            </div>
          </div>
        </Section>

        {/* ---------- Kontakt ---------- */}
        <Section id="contact" kicker={t.contact.kicker} title={t.contact.title}>
          <div className="glass reveal rounded-3xl p-6 sm:p-10">
            <p className="max-w-xl leading-relaxed text-slate-300">{t.contact.text}</p>
            <p className="mt-6 font-mono text-sm break-all text-cyan sm:text-base">{links.email}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${links.email}`} className={btnPrimary}>
                <Mail className="size-4" /> {t.contact.mail}
              </a>
              <button onClick={copyEmail} className={btnGhost}>
                {copied ? <Check className="size-4 text-cyan" /> : <Copy className="size-4" />}
                <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
              </button>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className={btnGhost}>
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" className={btnGhost}>
                <GitHubIcon className="size-4" /> GitHub
              </a>
            </div>
          </div>
        </Section>
      </main>

      {/* Powrót na górę: odwrotność przycisku „przewiń” — widoczny tylko po rozpoczęciu przewijania.
          scrollTo bez `behavior` używa CSS scroll-behavior, więc respektuje prefers-reduced-motion. */}
      <button
        onClick={() => window.scrollTo({ top: 0 })}
        aria-label={t.toTop}
        title={t.toTop}
        className={`glass fixed right-5 bottom-5 z-40 rounded-full p-3 text-muted shadow-lg shadow-black/30 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:text-cyan sm:right-8 sm:bottom-8 ${
          scrolled ? '' : 'invisible translate-y-2 opacity-0'
        }`}
      >
        <ChevronUp className="size-5" />
      </button>

      <footer className="relative z-10 border-t border-white/8 px-5 py-8 text-center text-xs text-muted">
        <p>© {year} Michał Wiśniewski</p>
        <p className="mt-1">{t.footer}</p>
      </footer>
    </>
  )
}
