import { motion } from 'motion/react';
import { Droplets, ArrowRight, Mail } from 'lucide-react';
import './index.css';

export default function App() {
  return (
    <div className="selection:bg-cyan-400 selection:text-black">
      {/* Noise */}
      <div className="noise-bg mix-blend-overlay"></div>

      {/* Full screen coming soon */}
      <div className="min-h-screen flex flex-col items-center justify-center relative px-5">
        {/* Grid bg */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_30%,transparent_100%)] pointer-events-none" />

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative z-10 max-w-3xl"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-3 border border-white/10 px-5 py-2.5 mb-12 bg-black/40 backdrop-blur-md clip-diagonal">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">System Status: Building</span>
          </div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto w-24 h-24 border border-cyan-400/20 bg-cyan-400/5 flex items-center justify-center mb-10 clip-diagonal"
          >
            <Droplets size={40} className="text-cyan-400" />
          </motion.div>

          {/* Title */}
          <h1 className="font-display text-[3rem] sm:text-[5rem] md:text-[7rem] font-bold leading-[0.85] tracking-tighter uppercase mb-2">
            <span className="block text-white">WATER.</span>
            <span className="block text-cyan-400">NEXGEN</span>
            <span className="block" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>CORE</span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/50 text-lg md:text-xl font-light max-w-xl mx-auto mt-8 mb-12 leading-relaxed"
          >
            Next-generation water delivery & management platform. Currently under active development by the NexGenScaleUp engineering team.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="mailto:hello.Nexgenscaleup@gmail.com?subject=water.NexGenCore%20-%20Early%20Access"
              className="h-14 px-8 bg-cyan-400 text-black font-semibold text-sm uppercase tracking-wider hover:bg-cyan-300 transition-colors flex items-center gap-3 clip-diagonal"
            >
              <Mail size={16} />
              Request Early Access
              <ArrowRight size={14} />
            </a>
            <a
              href="https://nexgenscaleup.com"
              className="h-14 px-8 border border-white/10 text-white/60 text-sm font-mono uppercase tracking-wider hover:border-cyan-400/50 hover:text-white transition-all flex items-center gap-3"
            >
              ← Back to NexGenScaleUp
            </a>
          </motion.div>

          {/* Footer stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-20 grid grid-cols-3 gap-8 border-t border-white/5 pt-8 max-w-md mx-auto"
          >
            {[
              { metric: 'Q3 2025', desc: 'TARGET LAUNCH' },
              { metric: 'B2B', desc: 'MARKET FOCUS' },
              { metric: 'TN', desc: 'INITIAL REGION' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-mono text-lg text-cyan-400 font-bold mb-1">{stat.metric}</div>
                <div className="text-[8px] font-mono text-white/30 tracking-widest uppercase">{stat.desc}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 py-4 px-5 flex justify-between items-center text-[10px] font-mono text-white/20 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} NexGenScaleUp</span>
          <span>water.nexgenscaleup.com</span>
        </div>
      </div>
    </div>
  );
}
