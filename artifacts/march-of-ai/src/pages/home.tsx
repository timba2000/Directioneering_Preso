import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Mail, ChevronDown, CheckCircle2, AlertTriangle, Layers, Users, Database, Shield, Zap, XCircle } from "lucide-react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StatCard = ({ value, label, source, delay = 0 }: { value: string, label: string, source: string, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px 0px" });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay }}
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

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden min-h-[90vh] flex flex-col justify-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
          <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-accent/5 blur-[120px] rounded-full -z-10" />
          
          <div className="container mx-auto max-w-5xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 border border-secondary-border">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Executive Insights Forum, 21 May 2026
              </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.05] mb-6">
                The March of AI
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-10 leading-relaxed">
                A calibration tool, not a tour. Three lenses, five questions, and one prerequisite most organisations do not have.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.3} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Download className="mr-2 h-5 w-5" /> Download Keynote Deck
              </Button>
              <Button size="lg" variant="outline" className="text-base h-14 px-8 rounded-full border-border hover:bg-secondary">
                <Mail className="mr-2 h-5 w-5" /> Contact Tim Barnes
              </Button>
            </FadeIn>

            <FadeIn delay={0.6} className="mt-24 pt-8 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Presented by</p>
                <p className="text-xl font-display font-semibold mt-1">Tim Barnes <span className="text-muted-foreground font-normal text-base">| WeDo AI</span></p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">Delivered at</p>
                <p className="text-base text-muted-foreground mt-1">Australian Retirement Trust</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* THE SIGNAL PROBLEM */}
        <section id="signal-problem" className="py-24 md:py-32 px-4 bg-card/50">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="mb-16 max-w-3xl">
              <h2 className="text-accent font-mono text-sm tracking-widest uppercase mb-4">00 // The Context</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight leading-tight">
                You are not short on AI.<br />You are short on signal.
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                You hear about AI from vendors, your team, your peers, your board, your kids. The capability is real. The demos are real. Most enterprise AI projects do not move the P&L. You do not need to become a technologist. You need a way to tell signal from noise.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                value="95%" 
                label="of GenAI pilots fail to scale." 
                source="MIT, 2025" 
                delay={0.1}
              />
              <StatCard 
                value="42%" 
                label="of companies abandoned most AI initiatives in 2025, up from 17% the year prior." 
                source="S&P Global" 
                delay={0.2}
              />
              <StatCard 
                value="5%" 
                label="achieve rapid revenue acceleration from AI investments." 
                source="MIT" 
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* SECTION 01: ACTUAL PROBLEM */}
        <section id="section-01" className="py-32 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <FadeIn>
              <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-6">01 // The Core Issue</h2>
              <h3 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8">
                What is the actual problem?
              </h3>
              <p className="text-2xl md:text-3xl font-light text-foreground/80 leading-snug">
                Every week someone pitches you AI. The challenge is no longer awareness. <span className="font-semibold text-foreground underline decoration-accent decoration-4 underline-offset-8">It is calibration.</span>
              </p>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 02: DEPLOYABILITY */}
        <section id="section-02" className="py-24 md:py-32 px-4 bg-secondary">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="mb-16">
              <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">02 // The Gap</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight max-w-3xl">
                Capability is not deployability.
              </h3>
              <p className="text-xl text-muted-foreground max-w-2xl">
                A demo shows what AI can do on a clean input. Production is what AI does on your inputs, at your scale, on Tuesday.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <FadeIn delay={0.1}>
                <div className="bg-card p-8 rounded-2xl border border-card-border h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <AlertTriangle size={120} />
                  </div>
                  <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-destructive"><XCircle /></span> The Demo
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Clean two-page sample",
                      "Curated test data",
                      "No edge cases",
                      "No regulatory tail",
                      "Looks magical"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-lg">
                        <span className="text-muted-foreground mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg h-full relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <CheckCircle2 size={120} />
                  </div>
                  <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-accent"><CheckCircle2 /></span> In Production
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "200-page contract with footnotes",
                      "Real customer data messy and joined",
                      "Edge cases drive 30% of the value",
                      "Regulator may be reading it",
                      <span key="bold" className="font-bold">10x to 100x harder than the demo</span>
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-lg">
                        <span className="text-primary-foreground/60 mt-1">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.3} className="text-center mb-24">
              <p className="text-2xl md:text-3xl font-display font-medium text-foreground mb-4">
                "Money disappears in the gap. So do executive careers."
              </p>
              <p className="text-lg text-muted-foreground">Demo environments use clean data, predictable inputs, and forgiving users. Production rewards none of that.</p>
              <div className="mt-8 inline-block bg-background px-6 py-3 rounded-full border border-border shadow-sm">
                <span className="font-bold text-accent">31%</span> of AI use cases reach full production (Acrosolve, 2026)
              </div>
            </FadeIn>

            <FadeIn className="mb-8">
              <h4 className="text-2xl font-bold mb-8">What Deployable Looks Like</h4>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-px bg-border p-px rounded-3xl overflow-hidden">
              <FadeIn delay={0.1} className="bg-background p-8 md:p-12">
                <h5 className="text-xl font-bold mb-6 text-muted-foreground">Traditional Chatbot</h5>
                <ul className="space-y-5">
                  {[
                    "Q&A in isolation",
                    "Answers a single question",
                    "No memory of context",
                    "Cannot take action",
                    "User does the integration"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-foreground/80">
                      <XCircle className="text-muted-foreground w-5 h-5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
              <FadeIn delay={0.2} className="bg-card p-8 md:p-12 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
                <h5 className="text-xl font-bold mb-6 text-primary">Agents Working Together</h5>
                <ul className="space-y-5">
                  {[
                    "Outcome delivered",
                    "Plans the work automatically",
                    "Holds context across steps",
                    "Executes checks & retries",
                    "Returns a finished result"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium">
                      <Zap className="text-accent w-5 h-5 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* SECTION 03: PREREQUISITE */}
        <section id="section-03" className="py-24 md:py-32 px-4">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="mb-16">
              <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">03 // The Foundation</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight max-w-3xl">
                The prerequisite nobody talks about.
              </h3>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Before you can evaluate any AI proposal, you need to understand your process as a system.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
              {[
                { icon: Layers, title: "PROCESS", desc: "How value flows through your organisation." },
                { icon: Users, title: "PEOPLE", desc: "Educated and capable — continuous education." },
                { icon: Database, title: "DATA", desc: "Joined and measured — governed at the asset level." },
                { icon: Shield, title: "TECHNOLOGY", desc: "Integrated and safe — secure, observable." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-card p-8 rounded-2xl border border-border h-full hover:border-primary/50 transition-colors">
                    <item.icon className="w-10 h-10 text-primary mb-6" />
                    <h4 className="text-lg font-bold tracking-wider mb-3">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <h4 className="text-2xl font-bold mb-6">You cannot improve what you have never measured.</h4>
                <p className="text-lg text-muted-foreground mb-6">
                  Most failed AI projects fail before the model runs. Someone bought AI to fix a process they did not understand. Measured against a baseline they invented retrospectively.
                </p>
                <p className="text-xl font-medium text-foreground border-l-4 border-accent pl-4 py-1">
                  Map the process. Measure it. Then evaluate.
                </p>
                <div className="mt-8 p-6 bg-secondary rounded-xl">
                  <p className="text-3xl font-display font-bold text-primary mb-2">70%</p>
                  <p className="text-sm font-medium">of AI project failures trace to data and process problems, not algorithms.</p>
                  <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">Gartner, Deloitte, McKinsey</p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-card p-8 rounded-3xl shadow-xl border border-border">
                  <h4 className="text-xl font-bold mb-6">"AI on a silo gives you a faster silo."</h4>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                        <span className="font-bold text-blue-600 dark:text-blue-400">1</span>
                      </div>
                      <div>
                        <p className="font-bold">Contact Centre</p>
                        <p className="text-sm text-muted-foreground">Calls, transcripts, sentiment</p>
                      </div>
                    </div>
                    <div className="flex justify-center"><div className="w-px h-4 bg-border" /></div>
                    <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                        <span className="font-bold text-green-600 dark:text-green-400">2</span>
                      </div>
                      <div>
                        <p className="font-bold">CRM</p>
                        <p className="text-sm text-muted-foreground">Customer demographics & history</p>
                      </div>
                    </div>
                    <div className="flex justify-center"><div className="w-px h-4 bg-border" /></div>
                    <div className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border">
                      <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                        <span className="font-bold text-accent">3</span>
                      </div>
                      <div>
                        <p className="font-bold">Claims / Core Systems</p>
                        <p className="text-sm text-muted-foreground">Outcomes & resolution data</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg text-primary font-medium text-center">
                    = Joined Insight
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    The vendor demos on one. The answer requires all three. You almost certainly do not have them joined.
                  </p>
                </div>
              </FadeIn>
            </div>
            
          </div>
        </section>

        {/* SECTION 04: THREE LENSES */}
        <section id="section-04" className="py-24 md:py-32 px-4 bg-card/40 border-y border-border">
          <div className="container mx-auto max-w-6xl">
            <FadeIn className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">04 // The Framework</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                Three Lenses
              </h3>
              <p className="text-xl text-muted-foreground">
                Assuming readiness is in place, here is how to pressure-test any specific AI proposal.
              </p>
              <p className="mt-6 font-bold text-lg inline-block py-2 px-6 bg-background rounded-full border border-border shadow-sm">
                Pass all three: probably real. Fail any one: probably not ready.
              </p>
            </FadeIn>

            <div className="space-y-12">
              {/* Lens 1 */}
              <FadeIn>
                <div className="bg-background rounded-3xl p-8 md:p-12 border border-border shadow-sm grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-4">
                    <div className="text-6xl font-display font-bold text-primary/20 mb-4">01</div>
                    <h4 className="text-2xl font-bold mb-2">Unit Economics</h4>
                    <p className="text-accent font-medium tracking-wide uppercase text-sm mb-4">Stand Alone</p>
                    <p className="text-muted-foreground">
                      Can this proposal justify itself on its own merits, in dollars or minutes per task?
                    </p>
                  </div>
                  <div className="md:col-span-8 bg-card rounded-2xl p-6 md:p-8 border border-card-border">
                    <p className="text-xl font-medium mb-6">
                      "Can you name what this changes per task, per transaction, per decision, in dollars or minutes? <span className="text-primary font-bold">A number, not an adjective.</span>"
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 bg-destructive/10 text-destructive-foreground dark:text-red-400 rounded-lg border border-destructive/20">
                        <p className="font-bold flex items-center gap-2 mb-2"><AlertTriangle className="w-5 h-5" /> The Trap: "Deflects 30% of tickets."</p>
                        <p className="text-sm">Deflects to where? Remaining tickets are harder. Agents get slower. Easy questions that built morale are gone. CSAT drops. The unit might be net negative.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Lens 2 */}
              <FadeIn>
                <div className="bg-background rounded-3xl p-8 md:p-12 border border-border shadow-sm grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-4">
                    <div className="text-6xl font-display font-bold text-primary/20 mb-4">02</div>
                    <h4 className="text-2xl font-bold mb-2">Knowledge Foundation</h4>
                    <p className="text-accent font-medium tracking-wide uppercase text-sm mb-4">Compound</p>
                    <p className="text-muted-foreground">
                      Does it build a reusable foundation that other use cases can leverage, or a silo that dies?
                    </p>
                  </div>
                  <div className="md:col-span-8 bg-card rounded-2xl p-6 md:p-8 border border-card-border">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-background rounded-xl border border-border text-center">
                        <p className="font-bold text-primary mb-2">VOICE</p>
                        <p className="text-xs text-muted-foreground">Calls, transcripts, sentiment, intent</p>
                      </div>
                      <div className="p-4 bg-background rounded-xl border border-border text-center">
                        <p className="font-bold text-primary mb-2">DOCS</p>
                        <p className="text-xs text-muted-foreground">Contracts, complaints, policies</p>
                      </div>
                      <div className="p-4 bg-background rounded-xl border border-border text-center">
                        <p className="font-bold text-primary mb-2">OPS</p>
                        <p className="text-xs text-muted-foreground">Outcomes, claims, finance</p>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-center">
                      Combined, they unlock use cases none of them deliver alone. The pieces compound.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Lens 3 */}
              <FadeIn>
                <div className="bg-background rounded-3xl p-8 md:p-12 border border-border shadow-sm grid md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-4">
                    <div className="text-6xl font-display font-bold text-primary/20 mb-4">03</div>
                    <h4 className="text-2xl font-bold mb-2">Roadmap Fit</h4>
                    <p className="text-accent font-medium tracking-wide uppercase text-sm mb-4">Connect</p>
                    <p className="text-muted-foreground">
                      How does this connect to the bigger picture? Where else could this intelligence be used?
                    </p>
                  </div>
                  <div className="md:col-span-8 bg-card rounded-2xl p-6 md:p-8 border border-card-border">
                    <p className="text-xl mb-6">
                      Each AI initiative either contributes to a system that gets smarter, or it adds another disconnected pilot. <span className="font-bold italic">There is no third option.</span>
                    </p>
                    <div className="p-6 bg-secondary rounded-xl">
                      <p className="text-3xl font-display font-bold text-primary mb-2">74%</p>
                      <p className="font-medium mb-2">of AI's economic value is captured by 20% of organisations.</p>
                      <p className="text-sm text-muted-foreground mb-4">"They tie outcomes to revenue, build governance before scaling, and treat AI as organisational redesign."</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">PwC AI Performance Study, 2026</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* SECTION 05: FIVE QUESTIONS */}
        <section id="section-05" className="py-24 md:py-32 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-5xl">
            <FadeIn className="mb-16">
              <h2 className="text-primary-foreground/60 font-mono text-sm tracking-widest uppercase mb-4">05 // Application</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                Five Questions for Monday
              </h3>
              <p className="text-xl text-primary-foreground/80 max-w-2xl">
                Real questions, not rhetorical ones. Each has put real proposals on real desks back into proportion.
              </p>
            </FadeIn>

            <div className="grid gap-6">
              {[
                { title: "PROCESS", question: "Do we understand our end-to-end process?" },
                { title: "PROBLEM FIT", question: "What specific problem are we solving, who notices when it is solved, and could we solve it without AI?" },
                { title: "UNIT ECONOMICS", question: "What is the cost or value per transaction today, in dollars, and what does it become after?" },
                { title: "REUSE", question: "Does this build reusable capability that other use cases can leverage, or is it a silo?" },
                { title: "BIGGER PICTURE", question: "How does this connect to the bigger picture and the other things we are building?" }
              ].map((q, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-background text-foreground p-6 md:p-8 rounded-2xl flex flex-col md:flex-row md:items-center gap-6 shadow-xl">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-2">{q.title}</h4>
                      <p className="text-xl md:text-2xl font-medium">{q.question}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 06: OBSERVATIONS & FOOTER */}
        <section id="section-06" className="py-24 md:py-32 px-4">
          <div className="container mx-auto max-w-5xl">
            <FadeIn className="mb-16">
              <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-4">06 // Conclusion</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                Where This Is Heading
              </h3>
              <p className="text-xl text-muted-foreground">
                Three observations. Grounded, not speculative.
              </p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8 mb-32">
              <FadeIn delay={0.1}>
                <div className="h-full border-t-4 border-primary pt-6">
                  <h4 className="text-xl font-bold mb-4">Transformative change is real. Readiness decides who benefits.</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Organisations with process clarity, data foundations, and educated teams are seeing meaningful returns. Those without are stalling.
                  </p>
                  <p className="text-sm font-medium bg-card p-4 rounded-lg border border-border">
                    79% report AI adoption challenges. 54% of C-suite say it is tearing the company apart.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="h-full border-t-4 border-accent pt-6">
                  <h4 className="text-xl font-bold mb-4">Workforce disruption is happening. Quieter offices are not.</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Employees using AI are individually more productive, taking on broader scope, working faster, extending hours. AI does not reduce work. It intensifies it. The leadership question is whether that intensity creates value or burns the team out.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="h-full border-t-4 border-blue-500 pt-6">
                  <h4 className="text-xl font-bold mb-4">The skills gap, not the technology, is the constraint.</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    60% of AI projects without AI-ready data are abandoned. The biggest barrier to integration is not technology. It is workforce capability.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* CONTACT FOOTER */}
            <FadeIn>
              <div className="bg-card rounded-3xl p-12 text-center border border-card-border shadow-lg">
                <div className="mb-8">
                  <span className="text-3xl font-display font-bold tracking-tight">
                    WeDo <span className="text-primary font-light">| AI</span>
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-4">Questions.</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Tim Barnes <span className="mx-2 text-border">|</span> AI and Automation Expert
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="rounded-full px-8 h-12 w-full sm:w-auto">
                    <Mail className="mr-2 h-4 w-4" /> Contact Tim
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-12 w-full sm:w-auto" asChild>
                    <a href="https://wedoai.com.au" target="_blank" rel="noopener noreferrer">
                      wedoai.com.au
                    </a>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border mt-12 bg-background">
        <p>© 2026 WeDo AI. Delivered at Australian Retirement Trust Executive Insights Forum.</p>
      </footer>
    </div>
  );
}
