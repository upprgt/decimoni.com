import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  Workflow,
  BarChart3,
  Wrench,
  Zap,
  Rocket,
  ShieldCheck,
  MessageCircle,
  CalendarClock,
  Mail,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Boxes,
  CircuitBoard,
  Binary,
} from "lucide-react";

// === QUICK CONFIG ===
const CONFIG = {
  brand: "Decimoni Dataworks",
  // put your real links here – nothing is hard‑coded below
  whatsappUrl:
    "https://wa.me/5511000000000?text=Oi%20Decimoni%20Dataworks%2C%20quero%20automatizar%20meu%20neg%C3%B3cio.",
  calendlyUrl: "https://calendly.com/seu-calendario/15min",
  email: "eduardo@decimoni.com",
  localeDefault: "pt" as "pt" | "en",
};

const COPY = {
  pt: {
    nav: {
      services: "serviços",
      results: "resultados",
      process: "processo",
      pricing: "planos",
      faq: "faq",
      contact: "contato",
    },
    hero: {
      eyebrow: "automação • dados • indústria 4.0",
      title: "a sua fábrica merece menos planilha e mais dinheiro",
      subtitle:
        "a gente corta burocracia, integra sistemas e faz seus fluxos rodarem sozinhos. você trabalha no que importa, o resto é script.",
      ctaPrimary: "falar no whatsapp",
      ctaSecondary: "agendar uma call",
    },
    trust: ["python", "power bi", "sharepoint", "sap / mes", "postgreSQL"],
    sections: {
      services: {
        title: "o que entregamos de verdade",
        items: [
          {
            icon: <Workflow className="h-6 w-6" />,
            title: "automação de processos",
            desc: "robôs que clicam por você: power automate, python, sap, sharepoint, teams, outlook, tudo conversando.",
          },
          {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "dashboards que decidem",
            desc: "kpis em tempo real no power bi, com dados limpos e versionados. sem gambiarra.",
          },
          {
            icon: <Bot className="h-6 w-6" />,
            title: "assistentes de ia úteis",
            desc: "chatbots e copilotos que rodam seu processo, não só conversam bonito.",
          },
          {
            icon: <Wrench className="h-6 w-6" />,
            title: "scheduling & mes",
            desc: "or‑tools, heurísticas e integração com chão de fábrica. cronogramas que respeitam máquina e prazo.",
          },
        ],
      },
      results: {
        title: "números que importam",
        highlights: [
          { kpi: "R$ 2.000.000+", label: "economia estimada em projetos" },
          { kpi: "5000+", label: "horas manuais evitadas" },
          { kpi: "< 90 dias", label: "payback típico" },
        ],
      },
      process: {
        title: "como funciona",
        steps: [
          {
            title: "diagnóstico relâmpago",
            desc: "1–2 reuniões. mapeamos fluxo, sistemas e dor real (sem powerpoint infinito).",
          },
          {
            title: "piloto brutalmente simples",
            desc: "prova em semanas. entregável usável com métrica de sucesso clara.",
          },
          {
            title: "escala sem drama",
            desc: "sobe pra produção, monitora, documenta e treina. governança que não trava a operação.",
          },
        ],
      },
      pricing: {
        title: "planos sem enrolação",
        tiers: [
          {
            name: "starter",
            price: "sob consulta",
            perks: [
              "diagnóstico + blueprint",
              "1 automação ou 1 dashboard",
              "suporte 30 dias",
            ],
          },
          {
            name: "pro",
            price: "sob consulta",
            perks: [
              "tudo do starter",
              "integrações (sap/sharepoint/postgres)",
              "scheduling básico / mes light",
              "suporte 90 dias",
            ],
            highlight: true,
          },
          {
            name: "enterprise",
            price: "sob consulta",
            perks: [
              "arquitetura completa de dados",
              "monitoramento e sso",
              "scheduling avançado (cp-sat, heurísticas)",
              "treinamento do time",
            ],
          },
        ],
      },
      faq: {
        title: "perguntas que você teria no café",
        items: [
          {
            q: "vocês trabalham só com indústria?",
            a: "indústria é nossa praia, mas já automatizamos serviços e varejo. se tem processo chato, dá pra ajudar.",
          },
          {
            q: "quanto tempo pra ver resultado?",
            a: "em 2–6 semanas um piloto costuma estar gerando valor medível.",
          },
          {
            q: "é caro?",
            a: "sincero: fica barato quando compara com horas perdidas e retrabalho. payback < 90 dias é bem comum.",
          },
        ],
      },
      contact: {
        title: "bora tirar esse escorpião do bolso (com retorno)",
        subtitle:
          "manda mensagem, agenda uma call ou dispara um e‑mail. prometo zero blá‑blá‑blá.",
        name: "seu nome",
        email: "seu e‑mail",
        message: "sua mensagem",
        send: "enviar",
      },
    },
    toasts: {
      copied: "copiado para a área de transferência",
      sent: "mensagem pronta no seu e‑mail"
    },
  },
  en: {
    nav: {
      services: "services",
      results: "results",
      process: "process",
      pricing: "pricing",
      faq: "faq",
      contact: "contact",
    },
    hero: {
      eyebrow: "automation • data • industry 4.0",
      title: "less spreadsheet, more money",
      subtitle:
        "we kill busywork, wire up your stack, and make flows run themselves. you focus on what matters; scripts chew the rest.",
      ctaPrimary: "chat on whatsapp",
      ctaSecondary: "book a call",
    },
    trust: ["python", "power bi", "sharepoint", "sap / mes", "postgreSQL"],
    sections: {
      services: {
        title: "what we actually deliver",
        items: [
          {
            icon: <Workflow className="h-6 w-6" />,
            title: "process automation",
            desc: "power automate + python + sap + sharepoint + teams + outlook humming together.",
          },
          {
            icon: <BarChart3 className="h-6 w-6" />,
            title: "decision dashboards",
            desc: "real‑time kpis in power bi on clean, versioned data. no duct tape.",
          },
          {
            icon: <Bot className="h-6 w-6" />,
            title: "useful ai copilots",
            desc: "bots that move your process forward, not just chat nicely.",
          },
          {
            icon: <Wrench className="h-6 w-6" />,
            title: "scheduling & mes",
            desc: "or‑tools, heuristics and shop‑floor integration. schedules that respect machines and deadlines.",
          },
        ],
      },
      results: {
        title: "numbers that matter",
        highlights: [
          { kpi: "US$ 350k+", label: "estimated savings across projects" },
          { kpi: "5,000+", label: "manual hours avoided" },
          { kpi: "< 90 days", label: "typical payback" },
        ],
      },
      process: {
        title: "how it works",
        steps: [
          {
            title: "blitz diagnosis",
            desc: "1–2 meetings to map flows, systems and real pain (no endless slide decks).",
          },
          {
            title: "brutally simple pilot",
            desc: "ship in weeks. usable deliverable with a clear success metric.",
          },
          {
            title: "scale without drama",
            desc: "prod, monitoring, docs and training. governance that doesn’t choke ops.",
          },
        ],
      },
      pricing: {
        title: "no‑nonsense plans",
        tiers: [
          {
            name: "starter",
            price: "let’s talk",
            perks: [
              "diagnosis + blueprint",
              "1 automation or 1 dashboard",
              "30‑day support",
            ],
          },
          {
            name: "pro",
            price: "let’s talk",
            perks: [
              "everything in starter",
              "integrations (sap/sharepoint/postgres)",
              "basic scheduling / mes light",
              "90‑day support",
            ],
            highlight: true,
          },
          {
            name: "enterprise",
            price: "let’s talk",
            perks: [
              "full data architecture",
              "monitoring + sso",
              "advanced scheduling (cp-sat, heuristics)",
              "team training",
            ],
          },
        ],
      },
      faq: {
        title: "things you’d ask anyway",
        items: [
          {
            q: "do you only work with manufacturing?",
            a: "that’s our home turf, but we’ve automated services and retail too. if there’s drudgery, we help.",
          },
          {
            q: "how fast to see impact?",
            a: "2–6 weeks for a pilot that moves the needle.",
          },
          {
            q: "is it expensive?",
            a: "honestly: it’s cheap vs. wasted hours and rework. sub‑90‑day payback is common.",
          },
        ],
      },
      contact: {
        title: "let’s make the ops pain go away",
        subtitle:
          "ping us, book a call or shoot an email. zero fluff, real outcomes.",
        name: "your name",
        email: "your email",
        message: "your message",
        send: "send",
      },
    },
    toasts: { copied: "copied to clipboard", sent: "draft opened in your email app" },
  },
} as const;

// --- smoke tests (dev only) ---
function __runSmokeTests() {
  const tests = [
    { name: 'email looks valid', ok: (CONFIG.email || '').includes('@') },
    { name: 'whatsappUrl set', ok: (CONFIG.whatsappUrl || '').startsWith('https://wa.me/') },
    { name: 'calendly optional or valid', ok: !CONFIG.calendlyUrl || CONFIG.calendlyUrl.startsWith('https://calendly.com/') },
  ];
  if (typeof window !== 'undefined' && 'console' in window) {
    try {
      console.groupCollapsed && console.groupCollapsed('Decimoni Dataworks – smoke tests');
      console.table(tests.map(t => ({ test: t.name, ok: t.ok })));
      const failed = tests.filter(t => !t.ok);
      if (failed.length) console.warn('Failing tests:', failed.map(f => f.name));
      console.groupEnd && console.groupEnd();
    } catch {}
  }
}
__runSmokeTests();

export default function DecimoniLanding() {
  const [lang, setLang] = useState(CONFIG.localeDefault);
  const t = useMemo(() => COPY[lang], [lang]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header lang={lang} setLang={setLang} t={t} onNav={scrollTo} />
      <main>
        <Hero t={t} />
        <TrustBar t={t} />
        <Services t={t} />
        <Results t={t} />
        <Process t={t} />
        <Pricing t={t} />
        <FAQ t={t} />
        <Contact t={t} />
      </main>
      <Footer />
      <StickyCTA t={t} />
    </div>
  );
}

function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={`${className} text-amber-400`} fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <path d="M32 4 58 19v26L32 60 6 45V19z" />
      <path d="M24 24v16l8 5 8-5V24l-8-5-5 3" />
    </svg>
  );
}

function Header({ lang, setLang, t, onNav }: any) {
  const NavLink = ({ id, label }: any) => (
    <button
      onClick={() => onNav(id)}
      className="text-sm text-neutral-300 hover:text-white transition"
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoMark className="h-8 w-8" />
          <span className="font-semibold tracking-tight">{CONFIG.brand}</span>
          <Badge variant="secondary" className="ml-2 bg-neutral-800 text-neutral-200">indústria 4.0</Badge>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink id="services" label={t.nav.services} />
          <NavLink id="results" label={t.nav.results} />
          <NavLink id="process" label={t.nav.process} />
          <NavLink id="pricing" label={t.nav.pricing} />
          <NavLink id="faq" label={t.nav.faq} />
          <Button size="sm" onClick={() => onNav("contact")}>
            {t.nav.contact}
          </Button>
          <LangToggle lang={lang} setLang={setLang} />
        </nav>
        <div className="md:hidden">
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </div>
    </header>
  );
}

function LangToggle({ lang, setLang }: any) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-neutral-800 p-1">
      {(["pt", "en"] as const).map((k) => (
        <button
          key={k}
          onClick={() => setLang(k)}
          className={`px-3 py-1 text-xs rounded-full transition ${
            lang === k ? "bg-neutral-100 text-neutral-900" : "text-neutral-300 hover:text-white"
          }`}
        >
          {k.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Hero({ t }: any) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm uppercase tracking-widest text-amber-400"
          >
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-4xl md:text-5xl font-semibold leading-tight"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-neutral-300 max-w-xl"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg">
              <a href={CONFIG.whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> {t.hero.ctaPrimary}
              </a>
            </Button>
            {CONFIG.calendlyUrl && (
            <Button asChild size="lg" variant="secondary" className="text-neutral-900">
              <a href={CONFIG.calendlyUrl} target="_blank" rel="noreferrer">
                <CalendarClock className="mr-2 h-4 w-4" /> {t.hero.ctaSecondary}
              </a>
            </Button>
            )}
          </motion.div>
          <ul className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-400">
            {[ShieldCheck, Zap, Rocket].map((Icon, i) => (
              <li key={i} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>
                  {i === 0 && (langAware(t, "confiável", "reliable"))}
                  {i === 1 && (langAware(t, "rápido", "fast"))}
                  {i === 2 && (langAware(t, "escalável", "scalable"))}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 -z-10 bg-gradient-to-br from-amber-400/10 to-yellow-600/10 blur-3xl" />
          <DemoDiagram />
        </div>
      </div>
    </section>
  );
}

function langAware(t: any, pt: string, en: string) {
  // super tiny helper to infer current language
  return t.nav?.services === "serviços" ? pt : en;
}

function TrustBar({ t }: any) {
  return (
    <div className="border-t border-neutral-900 bg-neutral-950/60">
      <div className="mx-auto max-w-7xl px-4 py-6 flex flex-wrap items-center gap-4 text-xs uppercase tracking-wider text-neutral-400">
        {t.trust.map((k: string) => (
          <Badge key={k} className="bg-neutral-900 text-neutral-300" variant="secondary">
            {k}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function Services({ t }: any) {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">{t.sections.services.title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {t.sections.services.items.map((s: any) => (
          <Card key={s.title} className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-neutral-800">{s.icon}</div>
                <CardTitle className="text-base text-amber-400">{s.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-300">{s.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Results({ t }: any) {
  return (
    <section id="results" className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">{t.sections.results.title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {t.sections.results.highlights.map((h: any) => (
          <Card key={h.kpi} className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6">
              <div className="text-3xl font-semibold text-amber-400">{h.kpi}</div>
              <div className="mt-2 text-neutral-400 text-sm">{h.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Process({ t }: any) {
  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">{t.sections.process.title}</h2>
      <ol className="grid gap-6 md:grid-cols-3">
        {t.sections.process.steps.map((s: any, i: number) => (
          <li key={i} className="relative">
            <Card className="bg-neutral-900 border-neutral-800 h-full">
              <CardHeader>
                <Badge variant="secondary" className="bg-neutral-800 text-neutral-200">{i + 1}</Badge>
                <CardTitle className="mt-2 text-base text-amber-400">{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-300">{s.desc}</p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Pricing({ t }: any) {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">{t.sections.pricing.title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {t.sections.pricing.tiers.map((tier: any) => (
          <Card
            key={tier.name}
            className={`border-neutral-800 bg-neutral-900 ${tier.highlight ? "ring-1 ring-amber-400/40" : ""}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="capitalize">{tier.name}</CardTitle>
                {tier.highlight && (
                  <Badge className="bg-amber-500 text-neutral-900">popular</Badge>
                )}
              </div>
              <div className="text-2xl mt-2">{tier.price}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-neutral-300">
                {tier.perks.map((p: string) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full">
                <a href={CONFIG.whatsappUrl} target="_blank" rel="noreferrer">
                  {langAware(t, "pedir proposta", "request quote")} <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FAQ({ t }: any) {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8">{t.sections.faq.title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {t.sections.faq.items.map((f: any, i: number) => (
          <Card key={i} className="bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-base text-amber-400">{f.q}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-300">{f.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Contact({ t }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`${CONFIG.brand} | ${name}`);
    const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
    return `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  }, [name, email, msg]);

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">{t.sections.contact.title}</h2>
          <p className="mt-2 text-neutral-300 max-w-prose">{t.sections.contact.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href={CONFIG.whatsappUrl} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </a>
            </Button>
            {CONFIG.calendlyUrl && (
              <Button asChild variant="secondary" className="text-neutral-900">
                <a href={CONFIG.calendlyUrl} target="_blank" rel="noreferrer">
                  <CalendarClock className="mr-2 h-4 w-4" /> Calendly
                </a>
              </Button>
            )}
            <Button asChild variant="outline">
              <a href={`mailto:${CONFIG.email}`}>
                <Mail className="mr-2 h-4 w-4" /> {CONFIG.email}
              </a>
            </Button>
          </div>
        </div>
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle>{langAware(t, "ou mande um e‑mail agora", "or email us now")}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <Input placeholder={t.sections.contact.name} value={name} onChange={(e) => setName(e.target.value)} />
              <Input placeholder={t.sections.contact.email} value={email} onChange={(e) => setEmail(e.target.value)} />
              <Textarea rows={5} placeholder={t.sections.contact.message} value={msg} onChange={(e) => setMsg(e.target.value)} />
              <div className="flex gap-3">
                <Button asChild>
                  <a href={mailto}>{t.sections.contact.send}</a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={CONFIG.whatsappUrl}>{langAware(t, "prefiro whatsapp", "prefer whatsapp")}</a>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-neutral-400 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <LogoMark className="h-6 w-6" />
          <span>© {new Date().getFullYear()} {CONFIG.brand}. all rights deserved (we earned them).</span>
        </div>
        <div className="flex items-center gap-4">
          <a className="hover:text-white" href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
          <a className="hover:text-white" href={CONFIG.whatsappUrl} target="_blank" rel="noreferrer">whatsapp</a>
          {CONFIG.calendlyUrl && (
          <a className="hover:text-white" href={CONFIG.calendlyUrl} target="_blank" rel="noreferrer">calendly</a>
          )}
        </div>
      </div>
    </footer>
  );
}

function StickyCTA({ t }: any) {
  return (
    <div className="fixed bottom-4 inset-x-0 px-4 md:hidden">
      <div className="mx-auto max-w-md rounded-2xl bg-neutral-900/90 border border-neutral-800 backdrop-blur p-3 shadow-lg flex items-center gap-3">
        <div className="p-2 rounded-xl bg-neutral-800">
          <Zap className="h-5 w-5" />
        </div>
        <div className="text-sm">
          <div className="font-medium">{langAware(t, "pronto pra acelerar?", "ready to move?")}</div>
          <div className="text-neutral-400">{langAware(t, "fale com a gente agora", "talk to us now")}</div>
        </div>
        <Button asChild size="sm" className="ml-auto">
          <a href={CONFIG.whatsappUrl} target="_blank" rel="noreferrer">
            {langAware(t, "whatsapp", "whatsapp")}
          </a>
        </Button>
      </div>
    </div>
  );
}

function DemoDiagram() {
  // cute fake architecture diagram with icons
  const nodes = [
    { icon: <Boxes className="h-4 w-4" />, label: "Shopfloor / SAP" },
    { icon: <Database className="h-4 w-4" />, label: "Postgres / SharePoint" },
    { icon: <Cpu className="h-4 w-4" />, label: "Python / OR‑Tools" },
    { icon: <BarChart3 className="h-4 w-4" />, label: "Power BI" },
    { icon: <Bot className="h-4 w-4" />, label: "AI Copilots" },
  ];
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="grid grid-cols-2 gap-4">
        {nodes.map((n, i) => (
          <div key={i} className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="p-2 rounded-lg bg-neutral-800">{n.icon}</div>
              <span>{n.label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4">
        <div className="flex items-center gap-2 text-sm">
          <CircuitBoard className="h-4 w-4" />
          <span>Flows: ETL → Scheduling → Dashboards → Copilots</span>
        </div>
        <div className="mt-2 text-xs text-neutral-400 flex items-center gap-2">
          <Binary className="h-4 w-4" /> Clean data in, money out.
        </div>
      </div>
    </div>
  );
}
