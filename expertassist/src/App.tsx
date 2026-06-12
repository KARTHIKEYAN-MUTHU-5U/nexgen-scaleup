import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { ArrowRight, Phone, Mail, MapPin, FileText, Shield, Clock, CheckCircle, ChevronDown, MessageCircle, Briefcase, CreditCard, Vote, Fingerprint, Users, Building2, Award, Scale, Truck, Utensils, Stamp, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';
import './index.css';

// --- WhatsApp Config ---
const WA_NUMBER = '916381777977';
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi, I need help with a document service.')}`;
const waLink = (service: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi, I need help with: ${service}`)}`;

// --- Noise overlay ---
function Noise() {
  return <div className="noise-bg mix-blend-overlay"></div>;
}

// --- Navbar ---
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex justify-between items-center">
          <div className="font-display font-bold text-xl tracking-tighter flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 text-black flex items-center justify-center font-mono text-xs font-bold clip-diagonal">EA</div>
            Expert<span className="text-white/40">Assist</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono font-medium text-[#a3a3a3] uppercase tracking-widest">
            <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors cursor-pointer">// Services</button>
            <button onClick={() => scrollTo('how-it-works')} className="hover:text-white transition-colors cursor-pointer">// Process</button>
            <button onClick={() => scrollTo('faq')} className="hover:text-white transition-colors cursor-pointer">// FAQ</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">// Contact</button>
          </div>

          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:flex px-5 py-2.5 bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#1da851] transition-colors items-center gap-2 clip-diagonal">
            <MessageCircle size={14} /> WhatsApp Us
          </a>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer" aria-label="Toggle menu">
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden">
              <div className="flex flex-col items-center py-8 gap-6 text-sm font-mono uppercase tracking-widest">
                <button onClick={() => scrollTo('services')} className="text-[#a3a3a3] hover:text-white transition-colors cursor-pointer">Services</button>
                <button onClick={() => scrollTo('how-it-works')} className="text-[#a3a3a3] hover:text-white transition-colors cursor-pointer">Process</button>
                <button onClick={() => scrollTo('faq')} className="text-[#a3a3a3] hover:text-white transition-colors cursor-pointer">FAQ</button>
                <button onClick={() => scrollTo('contact')} className="text-[#a3a3a3] hover:text-white transition-colors cursor-pointer">Contact</button>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider clip-diagonal flex items-center gap-2">
                  <MessageCircle size={14} /> WhatsApp Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-amber-500 origin-left z-[60]" style={{ scaleX }} />
    </>
  );
}

// --- Hero ---
function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-12 w-full z-10">
        <div className="flex flex-col items-start gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex items-center gap-4 border border-white/10 px-4 py-2 bg-black/40 backdrop-blur-md clip-diagonal">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
            </span>
            <span className="text-[10px] font-mono text-[#25D366] uppercase tracking-widest">Trusted Document Assistance // Chennai</span>
          </motion.div>

          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] font-bold leading-[0.9] tracking-tighter uppercase mb-4"
            >
              <span className="block">YOUR DOCS.</span>
              <span className="block text-amber-500">OUR CARE.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-[#a3a3a3] font-light leading-relaxed border-l-2 border-amber-500 pl-5 max-w-2xl mt-6"
            >
              WhatsApp-based document assistance for Passport, PAN, Voter ID, Certificates, Aadhaar & Business Registrations in Tamil Nadu. Less confusion, fewer mistakes, no repeated visits.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mt-10"
            >
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="h-16 px-8 bg-[#25D366] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#1da851] transition-colors flex items-center justify-center gap-3 clip-diagonal group">
                <MessageCircle size={20} />
                <span>Message on WhatsApp</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="h-16 flex items-center gap-4 text-xs font-mono text-white/50 border border-white/10 px-6 backdrop-blur-sm">
                <Shield size={14} className="text-amber-500" />
                NOT_A_GOVERNMENT_OFFICE
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Quick Services ---
const quickServices = [
  { icon: FileText, label: 'Passport', desc: 'New, Corrections, Renewal' },
  { icon: CreditCard, label: 'PAN Card', desc: 'New Application & Corrections' },
  { icon: Vote, label: 'Voter ID', desc: 'Registration & Corrections' },
  { icon: Award, label: 'Certificates', desc: 'Community, Income, Nativity & more' },
  { icon: Fingerprint, label: 'Aadhaar', desc: 'Address & Document Update' },
  { icon: Building2, label: 'Business Reg.', desc: 'GST, MSME, FSSAI & more' },
];

function QuickServices() {
  return (
    <section className="py-20 border-y border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickServices.map((s, i) => (
            <motion.a
              key={s.label}
              href={waLink(s.label)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-[#0a0a0a] p-5 clip-diagonal-bordered hover:brightness-110 transition-all cursor-pointer"
            >
              <s.icon size={28} className="text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-display font-bold text-sm uppercase tracking-tight mb-1">{s.label}</h3>
              <p className="text-[11px] text-white/50 font-mono">{s.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Personal Documents ---
const personalDocs = [
  { icon: FileText, title: 'Passport', items: ['New Application', 'Name/DOB Corrections', 'Renewal', 'Address Change'] },
  { icon: CreditCard, title: 'PAN Card', items: ['New PAN Application', 'Name/DOB Corrections', 'Lost PAN Reissue'] },
  { icon: Vote, title: 'Voter ID', items: ['New Registration', 'Name/Photo Corrections', 'Address Transfer'] },
  { icon: Fingerprint, title: 'Aadhaar', items: ['Address Update', 'Document Update', 'Mobile Number Link'] },
  { icon: Users, title: 'Family Card', items: ['New Application', 'Add/Remove Member', 'Address Change'] },
  { icon: Scale, title: 'Patta & Chitta', items: ['Land Record Help', 'Transfer Assistance', 'Document Verification'] },
];

const certificates = [
  'Community Certificate', 'Income Certificate', 'Nativity Certificate',
  'First Graduate Certificate', 'Legal Heir Certificate',
];

// --- Business Registrations ---
const businessRegs = [
  { icon: Building2, title: 'GST Registration', desc: 'Complete GSTIN registration for your business' },
  { icon: Award, title: 'Udyam MSME', desc: 'MSME registration & Udyam certificate' },
  { icon: Utensils, title: 'FSSAI License', desc: 'Food license registration & renewal' },
  { icon: Truck, title: 'IEC Code', desc: 'Import Export Code for international trade' },
  { icon: Stamp, title: 'Trademark Filing', desc: 'Brand name & logo trademark registration' },
  { icon: Rocket, title: 'DPIIT Startup', desc: 'Startup India recognition & benefits' },
];

function Services() {
  return (
    <section id="services" className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-20">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-6xl font-bold mb-6 tracking-tighter uppercase">
              <span className="text-amber-500">//</span> Our<br />Services.
            </h2>
            <p className="text-[#a3a3a3] text-lg md:text-xl font-light">
              From personal document applications to business registrations — we handle the paperwork so you don't have to stress.
            </p>
          </div>
          <div className="font-mono text-xs text-white/40 text-right hidden lg:block">
            ACTIVE SERVICES: 17+ <br />
            STATUS: ACCEPTING
          </div>
        </div>

        {/* Personal Documents */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 bg-amber-500"></span>
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Personal Documents</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {personalDocs.map((doc, i) => (
              <motion.div
                key={doc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-black/50 p-7 clip-diagonal-bordered hover:brightness-110 transition-all"
              >
                <div className="flex justify-between items-start mb-5">
                  <doc.icon size={24} className="text-amber-500" />
                  <a href={waLink(doc.title)} target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-white/40 uppercase tracking-widest hover:text-amber-500 transition-colors flex items-center gap-1">
                    Enquire <ArrowRight size={10} />
                  </a>
                </div>
                <h3 className="font-display text-xl font-bold mb-3 uppercase tracking-tight">{doc.title}</h3>
                <ul className="space-y-2">
                  {doc.items.map(item => (
                    <li key={item} className="text-sm text-white/50 flex items-center gap-2">
                      <CheckCircle size={12} className="text-amber-500/60 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Certificates sub-section */}
          <div className="mt-8 bg-black/50 p-7 clip-diagonal-bordered">
            <div className="flex items-start gap-4 mb-4">
              <Award size={24} className="text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-3">Government Certificates</h3>
                <div className="flex flex-wrap gap-3">
                  {certificates.map(cert => (
                    <a key={cert} href={waLink(cert)} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white/5 border border-white/10 text-[11px] font-mono tracking-wider text-white/60 hover:text-amber-500 hover:border-amber-500/30 transition-all cursor-pointer">
                      {cert}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Registrations */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 bg-amber-500"></span>
            <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Business Registrations</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {businessRegs.map((reg, i) => (
              <motion.a
                key={reg.title}
                href={waLink(reg.title)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-amber-500 text-black p-7 clip-diagonal hover:bg-amber-400 transition-all cursor-pointer"
              >
                <reg.icon size={24} className="mb-4" />
                <h3 className="font-display text-xl font-bold mb-2 uppercase tracking-tight">{reg.title}</h3>
                <p className="text-black/70 text-sm font-medium">{reg.desc}</p>
                <div className="mt-4 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  Enquire Now <ArrowRight size={10} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// --- How It Works ---
const steps = [
  { num: '01', title: 'Send Documents', desc: 'Share your documents & requirements via WhatsApp', icon: MessageCircle },
  { num: '02', title: 'We Check Carefully', desc: 'Our team reviews for errors, missing info & spelling mistakes', icon: Shield },
  { num: '03', title: 'We Apply / Register', desc: 'We submit your application through the correct channels', icon: FileText },
  { num: '04', title: 'You Get Confirmation', desc: 'Receive your confirmation, receipt & tracking details', icon: CheckCircle },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-black border-y border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-6xl font-bold tracking-tighter uppercase mb-20 text-center"
        >
          <span className="text-amber-500">//</span> How It<br />Works.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-[#0a0a0a] p-8 clip-diagonal-bordered"
            >
              <div className="font-mono text-5xl font-bold text-white/5 absolute top-4 right-6">{step.num}</div>
              <step.icon size={28} className="text-amber-500 mb-6" />
              <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              {i < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight size={20} className="text-amber-500/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex h-16 px-10 bg-[#25D366] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#1da851] transition-colors items-center gap-3 clip-diagonal">
            <MessageCircle size={20} />
            Start Now on WhatsApp
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// --- Trust Section ---
const benefits = [
  { icon: Shield, title: 'Careful Review', desc: 'We check every document for errors before submission' },
  { icon: CheckCircle, title: 'Fewer Mistakes', desc: 'Reduce spelling errors & incorrect details' },
  { icon: Clock, title: 'No Repeated Visits', desc: 'Get it right the first time, avoid government office re-visits' },
  { icon: MessageCircle, title: 'Tamil Support', desc: 'Full support in Tamil via WhatsApp — simple & clear' },
  { icon: Briefcase, title: 'Simple Process', desc: 'Send docs on WhatsApp, we handle the rest' },
  { icon: Users, title: 'Personal Attention', desc: 'Dedicated assistance for every application' },
];

function TrustSection() {
  return (
    <section className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mb-6">
            <span className="block text-white">WHY PEOPLE</span>
            <span className="block text-outline">TRUST US</span>
          </h2>
          <p className="text-[#a3a3a3] text-lg max-w-2xl mx-auto mb-16">
            We're not a government office. We're a careful, trusted document assistance service that makes the process simple for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/50 p-8 text-left clip-diagonal-bordered"
            >
              <b.icon size={24} className="text-amber-500 mb-4" />
              <h3 className="font-display text-lg font-bold uppercase tracking-tight mb-2">{b.title}</h3>
              <p className="text-white/50 text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t border-white/10 pt-16 max-w-4xl mx-auto">
          {[
            { metric: '500+', desc: 'DOCUMENTS PROCESSED' },
            { metric: '98%', desc: 'SUCCESS RATE' },
            { metric: '<24h', desc: 'RESPONSE TIME' },
            { metric: 'Tamil', desc: 'FULL SUPPORT' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="font-mono text-3xl md:text-4xl text-amber-500 font-bold mb-2">{stat.metric}</div>
              <div className="text-[10px] font-mono text-white/40 tracking-widest uppercase">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- FAQ ---
const faqs = [
  { q: 'Is this a government office?', a: 'No. We are a private document assistance service. We help you prepare, check, and submit applications correctly through the proper government channels. We are not affiliated with any government department.' },
  { q: 'How do I send my documents?', a: 'Simply message us on WhatsApp at +91 63817 77977. Share photos of your existing documents, and we will guide you through the entire process step by step.' },
  { q: 'Is my data safe with you?', a: 'Yes. We handle your documents carefully and do not share them with anyone. Documents are used only for the application process you request.' },
  { q: 'How long does the process take?', a: 'It depends on the service. We will give you a clear timeline upfront. For example, PAN applications typically take 7-10 working days, while passport processing depends on government scheduling.' },
  { q: 'What if there is a correction needed?', a: 'We handle corrections too. Whether it is a name change, date of birth fix, or address update — send us the details and we will take care of it.' },
  { q: 'Do you support Tamil?', a: 'ஆமா! We provide full support in Tamil via WhatsApp. You can write to us in Tamil and we will respond in Tamil.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI (GPay, PhonePe, Paytm), bank transfer, and cash. Payment details are shared after you confirm the service.' },
  { q: 'Can you help with services not listed here?', a: 'Probably yes! Message us on WhatsApp with your requirement and we will let you know if we can help.' },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="py-32 bg-black border-t border-white/10">
      <div className="max-w-3xl mx-auto px-5 md:px-12">
        <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tighter uppercase mb-16 text-center">
          <span className="text-amber-500">//</span> Frequently<br />Asked.
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#0a0a0a] clip-diagonal-bordered overflow-hidden"
            >
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left cursor-pointer group">
                <span className="font-display font-bold text-sm md:text-base uppercase tracking-tight group-hover:text-amber-500 transition-colors pr-4">{faq.q}</span>
                <ChevronDown size={18} className={`text-amber-500 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact ---
function Contact() {
  return (
    <section id="contact" className="py-32 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="bg-[#050505] p-8 md:p-16 clip-diagonal-bordered relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
            <div className="w-64 h-64 border border-amber-500/30 rounded-full flex items-center justify-center">
              <div className="w-48 h-48 border border-amber-500/20 rounded-full flex items-center justify-center">
                <div className="w-32 h-32 border border-amber-500/10 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 bg-amber-500"></span>
              <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Get In Touch</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 leading-[0.9]">
                  READY TO<br /><span className="text-amber-500">START?</span>
                </h2>
                <p className="text-lg text-white/60 font-light mb-10">
                  Message us on WhatsApp with your document requirement. We'll respond within minutes during business hours.
                </p>

                <div className="space-y-5">
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-[#25D366] transition-colors group">
                    <div className="w-12 h-12 bg-[#25D366] flex items-center justify-center clip-diagonal group-hover:scale-110 transition-transform">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <span className="font-mono text-sm block">+91 63817 77977</span>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">WhatsApp — Preferred</span>
                    </div>
                  </a>

                  <a href="tel:+916381777977" className="flex items-center gap-4 text-white/60 hover:text-amber-500 transition-colors group">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                      <Phone size={18} />
                    </div>
                    <span className="font-mono text-sm">+91 63817 77977</span>
                  </a>

                  <a href="mailto:hello.Nexgenscaleup@gmail.com" className="flex items-center gap-4 text-white/60 hover:text-amber-500 transition-colors group">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 transition-colors">
                      <Mail size={18} />
                    </div>
                    <span className="font-mono text-sm">hello.Nexgenscaleup@gmail.com</span>
                  </a>

                  <div className="flex items-center gap-4 text-white/60">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center">
                      <MapPin size={18} />
                    </div>
                    <span className="font-mono text-sm">Chennai, Tamil Nadu // India</span>
                  </div>

                  <div className="flex items-center gap-4 text-white/60">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-sm block">Mon – Sat: 9:00 AM – 7:00 PM</span>
                      <span className="text-[10px] font-mono text-white/40">Sunday: Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center bg-black/50 p-10 clip-diagonal-bordered">
                <MessageCircle size={48} className="text-[#25D366] mb-6" />
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight mb-3 text-center">WhatsApp is the<br />Fastest Way</h3>
                <p className="text-white/50 text-sm text-center mb-8 max-w-sm">
                  Just send us a message with your requirement. No forms, no sign-ups. We'll respond in Tamil or English.
                </p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="w-full h-16 bg-[#25D366] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#1da851] transition-colors flex items-center justify-center gap-3 clip-diagonal">
                  <MessageCircle size={18} /> Open WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="bg-black pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="font-display font-bold text-2xl tracking-tighter flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-amber-500 text-black flex items-center justify-center font-mono text-[8px] font-bold clip-diagonal">EA</div>
              Expert<span className="text-white/40">Assist</span>
            </div>
            <p className="text-white/50 font-light text-sm mb-4">Trusted document assistance service in Chennai, Tamil Nadu. Part of the NexGenScaleUp ecosystem.</p>
            <div className="text-xs font-mono text-white/30 uppercase tracking-widest">Mon-Sat: 9AM-7PM IST</div>
          </div>

          <div>
            <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-5">Services</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li>Passport Services</li>
              <li>PAN Card Services</li>
              <li>Voter ID Services</li>
              <li>Government Certificates</li>
              <li>Business Registrations</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest mb-5">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/60">
              <li><a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">WhatsApp: +91 63817 77977</a></li>
              <li><a href="mailto:hello.Nexgenscaleup@gmail.com" className="hover:text-amber-500 transition-colors">hello.Nexgenscaleup@gmail.com</a></li>
              <li>Chennai, Tamil Nadu, India</li>
              <li><a href="https://nexgenscaleup.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">nexgenscaleup.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">
            © {new Date().getFullYear()} ExpertAssist by NexGenScaleUp. All rights reserved.
          </p>
          <p className="text-[10px] font-mono text-white/20 max-w-2xl mx-auto">
            Disclaimer: We are a private document assistance service. We are not a government office or portal. We assist with applications, corrections, and registrations through proper channels.
          </p>
        </div>
      </div>
    </footer>
  );
}

// --- WhatsApp Float ---
function WhatsAppFloat() {
  return (
    <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
      <MessageCircle size={28} color="white" fill="white" />
    </a>
  );
}

// --- App ---
export default function App() {
  return (
    <div className="selection:bg-amber-500 selection:text-black">
      <Noise />
      <Navbar />
      <main>
        <Hero />
        <QuickServices />
        <Services />
        <HowItWorks />
        <TrustSection />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
