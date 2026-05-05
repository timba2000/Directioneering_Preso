import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useBrand } from "@/lib/brand";
import {
  ArrowRight, ArrowLeft, Download, Mail, AlertTriangle, Camera,
  Layers, Database, Shield, Zap, XCircle, CheckCircle2,
  TrendingUp, Workflow, GraduationCap, Network, Quote, Sparkles,
  MessageSquare, FileText, Briefcase, Phone, Building2, FileBadge,
} from "lucide-react";

/* ─── Page registry ───────────────────────────────────────────────────── */

const NAV_SECTIONS = [
  { label: "01", title: "The Problem",    pageIndex: 1 },
  { label: "02", title: "Deployability",  pageIndex: 3 },
  { label: "03", title: "Prerequisite",   pageIndex: 7 },
  { label: "04", title: "Three Lenses",   pageIndex: 12 },
  { label: "05", title: "Five Questions", pageIndex: 17 },
  { label: "06", title: "Outlook",        pageIndex: 19 },
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

function PageShell({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`relative min-h-screen flex flex-col overflow-y-auto overflow-x-hidden ${dark ? "bg-primary text-primary-foreground" : "bg-background text-foreground"}`}>
      <BackdropOrbs dark={dark} />
      <div className="relative flex-1 flex flex-col">{children}</div>
    </div>
  );
}

function BackdropOrbs({ dark = false }: { dark?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full blur-3xl ${dark ? "bg-primary-foreground/10" : "bg-primary/10"}`} />
      <div className={`absolute -bottom-40 -left-32 h-[24rem] w-[24rem] rounded-full blur-3xl ${dark ? "bg-accent/15" : "bg-accent/8"}`} />
      <div className="absolute inset-0 opacity-[0.025] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:22px_22px]" />
    </div>
  );
}

function ChapterTag({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase ${accent ? "bg-accent/10 text-accent border border-accent/30" : "bg-secondary text-secondary-foreground border border-secondary-border"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {label}
    </div>
  );
}

function StatCard({ value, label, source, delay = 0 }: { value: string; label: string; source: string; delay?: number }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden p-7 md:p-8 rounded-3xl bg-card border border-card-border shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
    >
      <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
      <div className="relative text-5xl md:text-6xl lg:text-7xl font-display font-bold text-primary mb-4 tracking-tighter leading-none">
        {value}
      </div>
      <p className="relative text-foreground font-medium text-base md:text-lg mb-6 flex-grow leading-snug">{label}</p>
      <div className="relative text-[10px] text-muted-foreground uppercase tracking-[0.18em] mt-auto border-t border-border pt-4">
        {source}
      </div>
    </motion.div>
  );
}

function SoloStat({ value, label, source }: { value: string; label: string; source: string }) {
  return (
    <motion.div {...fadeUp(0.1)} className="relative">
      <div className="relative text-[10rem] md:text-[14rem] lg:text-[18rem] font-display font-bold text-primary tracking-tighter leading-[0.8] mb-6">
        {value}
        <span className="absolute -top-4 right-0 h-3 w-3 rounded-full bg-accent" />
      </div>
      <p className="text-2xl md:text-3xl font-display max-w-2xl leading-snug">{label}</p>
      <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mt-6">{source}</p>
    </motion.div>
  );
}

function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <motion.figure {...fadeUp(0.2)} className="relative max-w-3xl">
      <Quote className="absolute -top-4 -left-2 h-10 w-10 text-accent/30" aria-hidden />
      <blockquote className="relative pl-10 text-2xl md:text-3xl font-display font-medium leading-snug">
        {children}
      </blockquote>
    </motion.figure>
  );
}

function ChapterDivider({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <PageShell dark>
      <div className="flex-1 flex items-center px-4 pt-28 pb-24">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-20 -left-4 md:-left-8 text-[18rem] md:text-[28rem] lg:text-[34rem] font-display font-bold leading-none tracking-tighter text-primary-foreground/5 select-none pointer-events-none">
              {number}
            </div>
            <div className="relative">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-primary-foreground/60 mb-6">
                Chapter {number}
              </p>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.02] mb-8 max-w-5xl">
                {title}
              </h2>
              <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl leading-relaxed">
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
  const brand = useBrand();
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-5xl relative">
          <motion.div {...fadeUp(0)}>
            <ChapterTag label="Executive Insights Forum / 21 May 2026" accent />
          </motion.div>
          <motion.h1
            {...fadeUp(0.08)}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter leading-[1.0] mt-8 mb-6"
          >
            The March<br />of <span className="text-primary">AI</span>.
          </motion.h1>
          <motion.p
            {...fadeUp(0.16)}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10 leading-relaxed"
          >
            A calibration tool, not a tour. Three lenses, five questions, and one prerequisite most organisations do not have.
          </motion.p>
          <motion.div {...fadeUp(0.24)} className="flex flex-col sm:flex-row gap-4 mb-20">
            <Button size="lg" className="text-base h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-download">
              <Download className="mr-2 h-5 w-5" /> Download Keynote Deck
            </Button>
            <Button size="lg" variant="outline" className="text-base h-14 px-8 rounded-full border-border hover:bg-secondary" data-testid="button-contact">
              <Mail className="mr-2 h-5 w-5" /> {brand.contactCtaLabel}
            </Button>
          </motion.div>
          <motion.div {...fadeUp(0.36)} className="pt-8 border-t border-border">
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">Presented by</p>
            <p className="text-2xl font-display font-semibold">
              {brand.presenter.name} <span className="text-muted-foreground font-normal text-base ml-2">{brand.presenter.role}</span>
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
            <StatCard value="95%" label="of GenAI pilots fail to scale." source="MIT, 2025" delay={0.1} />
            <StatCard value="42%" label="of companies abandoned most AI initiatives in 2025, up from 17% the year prior." source="S&P Global" delay={0.18} />
            <StatCard value="5%"  label="achieve rapid revenue acceleration from AI investments." source="MIT" delay={0.26} />
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
  const demo = ["Clean two-page sample", "Curated test data", "No edge cases", "No regulatory tail", "Looks magical"];
  const prod = ["200-page contract with footnotes", "Real customer data, messy and joined", "Edge cases drive 30% of the value", "Regulator may be reading it", "10x to 100x harder than the demo"];
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-12 max-w-3xl">
            <ChapterTag label="02 / The Gap" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-4 tracking-tight leading-[1.05]">
              The capability deployability gap.
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <motion.div {...fadeUp(0.1)} className="bg-card border border-card-border rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-10 w-10 rounded-full bg-destructive/10 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-destructive" />
                </span>
                <h4 className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">The Demo</h4>
              </div>
              <ul className="space-y-3">
                {demo.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-lg">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />{d}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.18)} className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <span className="h-10 w-10 rounded-full bg-primary-foreground/15 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </span>
                <h4 className="text-xs font-mono uppercase tracking-[0.22em] text-primary-foreground/70">In Production</h4>
              </div>
              <ul className="space-y-3">
                {prod.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-lg">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <PullQuote>"Money disappears in the gap. So do executive careers."</PullQuote>
        </div>
      </div>
    </PageShell>
  );
}

function PilotsStallPage() {
  return (
    <PageShell>
      <div className="flex-1 flex items-center justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-5xl">
          <motion.div {...fadeUp(0)} className="mb-10">
            <ChapterTag label="02 / Why pilots stall" />
            <h3 className="text-3xl md:text-5xl font-display font-bold mt-6 tracking-tight leading-[1.1] max-w-3xl">
              Why pilots stall before they reach production.
            </h3>
          </motion.div>
          <SoloStat
            value="31%"
            label="of AI use cases reach full production. Demo environments use clean data, predictable inputs, and forgiving users. Production rewards none of that."
            source="Acrosolve, 2026"
          />
        </div>
      </div>
    </PageShell>
  );
}

function DeployablePage() {
  const chatbot = ["Q&A in isolation", "Answers a single question", "No memory of context", "Cannot take action", "User does the integration"];
  const agents  = ["Outcome delivered", "Plans the work", "Holds context across steps", "Executes, checks, retries", "Returns a finished result"];
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-10 max-w-3xl">
            <ChapterTag label="02 / Deployable" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 tracking-tight leading-[1.05]">
              What deployable looks like.
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden">
            <motion.div {...fadeUp(0.1)} className="bg-background p-8 md:p-12">
              <h5 className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground mb-6">Traditional Chatbot</h5>
              <ul className="space-y-5">
                {chatbot.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-foreground/80 text-lg">
                    <XCircle className="text-muted-foreground w-5 h-5 shrink-0" /> {c}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeUp(0.18)} className="bg-card p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 bg-primary/5 rounded-full blur-2xl" aria-hidden />
              <h5 className="text-xs font-mono uppercase tracking-[0.22em] text-primary mb-6">Agents Working Together</h5>
              <ul className="space-y-5">
                {agents.map((a) => (
                  <li key={a} className="flex items-center gap-3 font-medium text-lg">
                    <Zap className="text-accent w-5 h-5 shrink-0" /> {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.p {...fadeUp(0.28)} className="mt-8 text-sm uppercase tracking-[0.22em] text-muted-foreground text-center">
            <Sparkles className="inline h-4 w-4 mr-2 text-accent" />
            Live side-by-side demonstration triggers here
          </motion.p>
        </div>
      </div>
    </PageShell>
  );
}

function Section03Divider() {
  return <ChapterDivider number="03" title="The prerequisite nobody talks about." subtitle="Before you can evaluate any AI proposal, you need to understand your process as a system." />;
}

function ProcessFramePage() {
  const pillars = [
    { icon: Workflow,        tag: "Process",    title: "How value flows", body: "How value flows through your organisation, end to end. The frame inside which everything else sits." },
    { icon: GraduationCap,   tag: "People",     title: "Educated and capable", body: "Continuous education in what we measure, why it matters, how to read the signal. Not one-time training." },
    { icon: Database,        tag: "Data",       title: "Joined and measured", body: "Available across silos, governed at the asset level, aligned to the use cases that matter." },
    { icon: Shield,          tag: "Technology", title: "Integrated and safe", body: "Secure, governed, observable, and built to compose with what you already have." },
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
              <motion.div key={p.tag} {...fadeUp(0.06 * i)} whileHover={{ y: -4 }} className="group relative overflow-hidden rounded-3xl bg-card border border-card-border p-6 transition-shadow hover:shadow-md">
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
                  Map the process. Measure it. Then evaluate.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.18)} className="relative">
              <div className="relative rounded-3xl bg-card border border-card-border p-10 overflow-hidden">
                <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-primary/8 blur-2xl" />
                <p className="text-[8rem] md:text-[11rem] font-display font-bold text-primary leading-[0.85] tracking-tighter mb-4">
                  70%
                </p>
                <p className="text-base md:text-lg font-medium leading-snug mb-6">
                  of AI project failures trace to data and process problems, not algorithms.
                </p>
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground border-t border-border pt-4">
                  Gartner / Deloitte / McKinsey
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function SiloPage() {
  const sources = [
    { icon: Phone,    label: "Contact Centre", sub: "Calls, transcripts, sentiment" },
    { icon: Building2,label: "CRM",            sub: "Customer demographics and history" },
    { icon: FileBadge,label: "Claims",         sub: "Outcomes and resolution data" },
  ];
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-10 max-w-3xl">
            <ChapterTag label="03 / Joining the silos" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 tracking-tight leading-[1.05]">
              AI on a silo gives you a faster silo.
            </h3>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-5 mb-8">
            {sources.map((s, i) => (
              <motion.div key={s.label} {...fadeUp(0.08 * i)} className="rounded-3xl bg-card border border-card-border p-6 flex items-center gap-4">
                <span className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-1">Source</p>
                  <p className="font-display text-lg font-semibold leading-tight">{s.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.3)} className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Network className="h-7 w-7 text-accent mb-3" />
              <p className="text-2xl md:text-3xl font-display font-semibold mb-2 leading-snug">"Why are these customers calling?"</p>
              <p className="text-primary-foreground/80 text-base leading-relaxed">
                Needs contact centre + CRM + claims, joined and consented. The vendor demos on one. The answer requires all three. You almost certainly do not have them joined.
              </p>
            </div>
            <div className="rounded-2xl bg-primary-foreground/10 p-6 backdrop-blur">
              <p className="text-5xl md:text-6xl font-display font-bold text-accent tracking-tighter mb-2">60%</p>
              <p className="text-sm leading-snug">of AI projects without AI-ready data are abandoned.</p>
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary-foreground/60 mt-3">Gartner, through 2026</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function PeoplePage() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div {...fadeUp(0)} className="mb-12 max-w-3xl">
            <ChapterTag label="03 / People" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-6 tracking-tight leading-[1.05]">
              People are not a project plan tick-box.
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>The biggest barrier to AI integration is not technology. It is workforce capability.</p>
              <p>Education is not onboarding. It is ongoing. Teams need to understand what we measure, why it matters, and how to interpret what the data is telling us. Skills shift. So does the curriculum.</p>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatCard value="59%" label="report an AI skills gap, despite 82% providing some training." source="DataCamp 2026" delay={0.1} />
            <StatCard value="26%" label="of workers report being trained on how to collaborate with AI." source="Accenture" delay={0.18} />
            <StatCard value="56%" label="of the global workforce received no recent training." source="Manpower 2026" delay={0.26} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section04Divider() {
  return <ChapterDivider number="04" title="Three lenses." subtitle="Assuming readiness is in place, here is how to pressure-test any specific AI proposal." />;
}

function ThreeLensesOverviewPage() {
  const lenses = [
    { num: "01", icon: TrendingUp, tag: "Stand alone", title: "Unit Economics",         body: "Can this proposal justify itself on its own merits, in dollars or minutes per task?" },
    { num: "02", icon: Layers,     tag: "Compound",    title: "Knowledge Foundation",   body: "Does it build a reusable foundation that other use cases can leverage, or a silo that dies?" },
    { num: "03", icon: Network,    tag: "Connect",     title: "Roadmap Fit",            body: "Does it connect to the bigger picture, or is it another disconnected pilot?" },
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
              <motion.div key={l.num} {...fadeUp(0.08 * i)} whileHover={{ y: -4 }} className="group relative rounded-3xl bg-card border border-card-border p-7 overflow-hidden transition-shadow hover:shadow-md">
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
              Pass all three: probably real. Fail any one: probably not ready.
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
            <ChapterTag label="04 / Lens 01" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 tracking-tight leading-[1.05]">
              Lens 01. <span className="text-primary">Unit economics.</span>
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <motion.div {...fadeUp(0.1)} className="rounded-3xl bg-card border border-card-border p-8">
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-4">The question</p>
              <p className="text-xl md:text-2xl font-display font-medium leading-snug">
                Can you name what this changes per task, per transaction, per decision, in dollars or minutes? <span className="text-accent">A number, not an adjective.</span>
              </p>
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
          <motion.div {...fadeUp(0.28)} className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-10">
            <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary-foreground/60 mb-3">Why it cuts through hype</p>
            <p className="text-xl md:text-2xl font-display font-medium leading-snug">
              Most pitches describe capability without committing to a unit. Forcing a unit kills <span className="text-accent">60% of bad proposals</span> before they leave the room.
            </p>
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
            <ChapterTag label="04 / Lens 02" />
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
          <motion.p {...fadeUp(0.4)} className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-3xl">
            Combined, they unlock use cases none of them deliver alone. Voice plus documents plus operations is product, QA, compliance, sentiment, regulatory insight. The pieces compound.
          </motion.p>
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
            <ChapterTag label="04 / Lens 03" />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 tracking-tight leading-[1.05]">
              Lens 03. <span className="text-primary">Roadmap fit.</span>
            </h3>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div {...fadeUp(0.1)}>
              <div className="rounded-3xl bg-card border border-card-border p-8 mb-6">
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-4">The question</p>
                <p className="text-xl md:text-2xl font-display font-medium leading-snug">
                  How does this connect to the bigger picture? Where else in your business could this intelligence be used?
                </p>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Each AI initiative either contributes to a system that gets smarter, or it adds another disconnected pilot. <span className="text-foreground font-medium">There is no third option.</span>
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.18)} className="relative rounded-3xl bg-primary text-primary-foreground p-10 overflow-hidden">
              <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-accent/20 blur-2xl" />
              <p className="text-[8rem] md:text-[11rem] font-display font-bold text-accent leading-[0.85] tracking-tighter mb-4 relative">
                74%
              </p>
              <p className="text-base md:text-lg font-medium leading-snug mb-6 relative">
                of AI's economic value is captured by 20% of organisations.
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary-foreground/60 border-t border-primary-foreground/20 pt-4 relative">
                PwC AI Performance Study, 2026
              </p>
              <p className="text-sm text-primary-foreground/80 mt-4 relative">
                They tie outcomes to revenue, build governance before scaling, and treat AI as organisational redesign.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section05Divider() {
  return <ChapterDivider number="05" title="Five questions to ask on Monday." subtitle="Real questions, not rhetorical ones. Photograph this slide." />;
}

function FiveQuestionsPage() {
  const questions = [
    { title: "Process",         q: "Do we understand our end-to-end process?" },
    { title: "Problem fit",     q: "What specific problem are we solving, who notices when it is solved, and could we solve it without AI?" },
    { title: "Unit economics",  q: "What is the cost or value per transaction today, in dollars, and what does it become after?" },
    { title: "Reuse",           q: "Does this build reusable capability that other use cases can leverage, or is it a silo?" },
    { title: "Bigger picture",  q: "How does this connect to the bigger picture and the other things we are building?" },
  ];
  return (
    <PageShell dark>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-5xl">
          <motion.div {...fadeUp(0)} className="mb-10">
            <ChapterTag label="05 / Application" accent />
            <h3 className="text-4xl md:text-6xl font-display font-bold mt-6 mb-4 tracking-tight leading-[1.05]">
              Five questions for Monday.
            </h3>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed flex items-center gap-3">
              <Camera className="h-5 w-5 text-accent shrink-0" />
              Each question has put real proposals on real desks back into proportion.
            </p>
          </motion.div>
          <div className="grid gap-4">
            {questions.map((q, i) => (
              <motion.div key={q.title} {...fadeUp(0.06 * i)} whileHover={{ x: 6 }} className="bg-background text-foreground p-5 md:p-6 rounded-2xl flex items-center gap-5 shadow-xl transition-transform">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-display font-bold text-lg shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground mb-1">{q.title}</p>
                  <p className="text-lg md:text-xl font-medium leading-snug">{q.q}</p>
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
      body: "Organisations with process clarity, data foundations, and educated teams are seeing meaningful returns. Those without are stalling.",
      stat: "79% of organisations report AI adoption challenges. 54% of C-suite say it is tearing the company apart.",
    },
    {
      num: "02",
      title: "Workforce disruption is happening. Quieter offices are not.",
      body: "Employees using AI are individually more productive, taking on broader scope, working faster, extending hours. AI does not reduce work. It intensifies it. The leadership question is whether that intensity creates value or burns the team out.",
      stat: null,
    },
    {
      num: "03",
      title: "The skills gap, not the technology, is the constraint.",
      body: "60% of AI projects without AI-ready data are abandoned. The biggest barrier to integration is workforce capability. Continuous education separates the 20% capturing 74% of the value from everyone else.",
      stat: "The winners in 2026 are treating AI as organisational redesign, not an IT project.",
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
          <div className="grid md:grid-cols-3 gap-5">
            {items.map((it, i) => (
              <motion.div key={it.num} {...fadeUp(0.08 * i)} className="rounded-3xl border border-border bg-card p-7 h-full">
                <p className="text-6xl font-display font-bold text-primary/15 tracking-tighter leading-none mb-4">{it.num}</p>
                <h4 className="text-xl font-display font-semibold mb-3 leading-snug">{it.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{it.body}</p>
                {it.stat && (
                  <p className="text-sm font-medium bg-secondary text-secondary-foreground p-4 rounded-xl border border-secondary-border leading-snug">{it.stat}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function ContactPage() {
  const brand = useBrand();
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
              {brand.presenter.name} <span className="mx-2 text-border">|</span> {brand.presenter.role}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button size="lg" className="rounded-full px-8 h-12 w-full sm:w-auto" data-testid="button-contact-cta">
                <Mail className="mr-2 h-4 w-4" /> {brand.contactCtaLabel}
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 w-full sm:w-auto" asChild>
                <a href={brand.contactHref} target="_blank" rel="noopener noreferrer" data-testid="link-brand">
                  {brand.contactDisplayUrl} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground border-t border-border pt-8 uppercase tracking-[0.22em]">
              {brand.footer}
            </p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

const PAGE_COMPONENTS = [
  HeroPage,                  // 0
  Section01Divider,          // 1
  SignalPage,                // 2
  Section02Divider,          // 3
  CapabilityGapPage,         // 4
  PilotsStallPage,           // 5
  DeployablePage,            // 6
  Section03Divider,          // 7
  ProcessFramePage,          // 8
  MeasurePage,               // 9
  SiloPage,                  // 10
  PeoplePage,                // 11
  Section04Divider,          // 12
  ThreeLensesOverviewPage,   // 13
  Lens01Page,                // 14
  Lens02Page,                // 15
  Lens03Page,                // 16
  Section05Divider,          // 17
  FiveQuestionsPage,         // 18
  Section06Divider,          // 19
  ThreeObservationsPage,     // 20
  ContactPage,               // 21
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
