'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, PlayCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { useContactModal } from '@/contexts/contact-modal-context';
import { useRouter } from 'next/navigation';

export function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const { openContactModal } = useContactModal();
    const router = useRouter();

    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-background">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent-foreground/10 rounded-full blur-[100px] animate-pulse delay-75" />
                <div className="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-purple-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">

                {/* Animated Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border backdrop-blur-sm text-sm text-secondary-foreground mb-6"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Accepting New Projects for Q1 2026
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-heading max-w-4xl bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60"
                >
                    We build <span className="text-primary">growth engines</span>, products, and automation.
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mt-6 text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed"
                >
                    Digital marketing, web/app development, and WhatsApp automation for modern businesses — plus an advanced AI/LLM academy.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Button
                        size="lg"
                        onClick={() => openContactModal('Strategy Call')}
                        className="rounded-full text-base h-12 px-8 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-105"
                    >
                        Book a Strategy Call
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => router.push('/case-studies')}
                        className="rounded-full text-base h-12 px-8 border-border bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground backdrop-filter transition-all hover:scale-105"
                    >
                        View Case Studies
                        <PlayCircle className="ml-2 h-4 w-4" />
                    </Button>
                </motion.div>

                {/* Trust Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-16 pt-8 border-t border-border/50 w-full max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground"
                >
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-8 w-8 rounded-full bg-slate-200 border-2 border-background flex items-center justify-center text-[10px] font-bold">
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex text-yellow-500">
                                <Star className="h-3 w-3 fill-current" />
                                <Star className="h-3 w-3 fill-current" />
                                <Star className="h-3 w-3 fill-current" />
                                <Star className="h-3 w-3 fill-current" />
                                <Star className="h-3 w-3 fill-current" />
                            </div>
                            <span className="text-xs font-medium">Trusted by 50+ Pioneers</span>
                        </div>
                    </div>

                    <div className="flex gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                        {/* Placeholder Logos */}
                        <span className="font-bold tracking-widest text-lg">ACME</span>
                        <span className="font-bold tracking-widest text-lg">GLOBEX</span>
                        <span className="font-bold tracking-widest text-lg">SOYJUENCE</span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50"
            >
                <span className="text-xs uppercase tracking-widest mb-2 block text-center">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-muted-foreground/50 to-transparent mx-auto" />
            </motion.div>
        </section>
    );
}
