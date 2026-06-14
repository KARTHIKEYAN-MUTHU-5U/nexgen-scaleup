import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'motion/react';
import { AppWindow, Droplets, GraduationCap, ArrowRight, Activity, Play, BarChart3, Database, Workflow, X, Mail, Phone, MapPin, CheckCircle, Loader2, FileText, Github } from 'lucide-react';
import { useRef, useEffect, useState, MouseEvent as ReactMouseEvent, FormEvent } from 'react';

// --- UTILITY COMPONENTS ---

function Noise() {
  return <div className="noise-bg mix-blend-overlay hidden md:block"></div>;
}

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 40, stiffness: 800, mass: 0.2 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </motion.div>
  );
}

function RevealText({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay }
    })
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 200 } },
    hidden: { opacity: 0, y: 40 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-wrap gap-x-[0.25em] ${className}`}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

// --- SECTIONS ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-ng-bg/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="font-display font-bold text-xl tracking-tighter flex items-center gap-3">
            <div className="w-8 h-8 bg-ng-accent text-black flex items-center justify-center font-mono text-xs font-bold clip-diagonal">
              NG
            </div>
            NexGen<span className="text-white/40">ScaleUp</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-mono font-medium text-ng-text-muted uppercase tracking-widest">
            <button onClick={() => scrollToSection('ecosystem')} className="hover:text-white transition-colors cursor-pointer">// Ecosystem</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">// Core</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">// Link</button>
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:flex px-6 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-ng-accent transition-colors items-center gap-2 clip-diagonal relative group overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 w-full h-full bg-black/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
            <span className="relative z-10 flex items-center gap-2">Initialize <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-ng-bg/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
            >
              <div className="flex flex-col items-center py-8 gap-6 text-sm font-mono uppercase tracking-widest">
                <button onClick={() => scrollToSection('ecosystem')} className="text-ng-text-muted hover:text-white transition-colors cursor-pointer">Ecosystem</button>
                <button onClick={() => scrollToSection('about')} className="text-ng-text-muted hover:text-white transition-colors cursor-pointer">Core</button>
                <button onClick={() => scrollToSection('contact')} className="text-ng-text-muted hover:text-white transition-colors cursor-pointer">Contact</button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-ng-accent text-black font-bold text-xs uppercase tracking-wider clip-diagonal cursor-pointer"
                >
                  Initialize Project
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-ng-accent origin-left z-[60]"
        style={{ scaleX }}
      />
    </>
  );
}

function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Disable parallax on mobile for smooth scrolling
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], isMobile ? [1, 1] : [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 1] : [1, 0.9]);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Dynamic Grid Background — hidden on mobile for performance */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] z-0 pointer-events-none hidden md:block" />

      <motion.div
        style={isMobile ? undefined : { y, opacity, scale }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10"
      >
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 border border-white/10 px-4 py-2 bg-black/40 backdrop-blur-md clip-diagonal"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ng-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-ng-accent"></span>
            </span>
            <span className="text-[10px] font-mono text-ng-accent uppercase tracking-widest leading-none mt-[2px]">
              System Status: Dominant
            </span>
          </motion.div>

          <div className="max-w-5xl">
            <h1 className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-[0.85] tracking-tighter uppercase mb-8">
              <RevealText text="WE BUILD" delay={0.1} />
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-8 mt-2">
                <RevealText text="DIGITAL" delay={0.3} className="text-white/20" />
                <RevealText text="ASSETS." delay={0.4} className="text-ng-accent" />
              </div>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-lg md:text-xl text-ng-text-muted font-light leading-relaxed border-l border-ng-accent pl-6">
                  NexGenScaleUp is a premier technology parent company. We engineer interactive, dopamine-hitting B2B and B2C applications from scratch that completely dominate the market.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-6 items-start"
              >
                <button
                  onClick={scrollToContact}
                  className="h-16 px-8 bg-white text-black font-semibold text-sm uppercase tracking-wider hover:bg-ng-accent transition-colors flex items-center justify-center gap-3 clip-diagonal group w-full sm:w-auto cursor-pointer"
                >
                  <span>Initialize Project</span>
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-2 transition-transform">
                    <ArrowRight size={16} />
                  </div>
                </button>
                <div className="h-16 flex items-center gap-4 text-xs font-mono text-white/50 border border-white/10 px-6 backdrop-blur-sm">
                  <Activity size={14} className="text-ng-accent" />
                  ACCEPTING_PROJECTS
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function InteractiveMarquee() {
  return (
    <div className="py-12 border-y border-white/5 overflow-hidden flex flex-col gap-4 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>

      {/* Marquee Row 1 */}
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="flex gap-8 font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase whitespace-nowrap opacity-80"
      >
        <span className="text-outline">Hyper-Scale Technology</span>
        <span className="text-ng-accent">•</span>
        <span>Hyper-Scale Technology</span>
        <span className="text-ng-accent">•</span>
        <span className="text-outline">Hyper-Scale Technology</span>
        <span className="text-ng-accent">•</span>
        <span>Hyper-Scale Technology</span>
        <span className="text-ng-accent">•</span>
      </motion.div>

      {/* Marquee Row 2 (Reverse) */}
      <motion.div
        animate={{ x: [-1000, 0] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="flex gap-8 font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase whitespace-nowrap opacity-40 ml-[-200px]"
      >
        <span>Digital Transformation</span>
        <span className="text-white/20">—</span>
        <span className="text-outline">Automate Everything</span>
        <span className="text-white/20">—</span>
        <span>Digital Transformation</span>
        <span className="text-white/20">—</span>
        <span className="text-outline">Automate Everything</span>
        <span className="text-white/20">—</span>
      </motion.div>
    </div>
  );
}

// Flashlight Bento Card
function FlashlightCard({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(228, 255, 0, 0.15),
      transparent 80%
    )
  `;

  function handleMouseMove({ currentTarget, clientX, clientY }: ReactMouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Main site clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)
  const borderPath = dims.w > 0
    ? `M 0.5 0.5 L ${dims.w - 0.5} 0.5 L ${dims.w - 0.5} ${dims.h - 20.5} L ${dims.w - 20.5} ${dims.h - 0.5} L 0.5 ${dims.h - 0.5} Z`
    : '';

  return (
    <div
      ref={containerRef}
      className={`group relative bg-black/50 overflow-hidden clip-diagonal ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* SVG border that precisely follows the clip-path diagonal */}
      {dims.w > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          preserveAspectRatio="none"
        >
          <path
            d={borderPath}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        </svg>
      )}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
        style={{ background }}
      />
      <div className="relative h-full z-10 p-8 sm:p-12 flex flex-col">
        {children}
      </div>
    </div>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="py-32 relative z-10 bg-ng-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-24">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-6xl font-bold mb-6 tracking-tighter uppercase">
              <span className="text-ng-accent">//</span> Operational <br/>Ecosystem.
            </h2>
            <p className="text-ng-text-muted text-lg md:text-xl font-light">
              We own, build, and scale a proprietary network of specialized applications. From B2B infrastructure to deep-tech educational pathways.
            </p>
          </div>
          <div className="font-mono text-xs text-white/40 text-right hidden lg:block">
            ACTIVE NODES: 04 <br/>
            STATUS: OPTIMAL
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Flagship */}
          <a href="https://water.nexgenscaleup.com" target="_blank" rel="noopener noreferrer" className="lg:col-span-8 cursor-pointer">
          <FlashlightCard className="min-h-[400px] h-full">
            <div className="flex justify-between items-start mb-16">
              <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-ng-accent">
                <Droplets size={32} />
              </div>
              <div className="px-4 py-1.5 bg-ng-accent/10 text-ng-accent border border-ng-accent/20 text-[10px] font-mono tracking-widest uppercase">
                Flagship B2B2C
              </div>
            </div>

            <div className="mt-auto">
              <h3 className="font-display text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">water.<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">NexGenCore</span></h3>
              <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                The ultimate SaaS engine built exclusively for local watercan businesses. We provide end-to-end management, dispatch, and pure scaling infrastructure for all active owners in the pipeline.
              </p>
            </div>

            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Database size={200} />
            </div>
          </FlashlightCard>
          </a>

          {/* Education Partner */}
          <FlashlightCard className="lg:col-span-4 min-h-[400px]">
             <div className="flex justify-between items-start mb-12">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                <GraduationCap size={24} />
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white/50">
                Partner Node
              </div>
            </div>

            <div className="mt-auto">
              <h3 className="font-display text-2xl font-bold mb-3 uppercase tracking-tight">Jobs for You Tamizha</h3>
              <p className="text-white/60 font-light leading-relaxed">
                A highly-specialized education application. We build pathways that seamlessly connect skilled talent with demanding technical roles.
              </p>
            </div>
          </FlashlightCard>

          {/* ExpertAssist */}
          <a href="https://expertassist.nexgenscaleup.com" target="_blank" rel="noopener noreferrer" className="lg:col-span-12 cursor-pointer">
          <FlashlightCard className="min-h-[350px] h-full">
            <div className="flex justify-between items-start mb-12">
              <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-amber-400">
                <FileText size={32} />
              </div>
              <div className="px-4 py-1.5 bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-mono tracking-widest uppercase">
                Document Services B2C
              </div>
            </div>

            <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div>
                <h3 className="font-display text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">Expert<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">Assist</span></h3>
                <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
                  Trusted WhatsApp-based document assistance for Tamil Nadu. We help with Passport, PAN, Voter ID, Certificates, Aadhaar updates, and Business Registrations like GST, MSME, FSSAI & more.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Passport', 'PAN Card', 'Voter ID', 'GST', 'MSME', 'FSSAI'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white/50">{tag}</span>
                ))}
              </div>
            </div>
          </FlashlightCard>
          </a>

          {/* Agency */}
          <FlashlightCard className="lg:col-span-5 min-h-[350px]">
             <div className="flex justify-between items-start mb-12">
              <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-purple-400">
                <BarChart3 size={24} />
              </div>
            </div>
            <div className="mt-auto">
              <div className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-2">Internal Agency</div>
              <h3 className="font-display text-3xl font-bold mb-3 uppercase tracking-tight">Digital Domination</h3>
              <p className="text-white/60 font-light leading-relaxed">
                Aggressive growth metrics, targeted positioning, and relentless digital marketing to amplify our assets and external partners.
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
              <Workflow size={150} />
            </div>
          </FlashlightCard>

          {/* Development */}
          <FlashlightCard className="lg:col-span-7 bg-ng-accent text-black min-h-[350px]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-50 z-0"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-12">
                <div className="w-12 h-12 bg-black flex items-center justify-center text-ng-accent clip-diagonal">
                  <AppWindow size={24} />
                </div>
                <div className="px-3 py-1 bg-black/10 text-black border border-black/20 text-[10px] font-mono font-bold tracking-widest uppercase">
                  Custom Engineering
                </div>
              </div>
              <div className="mt-auto max-w-lg">
                <h3 className="font-display text-4xl font-bold mb-4 uppercase tracking-tighter">Bespoke Software</h3>
                <p className="text-black/80 font-medium leading-relaxed text-lg">
                  We don't use templates. We build dopamine-hitting, high-performance web applications from absolute scratch. Top-tier architecture for businesses that refuse to lose.
                </p>
              </div>
            </div>
          </FlashlightCard>

        </div>
      </div>
    </section>
  );
}

function ParadigmShift() {
  return (
    <section id="about" className="py-40 relative z-10 bg-black border-y border-white/10 overflow-hidden">
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-b from-ng-accent/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="relative"
        >
          {/* Brutalist Target decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-[0.5px] border-white/5 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-[0.5px] border-white/5 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] w-px h-[600px] bg-white/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-[50%] w-[600px] h-px bg-white/5 pointer-events-none" />

          <h2 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter uppercase leading-[0.8] mb-8 relative z-10 mix-blend-difference">
            <span className="block text-white">REDEFINE</span>
            <span className="block text-outline">YOUR SCALE</span>
          </h2>
        </motion.div>

        <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mt-12 mb-16 relative z-10">
          We strip away the noise and focus entirely on performant, interactive tech that converts users and automates operations.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 relative z-10 w-full max-w-4xl border-t border-white/10 pt-16">
          {[
            { metric: "5+", desc: "ACTIVE PRODUCTS" },
            { metric: "100%", desc: "BUILT FROM SCRATCH" },
            { metric: "24/7", desc: "SYSTEM UPTIME" },
            { metric: "EST.24", desc: "FOUNDED" }
          ].map((stat, i) => (
             <div key={i} className="flex flex-col items-center">
                <div className="font-mono text-3xl md:text-5xl text-ng-accent font-bold mb-2">{stat.metric}</div>
                <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">{stat.desc}</div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    await new Promise(resolve => setTimeout(resolve, 1500));

    const subject = encodeURIComponent(`New Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'N/A'}\n\nMessage:\n${formData.message}`
    );
    window.open(`mailto:hello.Nexgenscaleup@gmail.com?subject=${subject}&body=${body}`, '_blank');

    setStatus('sent');
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-32 bg-ng-bg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border border-white/10 bg-[#050505] p-8 md:p-16 relative overflow-hidden clip-diagonal">

          <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
            <div className="w-64 h-64 border border-ng-accent/30 rounded-full flex items-center justify-center">
              <div className="w-48 h-48 border border-ng-accent/20 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 border border-ng-accent/10 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-ng-accent"></span>
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Connect to Network</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left — Info */}
              <div>
                <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6 leading-[0.9]">
                  START THE<br/><span className="text-ng-accent">INTEGRATION.</span>
                </h2>

                <p className="text-xl text-white/60 font-light mb-12">
                  Ready to leave legacy infrastructure behind? Bring us your vision, and we will architect the impossible.
                </p>

                <div className="space-y-4">
                  <a href="mailto:hello.Nexgenscaleup@gmail.com" className="flex items-center gap-4 text-white/60 hover:text-ng-accent transition-colors group">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-ng-accent/50 transition-colors">
                      <Mail size={18} />
                    </div>
                    <span className="font-mono text-sm">hello.Nexgenscaleup@gmail.com</span>
                  </a>
                  <a href="tel:+916381777977" className="flex items-center gap-4 text-white/60 hover:text-ng-accent transition-colors group">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-ng-accent/50 transition-colors">
                      <Phone size={18} />
                    </div>
                    <span className="font-mono text-sm">+91 63817 77977</span>
                  </a>
                  <div className="flex items-center gap-4 text-white/60">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <span className="font-mono text-sm">Chennai, Tamil Nadu // India</span>
                  </div>
                </div>
              </div>

              {/* Right — Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-ng-accent/50 transition-colors font-mono text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-ng-accent/50 transition-colors font-mono text-sm"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-company" className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Company</label>
                  <input
                    id="contact-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-ng-accent/50 transition-colors font-mono text-sm"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-white/40 uppercase tracking-widest mb-2">Project Brief *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-ng-accent/50 transition-colors font-mono text-sm resize-none"
                    placeholder="Tell us about your vision..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className="w-full h-16 bg-ng-accent text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center justify-center gap-4 clip-diagonal disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'idle' && (
                    <>Execute Process <Play size={16} className="fill-black" /></>
                  )}
                  {status === 'sending' && (
                    <>Processing... <Loader2 size={16} className="animate-spin" /></>
                  )}
                  {status === 'sent' && (
                    <>Transmission Complete <CheckCircle size={16} /></>
                  )}
                  {status === 'error' && (
                    <>Error — Try Again <X size={16} /></>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-ng-accent/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="font-display font-bold text-3xl tracking-tighter flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-ng-accent text-black flex items-center justify-center font-mono text-[8px] font-bold clip-diagonal">NG</div>
              NexGen<span className="text-white/40">ScaleUp</span>
            </div>
            <p className="text-white/50 font-light max-w-sm mb-6">
              Building applications, automating operations, and dominating digital markets with top-tier technology.
            </p>
            <div className="text-xs font-mono text-white/30 uppercase tracking-widest">
              HQ: CHENNAI, TN // OPERATION: 24/7/365
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6">Sys.Assets</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/70">
              <li><button onClick={() => scrollToSection('ecosystem')} className="hover:text-ng-accent transition-colors cursor-pointer">water.NexGenCore</button></li>
              <li><button onClick={() => scrollToSection('ecosystem')} className="hover:text-ng-accent transition-colors cursor-pointer">ExpertAssist</button></li>
              <li><button onClick={() => scrollToSection('ecosystem')} className="hover:text-ng-accent transition-colors cursor-pointer">Jobs For You Tamizha</button></li>
              <li><button onClick={() => scrollToSection('ecosystem')} className="hover:text-ng-accent transition-colors cursor-pointer">Custom Software</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-6">Comms</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/70">
              <li><a href="mailto:hello.Nexgenscaleup@gmail.com" className="hover:text-ng-accent transition-colors">hello.Nexgenscaleup@gmail.com</a></li>
              <li><a href="tel:+916381777977" className="hover:text-ng-accent transition-colors">+91 63817 77977</a></li>
              <li><a href="https://www.linkedin.com/in/karthikeyan-m-nexgen" target="_blank" rel="noopener noreferrer" className="hover:text-ng-accent transition-colors">LinkedIn Node</a></li>
              <li><a href="https://github.com/KARTHIKEYAN-MUTHU-5U" target="_blank" rel="noopener noreferrer" className="hover:text-ng-accent transition-colors">GitHub Hub</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs font-mono text-white/30 uppercase tracking-widest">
          <div>© {new Date().getFullYear()} NEXGENSCALEUP. ALL RIGHTS RESERVED.</div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <span>SECURE.</span>
            <span>OPTIMIZED.</span>
            <span>DOMINANT.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="selection:bg-ng-accent selection:text-black">
      <CustomCursor />
      <Noise />
      <Navbar />
      <main>
        <Hero />
        <InteractiveMarquee />
        <Ecosystem />
        <ParadigmShift />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
