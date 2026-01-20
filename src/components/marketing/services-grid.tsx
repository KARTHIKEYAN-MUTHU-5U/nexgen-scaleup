'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Code2, MessageSquare, Rocket, Sparkles } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    gradient: string;
    details: {
        outcomes: string[];
        timeline: string;
        price: string;
    };
}

const services: Service[] = [
    {
        id: 'marketing',
        title: 'Digital Marketing',
        description: 'SEO, paid adds, and conversion funnels that scale revenue.',
        icon: Rocket,
        gradient: 'from-blue-600 to-indigo-600',
        details: {
            outcomes: ['2x Traffic Growth', 'High-Converting Funnels', 'Brand Authority'],
            timeline: '2-4 weeks',
            price: 'Starts at $2k/mo'
        }
    },
    {
        id: 'development',
        title: 'Web/App Development',
        description: 'High-performance websites and applications built for growth.',
        icon: Code2,
        gradient: 'from-purple-600 to-pink-600',
        details: {
            outcomes: ['Next.js / React', 'Mobile Apps', 'Scalable Backend'],
            timeline: '4-12 weeks',
            price: 'Starts at $5k'
        }
    },
    {
        id: 'whatsapp',
        title: 'WhatsApp Automation',
        description: 'Automate support and sales on the world\'s most popular app.',
        icon: MessageSquare,
        gradient: 'from-green-500 to-emerald-700',
        details: {
            outcomes: ['Official API', 'Chatbots', 'Campaign Management'],
            timeline: '1-3 weeks',
            price: 'Starts at $99/mo'
        }
    },
    {
        id: 'ai',
        title: 'AI/LLM Solutions',
        description: 'Custom AI agents and RAG systems tailored to your data.',
        icon: Sparkles,
        gradient: 'from-amber-500 to-orange-600',
        details: {
            outcomes: ['Custom GPTs', 'Data Analysis', 'Process Automation'],
            timeline: '4-8 weeks',
            price: 'Custom Quote'
        }
    }
];

function TiltCard({ service, index }: { service: Service; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    // Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;
        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{
                rotateX: isExpanded ? 0 : rotateX,
                rotateY: isExpanded ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
                "relative rounded-xl bg-card border border-border p-6 shadow-xl cursor-pointer transition-all duration-300",
                isExpanded ? "col-span-1 md:col-span-2 lg:col-span-2 row-span-2 z-20 scale-100" : "h-[300px] hover:shadow-2xl hover:border-primary/50"
            )}
        >
            <div style={{ transform: "translateZ(50px)" }} className="relative h-full flex flex-col justify-between">
                <div>
                    <div className={cn("inline-flex p-3 rounded-lg mb-4 text-white bg-gradient-to-br shadow-inner", service.gradient)}>
                        <service.icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                </div>

                <div className="mt-4">
                    {isExpanded ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 space-y-4 pt-4 border-t border-border"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-semibold text-sm uppercase tracking-wider text-primary mb-2">Outcomes</h4>
                                    <ul className="space-y-1">
                                        {service.details.outcomes.map((o) => (
                                            <li key={o} className="flex items-center text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                                                {o}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm uppercase tracking-wider text-primary mb-2">Details</h4>
                                    <p className="text-sm"><span className="font-medium">Timeline:</span> {service.details.timeline}</p>
                                    <p className="text-sm"><span className="font-medium">Starting:</span> {service.details.price}</p>
                                </div>
                            </div>
                            <Button className="w-full mt-4">Get Proposal</Button>
                        </motion.div>
                    ) : (
                        <div className="flex items-center text-sm font-medium text-primary mt-4 group-hover:underline">
                            Learn more <ArrowUpRight className="ml-1 w-4 h-4" />
                        </div>
                    )}
                </div>
            </div>

            {/* Background Shine */}
            <div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 pointer-events-none transition-opacity duration-300"
                style={{ transform: "translateZ(0px)" }}
            />
        </motion.div>
    );
}

export function ServicesGrid() {
    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                        Services designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">exponential growth</span>.
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        We combine creativity, engineering, and data to build digital products that win.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
                    {services.map((service, index) => (
                        <TiltCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
