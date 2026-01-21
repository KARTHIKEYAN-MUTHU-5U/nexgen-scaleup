'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Search, PenTool, Code, Rocket, TrendingUp, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const steps = [
    {
        id: 1,
        title: 'Discover',
        icon: Search,
        description: 'We dive deep into your business goals, user needs, and market landscape.',
        deliverables: ['Strategy Workshop', 'Competitor Analysis', 'Technical Architecture', 'Project Roadmap'],
        color: 'bg-blue-500'
    },
    {
        id: 2,
        title: 'Design',
        icon: PenTool,
        description: 'We craft high-fidelity prototypes and design systems that align with your brand.',
        deliverables: ['UI/UX Wireframes', 'Interactive Prototypes', 'Design System', 'User Testing'],
        color: 'bg-purple-500'
    },
    {
        id: 3,
        title: 'Build',
        icon: Code,
        description: 'We engineer robust, scalable solutions using the latest tech stack.',
        deliverables: ['Full-Stack Development', 'API Integration', 'CMS Setup', 'Security Audits'],
        color: 'bg-indigo-500'
    },
    {
        id: 4,
        title: 'Launch',
        icon: Rocket,
        description: 'We deploy your product with zero downtime and ensure a smooth go-live.',
        deliverables: ['QA Testing', 'Cloud Deployment', 'Performance Optimization', 'SEO Setup'],
        color: 'bg-orange-500'
    },
    {
        id: 5,
        title: 'Optimize',
        icon: TrendingUp,
        description: 'We continuously monitor and improve your product based on real user data.',
        deliverables: ['Analytics Dashboard', 'A/B Testing', 'Conversion Optimization', 'Support & Maintenance'],
        color: 'bg-green-500'
    }
];

export function ProcessTimeline() {
    const [selectedStep, setSelectedStep] = useState<typeof steps[0] | null>(null);

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Our Process</h2>
                    <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
                        From discovery to deployment, our proven process ensures on-time delivery and stellar results.
                    </p>
                </div>

                {/* Timeline Steps */}
                <div className="relative">
                    {/* Connector Line */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary -translate-y-1/2 hidden md:block" />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative flex flex-col items-center text-center cursor-pointer"
                                onClick={() => setSelectedStep(step)}
                            >
                                <div className={cn(
                                    "w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 mb-6 relative z-10",
                                    step.color
                                )}>
                                    <step.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-sm text-foreground/70">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal / Overlay */}
            <AnimatePresence>
                {selectedStep && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedStep(null)}
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto grid place-items-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                            >
                                <div className={cn("p-6 text-white flex justify-between items-center", selectedStep.color)}>
                                    <div className="flex items-center gap-4">
                                        <selectedStep.icon className="w-8 h-8" />
                                        <h3 className="text-2xl font-bold font-heading">{selectedStep.title} Phase</h3>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setSelectedStep(null)} className="hover:bg-white/20 text-white">
                                        <X className="w-6 h-6" />
                                    </Button>
                                </div>

                                <div className="p-8">
                                    <p className="text-lg text-foreground/70 mb-6">
                                        {selectedStep.description}
                                    </p>

                                    <h4 className="font-semibold uppercase tracking-wider text-sm mb-4">Key Deliverables</h4>
                                    <ul className="space-y-3">
                                        {selectedStep.deliverables.map((item) => (
                                            <li key={item} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button className="w-full mt-8" onClick={() => setSelectedStep(null)}>
                                        Got it
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
