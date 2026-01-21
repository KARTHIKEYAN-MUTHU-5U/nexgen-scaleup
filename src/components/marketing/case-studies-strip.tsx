'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, BarChart3, TrendingUp, Users } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const cases = [
    {
        id: 1,
        client: 'FinGrow',
        title: 'Scaling FinTech User Base',
        category: 'App Development',
        stats: [
            { label: 'User Retention', value: '85%', icon: Users },
            { label: 'DAU Growth', value: '3x', icon: TrendingUp },
        ],
        color: 'bg-blue-500',
        description: 'We rebuilt the onboarding flow using gamification mechanics, resulting in a massive boost in Day-1 retention.',
        tags: ['Next.js', 'React Native', 'Gamification']
    },
    {
        id: 2,
        client: 'LuxMart',
        title: 'E-commerce Revenue Engine',
        category: 'Digital Marketing',
        stats: [
            { label: 'Monthly Revenue', value: '$200k', icon: BarChart3 },
            { label: 'ROAS', value: '4.5x', icon: TrendingUp },
        ],
        color: 'bg-purple-500',
        description: 'Implemented an AI-driven ad strategy and personalized email sequences that unlocked new revenue streams.',
        tags: ['Shopify', 'Klaviyo', 'Meta Ads']
    },
    {
        id: 3,
        client: 'SupportBot.ai',
        title: 'WhatsApp Automation at Scale',
        category: 'Automation',
        stats: [
            { label: 'Ticket Reduction', value: '50%', icon: MessageSquareIcon },
            { label: 'Response Time', value: '<2s', icon: ZapIcon },
        ],
        color: 'bg-green-500',
        description: 'Deployed a custom LLM-powered WhatsApp agent that handles Tier 1 support queries automatically.',
        tags: ['WhatsApp API', 'OpenAI', 'Python']
    }
];

function MessageSquareIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    )
}

function ZapIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    )
}

export function CaseStudiesStrip() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-65%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8 px-4 md:px-20">

                    {/* Intro Card */}
                    <div className="flex h-[70vh] w-[80vw] md:w-[30vw] shrink-0 flex-col justify-center">
                        <h2 className="text-4xl md:text-6xl font-bold font-heading leading-tight mb-6">
                            Proven Results. <br />
                            <span className="text-muted-foreground">Real Impact.</span>
                        </h2>
                        <p className="text-lg text-foreground/70 mb-8 max-w-md">
                            We don't just ship code. We ship outcomes. Explore how we've helped our partners scale.
                        </p>
                        <div className="flex items-center gap-2 text-primary font-medium">
                            Scroll to explore <ArrowUpRight className="h-4 w-4" />
                        </div>
                    </div>

                    {/* Case Study Cards */}
                    {cases.map((project) => (
                        <div
                            key={project.id}
                            className="group relative h-[70vh] w-[85vw] md:w-[60vw] shrink-0 overflow-hidden rounded-3xl bg-secondary/50 border border-border transition-all hover:border-primary/50"
                        >
                            <div className={cn("absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20", project.color)} />

                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full bg-background/50 border border-border text-xs font-bold uppercase tracking-wider mb-4">
                                            {project.category}
                                        </span>
                                        <h3 className="text-3xl md:text-5xl font-bold font-heading mb-2">{project.title}</h3>
                                        <p className="text-xl font-medium text-foreground/60">{project.client}</p>
                                    </div>
                                    <Button variant="outline" size="icon" className="rounded-full h-12 w-12 shrink-0">
                                        <ArrowUpRight className="h-6 w-6" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                                    <div>
                                        <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-xs font-semibold px-2 py-1 bg-background rounded-md text-foreground/60">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {project.stats.map((stat, i) => (
                                            <div key={i} className="bg-background/80 backdrop-blur-sm p-4 rounded-2xl border border-border">
                                                <stat.icon className="h-5 w-5 text-primary mb-2" />
                                                <div className="text-2xl md:text-4xl font-bold">{stat.value}</div>
                                                <div className="text-xs text-foreground/60 uppercase font-semibold tracking-wide">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* CTA Card at the end */}
                    <div className="flex h-[70vh] w-[80vw] md:w-[30vw] shrink-0 flex-col justify-center items-center text-center bg-primary text-primary-foreground rounded-3xl p-8">
                        <h3 className="text-3xl font-bold mb-4">Ready to be our next success story?</h3>
                        <Button size="lg" variant="secondary" className="rounded-full px-8">
                            Start Your Project
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
