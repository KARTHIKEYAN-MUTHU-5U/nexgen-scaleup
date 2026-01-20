'use client';

import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, GraduationCap, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AcademySpotlight() {
    return (
        <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                            <GraduationCap className="w-4 h-4" />
                            NexGen Academy
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">
                            Master AI Engineering & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">LLMs in Production</span>
                        </h2>

                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            Stop watching specific tutorials. Build real-world AI agents, RAG systems, and fine-tuned models with our comprehensive flagship program.
                        </p>

                        <ul className="space-y-4 mb-10">
                            {[
                                '10 Modules: From Python Basics to MLOps',
                                'Quizzes & Certificates upon completion',
                                'Weekly Live Code Reviews',
                                'Access to Private Discord Community'
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-zinc-300">
                                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                                        <CheckCircle className="w-4 h-4 text-purple-400" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-4">
                            <Button size="lg" className="rounded-full bg-white text-black hover:bg-zinc-200">
                                Explore Curriculum
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full border-zinc-800 text-white hover:bg-zinc-800 hover:text-white">
                                <PlayCircle className="mr-2 w-4 h-4" />
                                Watch Preview
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Mock Course Player UI */}
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl">
                            <div className="h-8 bg-zinc-800 border-b border-zinc-700 flex items-center px-4 gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>

                            <div className="relative aspect-video bg-black flex items-center justify-center group cursor-pointer">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop')] bg-cover bg-center opacity-50 group-hover:opacity-30 transition-opacity" />
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                    <PlayCircle className="w-8 h-8 text-white fill-white/20" />
                                </div>

                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="text-sm font-medium mb-2 flex justify-between">
                                        <span>Module 4: Transformers & Attention</span>
                                        <span>12:45 / 45:00</span>
                                    </div>
                                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full w-1/3 bg-purple-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t border-zinc-800">
                                <div className="flex justify-between items-center text-sm text-zinc-400">
                                    <span className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> 8 Lessons</span>
                                    <span className="text-purple-400 font-medium">Coming Soon</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-zinc-800 border border-zinc-700 p-4 rounded-xl shadow-xl max-w-[200px]">
                            <div className="text-xs text-zinc-400 mb-2">Student Average Rating</div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-white">4.9</span>
                                <div className="flex text-yellow-500 mb-1">
                                    {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
