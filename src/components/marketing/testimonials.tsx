'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const testimonials = [
    {
        id: 1,
        quote: "NexGen Scaleup transformed our marketing funnel. We saw a 300% increase in qualified leads within the first month.",
        author: "Sarah Johnson",
        role: "CMO, TechFlow",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
    },
    {
        id: 2,
        quote: "The team's understanding of AI and LLMs is unmatched. They built a custom agent that automated 40% of our support workload.",
        author: "David Chen",
        role: "Founder, DataSphere",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    },
    {
        id: 3,
        quote: "Professional, timely, and incredibly talented. The new website design perfectly captures our brand's premium value.",
        author: "Elena Rodriguez",
        role: "Director, Luxe Interiors",
        image: "https://i.pravatar.cc/150?u=a042581f4e29026705d"
    }
];

export function Testimonials() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">Trusted by Leaders</h2>
                </div>

                <div className="max-w-4xl mx-auto relative h-[300px] flex items-center justify-center">
                    {testimonials.map((item, index) => {
                        const isActive = index === active;
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: isActive ? 1 : 0,
                                    scale: isActive ? 1 : 0.8,
                                    zIndex: isActive ? 10 : 0
                                }}
                                transition={{ duration: 0.5 }}
                                className={cn(
                                    "absolute inset-0 flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-secondary/20 border border-border",
                                    !isActive && "pointer-events-none"
                                )}
                            >
                                <Quote className="w-12 h-12 text-primary/20 mb-6" />
                                <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 max-w-2xl">
                                    "{item.quote}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                        <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-foreground">{item.author}</div>
                                        <div className="text-sm text-primary">{item.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                active === i ? "bg-primary w-6" : "bg-muted-foreground/30"
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
