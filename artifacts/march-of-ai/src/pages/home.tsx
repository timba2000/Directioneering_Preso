import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useBrand } from "@/lib/brand";
import {
  ArrowRight, ArrowLeft, Download, Mail, AlertTriangle,
  Layers, Users, Database, Shield, Zap, XCircle, CheckCircle2
} from "lucide-react";

const PAGES = [
  { id: "hero",       label: "Intro",          short: "—" },
  { id: "signal",     label: "The Problem",    short: "00" },
  { id: "s01",        label: "Calibration",    short: "01" },
  { id: "s02a",       label: "Deployability",  short: "02" },
  { id: "s02b",       label: "Deployable",     short: "02" },
  { id: "s03",        label: "Prerequisite",   short: "03" },
  { id: "s04",        label: "Three Lenses",   short: "04" },
  { id: "s05",        label: "Five Questions", short: "05" },
  { id: "s06",        label: "Outlook",        short: "06" },
  { id: "contact",    label: "Contact",        short: "—" },
];

const NAV_SECTIONS = [
  { label: "00", title: "The Problem",    pageIndex: 1 },
  { label: "01", title: "Calibration",   pageIndex: 2 },
  { label: "02", title: "Deployability", pageIndex: 3 },
  { label: "03", title: "Prerequisite",  pageIndex: 5 },
  { label: "04", title: "Three Lenses",  pageIndex: 6 },
  { label: "05", title: "Five Questions",pageIndex: 7 },
  { label: "06", title: "Outlook",       pageIndex: 8 },
];

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center:               ({ opacity: 1, x: 0 }),
  exit:  (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
};

const transition = { duration: 0.38, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-y-auto">
      {children}
    </div>
  );
}

function StatCard({ value, label, source }: { value: string; label: string; source: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 md:p-8 rounded-2xl bg-card border border-card-border shadow-sm flex flex-col h-full"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-4 tracking-tighter">
        {value}
      </div>
      <p className="text-foreground font-medium text-lg mb-4 flex-grow">{label}</p>
      <div className="text-xs text-muted-foreground uppercase tracking-widest mt-auto border-t border-border pt-4">
        {source}
      </div>
    </motion.div>
  );
}

/* ─── Individual pages ─────────────────────────────────────── */

function HeroPage() {
  const brand = useBrand();
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 border border-secondary-border">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Executive Insights Forum, 21 May 2026
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.05] mb-6"
          >
            The March of AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10 leading-relaxed"
          >
            A calibration tool, not a tour. Three lenses, five questions, and one prerequisite most organisations do not have.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <Button size="lg" className="text-base h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-download">
              <Download className="mr-2 h-5 w-5" /> Download Keynote Deck
            </Button>
            <Button size="lg" variant="outline" className="text-base h-14 px-8 rounded-full border-border hover:bg-secondary" data-testid="button-contact">
              <Mail className="mr-2 h-5 w-5" /> {brand.contactCtaLabel}
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 border-t border-border"
          >
            <p className="text-sm font-medium">Presented by</p>
            <p className="text-xl font-display font-semibold mt-1">
              {brand.presenter.name} <span className="text-muted-foreground font-normal text-base">| {brand.presenter.role}</span>
            </p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function SignalProblemPage() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="mb-12 max-w-3xl">
            <h2 className="text-accent font-mono text-sm tracking-widest uppercase mb-4">00 // The Context</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight leading-tight">
              You are not short on AI.<br />You are short on signal.
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              You hear about AI from vendors, your team, your peers, your board, your kids. The capability is real. The demos are real. Most enterprise AI projects do not move the P&L. You do not need to become a technologist. You need a way to tell signal from noise.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: "95%", label: "of GenAI pilots fail to scale.", source: "MIT, 2025", delay: 0.1 },
              { value: "42%", label: "of companies abandoned most AI initiatives in 2025, up from 17% the year prior.", source: "S&P Global", delay: 0.2 },
              { value: "5%",  label: "achieve rapid revenue acceleration from AI investments.", source: "MIT", delay: 0.3 },
            ].map((s) => (
              <motion.div key={s.value} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: s.delay }}>
                <StatCard value={s.value} label={s.label} source={s.source} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section01Page() {
  return (
    <PageShell>
      <div className="flex-1 flex items-center justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
            <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-6">01 // The Core Issue</h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8">
              What is the actual problem?
            </h3>
            <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-snug max-w-3xl mx-auto">
              Every week someone pitches you AI. The challenge is no longer awareness.{" "}
              <span className="font-semibold text-foreground underline decoration-accent decoration-4 underline-offset-8">
                It is calibration.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function Section02aPage() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="mb-10">
            <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">02 // The Gap</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight max-w-3xl">
              Capability is not deployability.
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A demo shows what AI can do on a clean input. Production is what AI does on your inputs, at your scale, on Tuesday.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transition, delay: 0.1 }}>
              <div className="bg-card p-8 rounded-2xl border border-card-border h-full">
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <XCircle className="text-destructive" /> The Demo
                </h4>
                <ul className="space-y-4">
                  {["Clean two-page sample", "Curated test data", "No edge cases", "No regulatory tail", "Looks magical"].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-lg">
                      <span className="text-muted-foreground mt-1">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transition, delay: 0.18 }}>
              <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg h-full">
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <CheckCircle2 className="text-accent" /> In Production
                </h4>
                <ul className="space-y-4">
                  {[
                    "200-page contract with footnotes",
                    "Real customer data messy and joined",
                    "Edge cases drive 30% of the value",
                    "Regulator may be reading it",
                    "10x to 100x harder than the demo",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-lg">
                      <span className="text-primary-foreground/60 mt-1">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.28 }} className="text-center">
            <p className="text-2xl md:text-3xl font-display font-medium text-foreground mb-3">
              "Money disappears in the gap. So do executive careers."
            </p>
            <p className="text-muted-foreground mb-4">Demo environments use clean data, predictable inputs, and forgiving users. Production rewards none of that.</p>
            <div className="inline-block bg-background px-6 py-3 rounded-full border border-border shadow-sm">
              <span className="font-bold text-accent">31%</span> of AI use cases reach full production (Acrosolve, 2026)
            </div>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

function Section02bPage() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="mb-10">
            <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">02 // The Gap</h2>
            <h3 className="text-2xl md:text-4xl font-display font-bold tracking-tight">What Deployable Looks Like</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-border rounded-3xl overflow-hidden">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transition, delay: 0.1 }} className="bg-background p-8 md:p-12">
              <h5 className="text-xl font-bold mb-6 text-muted-foreground">Traditional Chatbot</h5>
              <ul className="space-y-5">
                {["Q&A in isolation", "Answers a single question", "No memory of context", "Cannot take action", "User does the integration"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground/80">
                    <XCircle className="text-muted-foreground w-5 h-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transition, delay: 0.18 }} className="bg-card p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
              <h5 className="text-xl font-bold mb-6 text-primary">Agents Working Together</h5>
              <ul className="space-y-5">
                {["Outcome delivered", "Plans the work automatically", "Holds context across steps", "Executes checks and retries", "Returns a finished result"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-medium">
                    <Zap className="text-accent w-5 h-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section03Page() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="mb-10">
            <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">03 // The Foundation</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight max-w-3xl">
              The prerequisite nobody talks about.
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Before you can evaluate any AI proposal, you need to understand your process as a system.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Layers,   title: "PROCESS",    desc: "How value flows through your organisation." },
              { icon: Users,    title: "PEOPLE",     desc: "Educated and capable — continuous education, not one-time onboarding." },
              { icon: Database, title: "DATA",       desc: "Joined and measured — governed at the asset level, aligned to the use cases that matter." },
              { icon: Shield,   title: "TECHNOLOGY", desc: "Integrated and safe — secure, governed, observable." },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.06 * i }}>
                <div className="bg-card p-6 rounded-2xl border border-border h-full hover:border-primary/50 transition-colors">
                  <item.icon className="w-8 h-8 text-primary mb-4" />
                  <h4 className="text-sm font-bold tracking-wider mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transition, delay: 0.2 }}>
              <h4 className="text-xl font-bold mb-4">You cannot improve what you have never measured.</h4>
              <p className="text-muted-foreground mb-4">
                Most failed AI projects fail before the model runs. Someone bought AI to fix a process they did not understand. Measured against a baseline they invented retrospectively.
              </p>
              <p className="text-xl font-medium border-l-4 border-accent pl-4 py-1 mb-6">
                Map the process. Measure it. Then evaluate.
              </p>
              <div className="p-5 bg-secondary rounded-xl">
                <p className="text-3xl font-display font-bold text-primary mb-1">70%</p>
                <p className="text-sm font-medium">of AI project failures trace to data and process problems, not algorithms.</p>
                <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">Gartner, Deloitte, McKinsey</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transition, delay: 0.28 }}>
              <div className="bg-card p-6 rounded-3xl shadow-xl border border-border">
                <h4 className="text-lg font-bold mb-5">"AI on a silo gives you a faster silo."</h4>
                <div className="space-y-3 mb-6">
                  {[
                    { num: "1", bg: "bg-blue-100 dark:bg-blue-900/30", color: "text-blue-600 dark:text-blue-400", title: "Contact Centre", sub: "Calls, transcripts, sentiment" },
                    { num: "2", bg: "bg-green-100 dark:bg-green-900/30", color: "text-green-600 dark:text-green-400", title: "CRM", sub: "Customer demographics & history" },
                    { num: "3", bg: "bg-orange-100 dark:bg-orange-900/30", color: "text-accent", title: "Claims / Core Systems", sub: "Outcomes & resolution data" },
                  ].map((item) => (
                    <div key={item.num} className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                      <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                        <span className={`font-bold ${item.color}`}>{item.num}</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-primary/10 rounded-lg text-primary font-medium text-center text-sm">= Joined Insight</div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  The vendor demos on one. The answer requires all three. You almost certainly do not have them joined.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section04Page() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="mb-10 text-center max-w-3xl mx-auto">
            <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">04 // The Framework</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">Three Lenses</h3>
            <p className="text-xl text-muted-foreground mb-5">
              Assuming readiness is in place, here is how to pressure-test any specific AI proposal.
            </p>
            <span className="font-bold text-lg inline-block py-2 px-6 bg-card rounded-full border border-border shadow-sm">
              Pass all three: probably real. Fail any one: probably not ready.
            </span>
          </motion.div>

          <div className="space-y-5">
            {[
              {
                num: "01", title: "Unit Economics", tag: "Stand Alone",
                question: "Can you name what this changes per task, per transaction, per decision, in dollars or minutes? A number, not an adjective.",
                body: (
                  <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                    <p className="font-bold flex items-center gap-2 mb-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-destructive" /> The Trap: "Deflects 30% of tickets."
                    </p>
                    <p className="text-sm text-muted-foreground">Deflects to where? Remaining tickets are harder. Agents get slower. Easy questions that built morale are gone. CSAT drops. The unit might be net negative.</p>
                  </div>
                )
              },
              {
                num: "02", title: "Knowledge Foundation", tag: "Compound",
                question: "Does this build a reusable knowledge foundation other use cases can leverage, or a silo that dies?",
                body: (
                  <div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: "VOICE", sub: "Calls, transcripts, sentiment, intent" },
                        { label: "DOCS",  sub: "Contracts, complaints, policies" },
                        { label: "OPS",   sub: "Outcomes, claims, finance" },
                      ].map((d) => (
                        <div key={d.label} className="p-3 bg-background rounded-xl border border-border text-center">
                          <p className="font-bold text-primary text-sm mb-1">{d.label}</p>
                          <p className="text-xs text-muted-foreground">{d.sub}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-center">Combined, they unlock use cases none of them deliver alone. The pieces compound.</p>
                  </div>
                )
              },
              {
                num: "03", title: "Roadmap Fit", tag: "Connect",
                question: "How does this connect to the bigger picture? Where else in your business could this intelligence be used?",
                body: (
                  <div className="p-4 bg-secondary rounded-xl">
                    <p className="text-3xl font-display font-bold text-primary mb-1">74%</p>
                    <p className="font-medium text-sm mb-1">of AI's economic value is captured by 20% of organisations.</p>
                    <p className="text-xs text-muted-foreground">PwC AI Performance Study, 2026</p>
                  </div>
                )
              },
            ].map((lens, i) => (
              <motion.div key={lens.num} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.08 * i }}>
                <div className="bg-background rounded-2xl p-6 border border-border grid md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-4">
                    <div className="text-5xl font-display font-bold text-primary/15 mb-2">{lens.num}</div>
                    <h4 className="text-xl font-bold mb-1">{lens.title}</h4>
                    <p className="text-accent font-medium tracking-wide uppercase text-xs mb-3">{lens.tag}</p>
                    <p className="text-sm text-muted-foreground italic">"{lens.question}"</p>
                  </div>
                  <div className="md:col-span-8 bg-card rounded-xl p-5 border border-card-border">
                    {lens.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section05Page() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="mb-10">
            <h2 className="text-primary-foreground/60 font-mono text-sm tracking-widest uppercase mb-4">05 // Application</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">Five Questions for Monday</h3>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              Real questions, not rhetorical ones. Each has put real proposals on real desks back into proportion.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {[
              { title: "PROCESS",        question: "Do we understand our end-to-end process?" },
              { title: "PROBLEM FIT",    question: "What specific problem are we solving, who notices when it is solved, and could we solve it without AI?" },
              { title: "UNIT ECONOMICS", question: "What is the cost or value per transaction today, in dollars, and what does it become after?" },
              { title: "REUSE",          question: "Does this build reusable capability that other use cases can leverage, or is it a silo?" },
              { title: "BIGGER PICTURE", question: "How does this connect to the bigger picture and the other things we are building?" },
            ].map((q, i) => (
              <motion.div key={q.title} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ ...transition, delay: 0.07 * i }}>
                <div className="bg-background text-foreground p-5 md:p-6 rounded-2xl flex items-center gap-5 shadow-xl" data-testid={`question-card-${i}`}>
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary/10 text-primary font-bold text-lg shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">{q.title}</h4>
                    <p className="text-lg md:text-xl font-medium">{q.question}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Section06Page() {
  return (
    <PageShell>
      <div className="flex-1 flex flex-col justify-center px-4 pt-28 pb-12">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition} className="mb-10">
            <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">06 // Conclusion</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">Where This Is Heading</h3>
            <p className="text-xl text-muted-foreground">Three observations. Grounded, not speculative.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                color: "border-primary", num: "01",
                title: "Transformative change is real. Readiness decides who benefits.",
                body: "Organisations with process clarity, data foundations, and educated teams are seeing meaningful returns. Those without are stalling.",
                stat: "79% report AI adoption challenges. 54% of C-suite say it is tearing the company apart."
              },
              {
                color: "border-accent", num: "02",
                title: "Workforce disruption is happening. Quieter offices are not.",
                body: "Employees using AI are individually more productive, taking on broader scope, working faster, extending hours. AI does not reduce work. It intensifies it. The leadership question is whether that intensity creates value or burns the team out.",
                stat: null
              },
              {
                color: "border-blue-500", num: "03",
                title: "The skills gap, not the technology, is the constraint.",
                body: "60% of AI projects without AI-ready data are abandoned. The biggest barrier to integration is not technology. It is workforce capability.",
                stat: null
              },
            ].map((item, i) => (
              <motion.div key={item.num} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.08 * i }}>
                <div className={`h-full border-t-4 ${item.color} pt-6`}>
                  <p className="text-3xl font-display font-bold text-primary/20 mb-3">{item.num}</p>
                  <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.body}</p>
                  {item.stat && (
                    <p className="text-sm font-medium bg-card p-4 rounded-lg border border-border">{item.stat}</p>
                  )}
                </div>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
            <div className="mb-8 flex justify-center">
              <Logo size="hero" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Questions.</h2>
            <p className="text-2xl text-muted-foreground mb-10">
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
            <p className="text-sm text-muted-foreground border-t border-border pt-8">
              {brand.footer}
            </p>
          </motion.div>
        </div>
      </div>
    </PageShell>
  );
}

const PAGE_COMPONENTS = [
  HeroPage,
  SignalProblemPage,
  Section01Page,
  Section02aPage,
  Section02bPage,
  Section03Page,
  Section04Page,
  Section05Page,
  Section06Page,
  ContactPage,
];

/* ─── Root ─────────────────────────────────────────────────── */

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

      {/* Navigation bar — Previous / page indicator / Next */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-t border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <Button
            variant="outline"
            size="lg"
            onClick={goBack}
            disabled={isFirst}
            className="rounded-full px-6 gap-2 disabled:opacity-30"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          <div className="flex items-center gap-2" data-testid="page-indicator">
            {PAGE_COMPONENTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                data-testid={`dot-page-${i}`}
                className={[
                  "rounded-full transition-all duration-200 focus:outline-none",
                  i === currentPage
                    ? "w-6 h-2.5 bg-primary"
                    : "w-2.5 h-2.5 bg-border hover:bg-muted-foreground/50"
                ].join(" ")}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <Button
            size="lg"
            onClick={goNext}
            disabled={isLast}
            className="rounded-full px-6 gap-2 disabled:opacity-30"
            data-testid="button-next"
          >
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
