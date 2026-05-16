import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ArrowLeft, ArrowUpRight, Download, Mail, AlertTriangle, Camera,
  Layers, Database, Shield, XCircle, CheckCircle2,
  TrendingUp, Workflow, GraduationCap, Network, Quote, Sparkles,
  MessageSquare, FileText, Briefcase,
  Lightbulb, ListChecks, Search, Palette, Rocket,
  Lock, Bot, ShieldCheck, Clock,
} from "lucide-react";

/* ─── Page registry ───────────────────────────────────────────────────── */

const NAV_SECTIONS = [
  { label: "01", title: "The Problem",     pageIndex: 2 },
  { label: "02", title: "Deployability",   pageIndex: 4 },
  { label: "03", title: "Readiness",       pageIndex: 6 },
  { label: "04", title: "Three Lenses",    pageIndex: 9 },
  { label: "05", title: "Five Questions",  pageIndex: 14 },
  { label: "06", title: "Outlook",         pageIndex: 16 },
];

/* ─── Animation primitives ────────────────────────────────────────────── */

const variants = {
  enter:  (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: () => ({ opacity: 1, x: 0 }),
  exit:   (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

const transition = { duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

/* ─── Layout primitives ───────────────────────────────────────────────── */

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-y-auto overflow-x-hidden bg-background text-foreground">
      <BackdropAtmosphere />
      <div className="relative flex-1 flex flex-col">{children}</div>
    </div>
  );
}

function BackdropAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-primary/[0.04] blur-3xl" />
      <div className="absolute -bottom-48 -left-40 h-[28rem] w-[28rem] rounded-full bg-primary/[0.025] blur-3xl" />
    </div>
  );
}

function ChapterTag({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-[0.22em] uppercase ${accent ? "bg-primary/10 text-primary border border-primary/30" : "bg-secondary text-secondary-foreground border border-secondary-border"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {label}
    </div>
  );
}

function StatCard({ value, label, source, sourceHref, delay = 0 }: { value: string; label: string; source: string; sourceHref?: string; delay?: number }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden p-7 md:p-8 rounded-2xl bg-card border border-card-border transition-all hover:border-primary/40 flex flex-col h-full"
    >
      <div className="relative text-6xl md:text-7xl lg:text-8xl font-display font-bold text-primary mb-5 tracking-tighter leading-[0.85]">
        {value}
      </div>
      <p className="relative text-foreground font-normal text-base md:text-lg mb-8 flex-grow leading-snug">{label}</p>
      <div className="relative text-[10px] uppercase tracking-[0.22em] mt-auto border-t border-card-border pt-4">
        <SourceLink href={sourceHref} label={source} />
      </div>
    </motion.div>
  );
}

function SourceLink({ href, label, className = "" }: { href?: string; label: string; className?: string }) {
  if (!href) {
    return <span className={`text-muted-foreground ${className}`}>{label}</span>;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors underline decoration-dotted decoration-muted-foreground/30 underline-offset-4 hover:decoration-primary/60 ${className}`}
    >
      {label}
      <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden />
    </a>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <motion.figure {...fadeUp(0.2)} className="relative max-w-3xl">
      <Quote className="absolute -top-4 -left-2 h-10 w-10 text-primary/30" aria-hidden />
      <blockquote className="relative pl-10 text-2xl md:text-3xl font-display font-medium leading-snug">
        {children}
      </blockquote>
    </motion.figure>
  );
}

function ChapterDivider({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <PageShell>
      <div className="flex-1 flex items-center px-4 pt-28 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-24 -left-4 md:-left-8 text-[22rem] md:text-[32rem] lg:text-[40rem] font-display font-bold leading-none tracking-tighter text-primary/[0.06] select-none pointer-events-none">
              {number}
            </div>
            <div className="relative">
              <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-primary mb-6">
                Chapter — {number}
              </p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.0] mb-8 max-w-5xl">
                {title}
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                {subtitle}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

/* ─── Pages ──────────────────────────────────────────────────────────── */

function HeroPage() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-5xl relative">
          <motion.div {...fadeUp(0)}>
            <ChapterTag label="Executive Insights Forum / 21 May 2026" accent />
          </motion.div>
          <motion.h1
            {...fadeUp(0.08)}
            className="text-6xl md:text-8xl lg:text-[9.5rem] font-display font-bold tracking-tighter leading-[0.95] mt-8 mb-8"
          >
            The March<br />of <span className="relative inline-block text-primary">
              AI
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/40" aria-hidden />
            </span>.
          </motion.h1>
          <motion.p
            {...fadeUp(0.16)}
            className="text-xl md:text-2xl text-foreground/75 max-w-3xl mb-12 leading-relaxed"
          >
            A calibration tool, not a tour. Three lenses, five questions, and one readiness gap most organisations have not closed.
          </motion.p>
          <motion.div {...fadeUp(0.24)} className="flex flex-col sm:flex-row gap-4 mb-20">
            <Button size="lg" className="text-base h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <a
                href={`${import.meta.env.BASE_URL}march-of-ai.pptx`}
                download="march-of-ai.pptx"
                data-testid="button-download"
              >
                <Download className="mr-2 h-5 w-5" /> Download Keynote Deck
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-base h-14 px-8 rounded-full border-border hover:bg-secondary" asChild>
              <a
                href="mailto:tim@wedoai.com.au?subject=March%20of%20AI%20%E2%80%93%20follow-up"
                data-testid="button-contact"
              >
                <Mail className="mr-2 h-5 w-5" /> Contact Tim Barnes
              </a>
            </Button>
          </motion.div>
          <motion.div {...fadeUp(0.3)} className="mb-20 -mt-16">
            <a
              href="https://youtu.be/86y96IIqfN8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" /> Watch presentation video
            </a>
          </motion.div>
          <motion.div {...fadeUp(0.36)} className="pt-8 border-t border-card-border flex items-baseline gap-6 flex-wrap">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-primary mb-2">Presented by</p>
              <p className="text-2xl font-display font-semibold">
                Tim Barnes
              </p>
              <p className="text-sm text-muted-foreground mt-1">AI and Automation Expert · WeDoAI</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function HowIBuiltThisPage() {
  const steps = [
    { num: "01", label: "Brainstormed", time: "30 min", icon: Lightbulb },
    { num: "02", label: "Structured",   time: "15 min", icon: ListChecks },
    { num: "03", label: "Researched",   time: "10 min", icon: Search },
    { num: "04", label: "Designed",     time: "1 hour", icon: Palette },
    { num: "05", label: "Shipped",      time: "30 min", icon: Rocket },
  ];
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-12 max-w-3xl">
            <ChapterTag label="Meta / Behind this talk" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-4 tracking-tight leading-[1.05]">
              How I built this.
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Me, my phone, and a handful of AI agents. <span className="text-foreground font-medium">~2.5 hours.</span>
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-10">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                {...fadeUp(0.08 * i)}
                whileHover={{ y: -3 }}
                className="relative rounded-2xl bg-card border border-card-border p-5 overflow-hidden"
              >
                <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-primary/8" />
                <div className="relative">
                  <p className="text-3xl font-display font-bold text-primary/30 tracking-tighter mb-2">{s.num}</p>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                    <s.icon className="h-4 w-4" />
                  </span>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-1">{s.label}</p>
                  <p className="text-base font-semibold">{s.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.5)} className="rounded-2xl bg-card-elevated border border-primary/25 p-7 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1 bg-primary" />
            <p className="text-lg md:text-xl font-display leading-snug">
              <span className="text-primary font-semibold">Easy</span> for one person with AI agents. <span className="text-muted-foreground mx-1">/</span> <span className="text-foreground font-semibold">Hard</span> at enterprise scale. That gap is what this talk is about.
            </p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function Section01Divider() {
  return <ChapterDivider number="01" title="What is the actual problem?" subtitle="Every week someone pitches you AI. The challenge is no longer awareness. It is calibration." />;
}

function SignalPage() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-14 max-w-3xl">
            <ChapterTag label="01 / Signal vs Noise" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-6 tracking-tight leading-[1.05]">
              You are not short on AI.<br />
              <span className="text-primary">You are short on signal.</span>
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              You hear about AI from vendors, your team, your peers, your board, your kids. The capability is real. The demos are real. Most enterprise AI projects do not move the P&L. You do not need to become a technologist. You need a way to tell signal from noise.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatCard
              value="95%"
              label="of GenAI pilots fail to scale."
              source="MIT, 2025"
              sourceHref="https://nanda.media.mit.edu/"
              delay={0.1}
            />
            <StatCard
              value="42%"
              label="of companies abandoned most AI initiatives in 2025, up from 17% the year prior."
              source="S&P Global"
              sourceHref="https://www.spglobal.com/market-intelligence/en/news-insights/research/ai-experiences-rapid-adoption-but-with-mixed-outcomes-highlights-from-vote-ai-machine-learning"
              delay={0.18}
            />
            <StatCard
              value="5%"
              label="of companies achieve rapid revenue acceleration."
              source="MIT"
              sourceHref="https://nanda.media.mit.edu/"
              delay={0.26}
            />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section02Divider() {
  return <ChapterDivider number="02" title="Capability is not deployability." subtitle="A demo shows what AI can do on a clean input. Production is what AI does on your inputs, at your scale, on Tuesday." />;
}

function CapabilityGapPage() {
  const rows = [
    { num: "01", label: "Access",    icon: Lock,        demo: "Claude on my phone, no approval",         prod: "AI tools awaiting approval" },
    { num: "02", label: "Agents",    icon: Bot,         demo: "Computer use, unrestricted",              prod: "Computer use blocked by policy" },
    { num: "03", label: "Data",      icon: Database,    demo: "Pull from any source on the web",         prod: "No agent access to internal data" },
    { num: "04", label: "Approvals", icon: ShieldCheck, demo: "One decision-maker, me",                  prod: "Brand, legal, compliance gating" },
    { num: "05", label: "Time",      icon: Clock,       demo: "2.5 hours",                                prod: "Months" },
  ];
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-10 max-w-3xl">
            <ChapterTag label="02 / The gap" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-3 tracking-tight leading-[1.05]">
              The capability deployability gap.
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground">
              Same task. <span className="text-foreground font-medium">Different access.</span>
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="rounded-3xl border border-card-border bg-card overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-12 gap-0 px-5 md:px-8 py-4 bg-secondary/40 border-b border-card-border text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
              <div className="col-span-4 md:col-span-3" />
              <div className="col-span-4 md:col-span-4 lg:col-span-4 flex items-center gap-2">
                <XCircle className="h-3 w-3 text-destructive" /> The Demo
              </div>
              <div className="col-span-4 md:col-span-5 lg:col-span-5 flex items-center gap-2">
                <CheckCircle2 className="h-3 w-3 text-accent" /> In Production
              </div>
            </div>

            {rows.map((r, i) => (
              <motion.div
                key={r.num}
                {...fadeUp(0.06 + i * 0.04)}
                className={`grid grid-cols-12 gap-3 md:gap-0 px-5 md:px-8 py-5 items-center ${i < rows.length - 1 ? "border-b border-card-border" : ""}`}
              >
                <div className="col-span-12 md:col-span-3 flex items-center gap-3 mb-2 md:mb-0">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    <r.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">{r.num}</p>
                    <p className="font-display font-semibold text-base">{r.label}</p>
                  </div>
                </div>
                <div className="col-span-6 md:col-span-4 text-sm md:text-base text-muted-foreground pr-3">
                  {r.demo}
                </div>
                <div className="col-span-6 md:col-span-5 text-sm md:text-base text-foreground font-medium pl-3 md:pl-0 border-l md:border-l-0 border-border">
                  {r.prod}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="mt-8">
            <PullQuote>
              Capability is not the gap. <span className="text-primary">Access to capability</span> is.
            </PullQuote>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function Section03Divider() {
  return <ChapterDivider number="03" title="The readiness gap nobody talks about." subtitle="Before any AI proposal, your process has to be visible and measurable end-to-end. Most organisations cannot do this." />;
}

function ProcessFramePage() {
  const pillars = [
    {
      icon: Workflow,
      tag: "Process",
      title: "Visible in real time",
      body: "Not BPMN diagrams filed in your process registry. Process intelligence, seen live. Where work flows, where rework hides, what task and end-to-end handle times actually are.",
    },
    {
      icon: GraduationCap,
      tag: "People",
      title: "Educated and capable",
      body: "Not one-time training. Continuous education in what we measure, why it matters, how to read the signal.",
    },
    {
      icon: Database,
      tag: "Data",
      title: "Joined and measured",
      body: "Start centrally, governed at the asset level, aligned to the use cases that matter.",
    },
    {
      icon: Shield,
      tag: "Technology",
      title: "Integrated and safe",
      body: "Secure, governed, observable, and built to compose with what you already have.",
    },
  ];
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-12 max-w-3xl">
            <ChapterTag label="03 / The frame" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 tracking-tight leading-[1.05]">
              Process is the frame. People, data and technology make it work.
            </h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, i) => (
              <motion.div
                key={p.tag}
                {...fadeUp(0.06 * i)}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-3xl bg-card border border-card-border p-6 transition-shadow hover:shadow-md"
              >
                <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                <div className="relative">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-2">{p.tag}</p>
                  <h4 className="text-lg font-display font-semibold mb-2 leading-snug">{p.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p {...fadeUp(0.36)} className="mt-8 text-sm uppercase tracking-[0.22em] text-muted-foreground text-center">
            <Sparkles className="inline h-4 w-4 mr-2 text-accent" />
            If any of these are missing, AI runs on broken inputs.
          </motion.p>
        </div>
      </div>
    </PageShell>
  );
}

function MeasurePage() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp(0)}>
              <ChapterTag label="03 / Measurement" />
              <h3 className="text-3xl md:text-5xl font-display font-bold mt-6 mb-6 tracking-tight leading-[1.1]">
                You cannot improve what you have never measured.
              </h3>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>Most failed AI projects fail before the model runs. Someone bought AI to fix a process they did not understand. Measured against a baseline they invented retrospectively.</p>
                <p className="text-foreground font-display text-2xl border-l-4 border-accent pl-5 py-1">
                  Map the process. Measure it end-to-end. Then evaluate.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.18)} className="relative">
              <div className="relative rounded-3xl bg-card border border-card-border p-10 overflow-hidden">
                <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-primary/8 blur-2xl" />
                <p className="text-[8rem] md:text-[11rem] font-display font-bold text-primary leading-[0.85] tracking-tighter mb-4 relative">
                  70%
                </p>
                <p className="text-base md:text-lg font-medium leading-snug mb-6 relative">
                  of AI project failures trace to data and process problems, not algorithms.
                </p>
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] border-t border-border pt-4 relative flex flex-wrap items-center gap-x-2 gap-y-1">
                  <SourceLink href="https://www.gartner.com/en/newsroom/press-releases/2025-02-26-lack-of-ai-ready-data-puts-ai-projects-at-risk" label="Gartner" />
                  <span className="text-muted-foreground/40">·</span>
                  <SourceLink href="https://www.deloitte.com/us/en/services/consulting/research/state-of-generative-ai-in-enterprise.html" label="Deloitte" />
                  <span className="text-muted-foreground/40">·</span>
                  <SourceLink href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" label="McKinsey" />
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section04Divider() {
  return <ChapterDivider number="04" title="Three lenses." subtitle="Assuming readiness is in place, and assuming this problem actually needs AI: here is how to pressure-test the proposal." />;
}

function ThreeLensesOverviewPage() {
  const lenses = [
    { num: "01", icon: Network,    tag: "Connect",     title: "Roadmap Fit",         body: "Does it connect to the bigger picture, or is it another disconnected pilot?" },
    { num: "02", icon: Layers,     tag: "Compound",    title: "Knowledge Foundation", body: "Does it build a reusable foundation that other use cases can leverage, or a silo that dies?" },
    { num: "03", icon: TrendingUp, tag: "Stand alone", title: "Unit Economics",      body: "Can this proposal justify itself on its own merits, in dollars or minutes per task?" },
  ];
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-12 text-center max-w-3xl mx-auto">
            <ChapterTag label="04 / The framework" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-6 tracking-tight leading-[1.05]">
              Three lenses. <span className="text-primary">One coherent test.</span>
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {lenses.map((l, i) => (
              <motion.div
                key={l.num}
                {...fadeUp(0.08 * i)}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl bg-card border border-card-border p-7 overflow-hidden transition-shadow hover:shadow-md"
              >
                <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                <div className="relative">
                  <p className="text-7xl font-display font-bold text-primary/15 tracking-tighter leading-none mb-4">{l.num}</p>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                    <l.icon className="h-5 w-5" />
                  </span>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent mb-1">{l.tag}</p>
                  <h4 className="text-2xl font-display font-semibold mb-3">{l.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{l.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.34)} className="mt-10 text-center">
            <p className="inline-block py-3 px-6 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-secondary-border">
              All three have to be true to progress. Fail any one and the proposal isn't ready.
            </p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function Lens01Page() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-10">
            <ChapterTag label="04 / Lens 01 · Connect" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 tracking-tight leading-[1.05]">
              Lens 01. <span className="text-primary">Roadmap fit.</span>
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <motion.div {...fadeUp(0.1)} className="flex flex-col">
              <div className="rounded-3xl bg-card border border-card-border p-8 mb-6 flex-1">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-4">The question</p>
                <p className="text-xl md:text-2xl font-display font-medium leading-snug">
                  How does this connect to the bigger picture? Where else in your business could this intelligence be used?
                </p>
              </div>
              <div className="rounded-3xl bg-secondary border border-secondary-border p-6">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent mb-2">Why it matters</p>
                <p className="text-sm md:text-base leading-relaxed text-foreground/80">
                  Each AI initiative either contributes to a system that gets smarter, or it adds another disconnected pilot. <span className="text-foreground font-medium">There is no third option.</span>
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.18)} className="relative rounded-2xl bg-card-elevated border border-primary/25 p-10 overflow-hidden">
              <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-primary/[0.08] blur-3xl" />
              <p className="relative text-[9rem] md:text-[13rem] font-display font-bold text-primary leading-[0.82] tracking-tighter mb-4">
                74%
              </p>
              <p className="relative text-base md:text-lg font-medium leading-snug mb-6 text-foreground">
                of AI's economic value is captured by 20% of organisations.
              </p>
              <p className="relative text-sm text-muted-foreground mb-6">
                They tie outcomes to revenue, build governance before scaling, and treat AI as organisational redesign.
              </p>
              <p className="relative text-[10px] font-mono uppercase tracking-[0.22em] border-t border-card-border pt-4">
                <SourceLink href="https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-performance-study.html" label="PwC AI Performance Study, 2026" />
              </p>
            </motion.div>
          </div>
          <motion.div {...fadeUp(0.36)} className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-card-border bg-card p-5 flex items-start gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 text-accent shrink-0 mt-0.5">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <p className="text-sm md:text-base"><span className="font-semibold">Connected:</span> each pilot makes the next one stronger.</p>
            </div>
            <div className="rounded-2xl border border-card-border bg-card p-5 flex items-start gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-destructive/15 text-destructive shrink-0 mt-0.5">
                <XCircle className="h-4 w-4" />
              </span>
              <p className="text-sm md:text-base"><span className="font-semibold">Disconnected:</span> each pilot stands alone, then dies.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function Lens02Page() {
  const cards = [
    { icon: MessageSquare, label: "Voice",      sub: "Calls, transcripts, sentiment, intent, voice of customer" },
    { icon: FileText,      label: "Documents",  sub: "Contracts, complaints, policies, accuracy checks" },
    { icon: Briefcase,     label: "Operations", sub: "Outcomes, claims, finance, employee signals" },
  ];
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-10">
            <ChapterTag label="04 / Lens 02 · Compound" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 tracking-tight leading-[1.05]">
              Lens 02. <span className="text-primary">Knowledge foundation.</span>
            </h3>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="rounded-3xl bg-card border border-card-border p-8 mb-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-4">The question</p>
            <p className="text-xl md:text-2xl font-display font-medium leading-snug">
              Does this build a <span className="text-accent">reusable knowledge foundation</span> other use cases can leverage, or a silo that dies?
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 mb-6">
            {cards.map((c, i) => (
              <motion.div key={c.label} {...fadeUp(0.16 + i * 0.06)} className="rounded-3xl bg-card border border-card-border p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <c.icon className="h-5 w-5" />
                </span>
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-accent mb-2">{c.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.sub}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.4)} className="rounded-2xl bg-card-elevated border border-primary/25 p-7 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1 bg-primary" />
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary mb-3">Concrete example</p>
            <p className="text-lg md:text-xl font-display font-medium leading-snug">
              A <span className="text-primary">churn signal</span> lives across all three. None of them sees it alone. Combined, they unlock use cases none of them deliver alone.
            </p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function Lens03Page() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-10">
            <ChapterTag label="04 / Lens 03 · Stand alone" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 tracking-tight leading-[1.05]">
              Lens 03. <span className="text-primary">Unit economics.</span>
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <motion.div {...fadeUp(0.1)} className="rounded-3xl bg-card border border-card-border p-8">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-4">The question</p>
              <p className="text-xl md:text-2xl font-display font-medium leading-snug">
                Can you name what this changes per task, per transaction, per decision, in dollars or minutes? <span className="text-accent">A number, not an adjective.</span>
              </p>

              {/* $ per task today/after viz */}
              <div className="mt-7 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-secondary border border-secondary-border p-5 text-center">
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-2">Today</p>
                  <p className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tighter">$15</p>
                  <p className="text-xs text-muted-foreground mt-2">per task</p>
                </div>
                <div className="rounded-2xl bg-primary/10 border border-primary/30 p-5 text-center">
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary mb-2">After</p>
                  <p className="text-4xl md:text-5xl font-display font-bold text-primary tracking-tighter">$?</p>
                  <p className="text-xs text-muted-foreground mt-2">if they can't name it, it isn't real</p>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.18)} className="rounded-3xl bg-destructive/8 border border-destructive/20 p-8">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-destructive mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" /> The trap
              </p>
              <p className="text-xl font-display font-medium mb-4">"Deflects 30% of tickets."</p>
              <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li className="flex gap-2"><span className="mt-2 h-1 w-1 rounded-full bg-destructive shrink-0" />Deflects to where?</li>
                <li className="flex gap-2"><span className="mt-2 h-1 w-1 rounded-full bg-destructive shrink-0" />Remaining tickets are harder.</li>
                <li className="flex gap-2"><span className="mt-2 h-1 w-1 rounded-full bg-destructive shrink-0" />Agents get slower.</li>
                <li className="flex gap-2"><span className="mt-2 h-1 w-1 rounded-full bg-destructive shrink-0" />Easy questions that built morale are gone.</li>
                <li className="flex gap-2"><span className="mt-2 h-1 w-1 rounded-full bg-destructive shrink-0" />CSAT drops. The unit might be net negative.</li>
              </ul>
            </motion.div>
          </div>
          <motion.div {...fadeUp(0.32)} className="rounded-2xl bg-card-elevated border border-primary/25 p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1 bg-primary" />
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary mb-3">Why it cuts through hype</p>
            <p className="text-xl md:text-2xl font-display font-medium leading-snug">
              Most pitches describe capability without committing to a unit. Forcing a unit <span className="text-primary">kills most bad proposals</span> before they leave the room.
            </p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function Section05Divider() {
  return <ChapterDivider number="05" title="Five questions to ask on Monday." subtitle="Real questions, not rhetorical ones." />;
}

function FiveQuestionsPage() {
  const questions = [
    { title: "Process",         q: "Do we understand our end-to-end process?" },
    { title: "Problem fit",     q: "What specific problem are we solving, who notices when it is solved, and could we solve it without AI?" },
    { title: "Bigger picture",  q: "How does this connect to the bigger picture and the other things we are building?" },
    { title: "Foundation",      q: "Does this build reusable capability that other use cases can leverage, or is it a silo?" },
    { title: "Unit economics",  q: "What is the cost or value per transaction today, in dollars, and what does it become after?" },
  ];
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-5xl">
          <motion.div {...fadeUp(0)} className="mb-12">
            <ChapterTag label="05 / Application" accent />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-4 tracking-tight leading-[1.05]">
              Five questions for Monday.
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed flex items-center gap-3">
              <Camera className="h-5 w-5 text-primary shrink-0" />
              Start with question 1. Map one end-to-end process before you ask the others. Photograph this slide.
            </p>
          </motion.div>
          <div className="grid gap-4">
            {questions.map((q, i) => (
              <motion.div
                key={q.title}
                {...fadeUp(0.06 * i)}
                whileHover={{ x: 6, borderColor: "hsl(var(--primary) / 0.4)" }}
                className="bg-card border border-card-border p-5 md:p-6 rounded-2xl flex items-center gap-5 transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground font-display font-bold text-xl shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary mb-1">{q.title}</p>
                  <p className="text-lg md:text-xl font-medium leading-snug text-foreground">{q.q}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section06Divider() {
  return <ChapterDivider number="06" title="Where this is heading." subtitle="Three observations. Grounded, not speculative." />;
}

function ThreeObservationsPage() {
  const items = [
    {
      num: "01",
      title: "Transformative change is real. Readiness decides who benefits.",
      body: "Organisations with process clarity, data foundations, and educated teams are seeing meaningful returns. Those without are stalling. 79% of organisations report AI adoption challenges. 54% of C-suite say it is tearing the company apart.",
    },
    {
      num: "02",
      title: "Capability isn't the constraint. Deployment is.",
      body: "Models that do the work already exist. The gap is access, governance, integration, and a process worth measuring. These are leadership choices. The capability is the easy part.",
    },
    {
      num: "03",
      title: "Continuous education is the differentiator.",
      body: "The biggest barrier to AI integration is workforce capability. Not a one-off programme. Continuous, job-specific education is what separates the 20% capturing 74% of the value from everyone else.",
    },
  ];
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-12">
            <ChapterTag label="06 / Outlook" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-4 tracking-tight leading-[1.05]">
              Three things I think are true.
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {items.map((it, i) => (
              <motion.div
                key={it.num}
                {...fadeUp(0.08 * i)}
                className="rounded-3xl border border-border bg-card p-7 h-full"
              >
                <p className="text-6xl font-display font-bold text-primary/15 tracking-tighter leading-none mb-4">{it.num}</p>
                <h4 className="text-xl font-display font-semibold mb-3 leading-snug">{it.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.body}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.32)} className="rounded-2xl bg-card-elevated border border-primary/30 p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-primary/[0.08] blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-primary/[0.06] blur-3xl" />
            <p className="relative text-[10px] font-mono uppercase tracking-[0.32em] text-primary mb-5">The kicker</p>
            <p className="relative text-2xl md:text-4xl lg:text-5xl font-display font-semibold leading-[1.1] max-w-4xl mx-auto tracking-tight">
              The first organisation in your industry to fix the foundations <span className="text-primary">wins</span>. The second <span className="text-foreground/70">struggles</span>. The third <span className="text-muted-foreground">gets acquired</span>.
            </p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell>
      <div className="flex-1 flex items-center justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div {...fadeUp(0)}>
            <div className="mb-8 flex justify-center">
              <Logo size="hero" />
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tighter leading-[0.95]">
              Questions.
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10">
              Tim Barnes <span className="mx-2 text-border">|</span> AI and Automation Expert
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="rounded-full px-8 h-12 w-full sm:w-auto" asChild>
                <a
                  href="mailto:tim@wedoai.com.au?subject=March%20of%20AI%20%E2%80%93%20follow-up"
                  data-testid="button-contact-cta"
                >
                  <Mail className="mr-2 h-4 w-4" /> Contact Tim Barnes
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 w-full sm:w-auto" asChild>
                <a href="https://wedoai.com.au" target="_blank" rel="noopener noreferrer" data-testid="link-wedoai">
                  wedoai.com.au <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground border-t border-border pt-8 uppercase tracking-[0.22em]">
              © 2026 WeDo AI
            </p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

const PAGE_COMPONENTS = [
  HeroPage,                  // 0
  HowIBuiltThisPage,         // 1
  Section01Divider,          // 2
  SignalPage,                // 3
  Section02Divider,          // 4
  CapabilityGapPage,         // 5
  Section03Divider,          // 6
  ProcessFramePage,          // 7
  MeasurePage,               // 8
  Section04Divider,          // 9
  ThreeLensesOverviewPage,   // 10
  Lens01Page,                // 11
  Lens02Page,                // 12
  Lens03Page,                // 13
  Section05Divider,          // 14
  FiveQuestionsPage,         // 15
  Section06Divider,          // 16
  ThreeObservationsPage,     // 17
  ContactPage,               // 18
];

/* ─── Root ─────────────────────────────────────────────────────────── */

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= PAGE_COMPONENTS.length) return;
    setDirection(idx > currentPage ? 1 : -1);
    setCurrentPage(idx);
  }, [currentPage]);

  const goNext = useCallback(() => goTo(currentPage + 1), [currentPage, goTo]);
  const goBack = useCallback(() => goTo(currentPage - 1), [currentPage, goTo]);

  const PageComponent = PAGE_COMPONENTS[currentPage];
  const isFirst = currentPage === 0;
  const isLast  = currentPage === PAGE_COMPONENTS.length - 1;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar currentPage={currentPage} onNavigate={goTo} navSections={NAV_SECTIONS} totalPages={PAGE_COMPONENTS.length} />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="min-h-screen"
        >
          <PageComponent />
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-6xl gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={goBack}
            disabled={isFirst}
            className="rounded-full px-5 gap-2 disabled:opacity-30 shrink-0"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1" data-testid="page-indicator">
            {PAGE_COMPONENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                data-testid={`dot-page-${i}`}
                className={[
                  "rounded-full transition-all duration-200 focus:outline-none shrink-0",
                  i === currentPage
                    ? "w-5 h-2 bg-primary"
                    : "w-2 h-2 bg-border hover:bg-muted-foreground/50"
                ].join(" ")}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <Button
            size="sm"
            onClick={goNext}
            disabled={isLast}
            className="rounded-full px-5 gap-2 disabled:opacity-30 shrink-0"
            data-testid="button-next"
          >
            <span className="hidden sm:inline">Next</span> <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
