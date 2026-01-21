import { Metadata } from 'next';
import { ArrowRight, CheckCircle, TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Case Studies | NexGen Scaleup',
    description: 'Explore our success stories and proven results across digital marketing, web development, and automation.',
};

const caseStudies = [
    {
        id: 1,
        title: 'FinGrow - Scaling FinTech User Base',
        client: 'FinGrow Technologies',
        industry: 'FinTech',
        services: ['Digital Marketing', 'Web Development'],
        challenge: 'FinGrow needed to scale their user acquisition while maintaining compliance and building trust in a competitive market.',
        solution: 'We implemented a comprehensive digital marketing strategy combining SEO, targeted ads, and content marketing, alongside a redesigned web platform optimized for conversions.',
        results: [
            { metric: '300%', description: 'Increase in monthly sign-ups' },
            { metric: '65%', description: 'Reduction in cost per acquisition' },
            { metric: '4.8/5', description: 'User satisfaction score' },
        ],
        technologies: ['Next.js', 'TypeScript', 'Google Ads', 'SEO'],
        image: '/case-studies/fingrow.jpg',
        gradient: 'from-blue-600 to-cyan-600',
    },
    {
        id: 2,
        title: 'EduPrime - AI-Powered Learning Platform',
        client: 'EduPrime Academy',
        industry: 'Education',
        services: ['Web/App Development', 'AI/LLM Solutions'],
        challenge: 'EduPrime wanted to create an engaging, personalized learning experience using AI while ensuring scalability for thousands of concurrent users.',
        solution: 'Built a full-stack learning management system with AI-powered content recommendations, real-time progress tracking, and interactive quizzes.',
        results: [
            { metric: '10,000+', description: 'Active students enrolled' },
            { metric: '89%', description: 'Course completion rate' },
            { metric: '40%', description: 'Increase in engagement' },
        ],
        technologies: ['React', 'Node.js', 'PostgreSQL', 'OpenAI API'],
        image: '/case-studies/eduprime.jpg',
        gradient: 'from-purple-600 to-pink-600',
    },
    {
        id: 3,
        title: 'RetailPro - WhatsApp Sales Automation',
        client: 'RetailPro Solutions',
        industry: 'E-commerce',
        services: ['WhatsApp Automation', 'Web Development'],
        challenge: 'RetailPro struggled with manual customer support and order management via WhatsApp, leading to missed opportunities and slow response times.',
        solution: 'Developed an automated WhatsApp bot integrated with their e-commerce platform for order tracking, customer queries, and personalized product recommendations.',
        results: [
            { metric: '80%', description: 'Reduction in response time' },
            { metric: '45%', description: 'Increase in sales conversions' },
            { metric: '24/7', description: 'Automated customer support' },
        ],
        technologies: ['WhatsApp Business API', 'Node.js', 'Redis', 'AI Chatbot'],
        image: '/case-studies/retailpro.jpg',
        gradient: 'from-green-600 to-teal-600',
    },
    {
        id: 4,
        title: 'HealthHub - Telemedicine Platform Launch',
        client: 'HealthHub Clinics',
        industry: 'Healthcare',
        services: ['Web/App Development', 'Digital Marketing'],
        challenge: 'HealthHub needed a secure, HIPAA-compliant telemedicine platform and effective marketing to reach patients during the telehealth boom.',
        solution: 'Created a comprehensive telemedicine platform with video consultations, appointment scheduling, and electronic prescriptions, paired with targeted digital campaigns.',
        results: [
            { metric: '5,000+', description: 'Patient consultations/month' },
            { metric: '95%', description: 'Platform uptime' },
            { metric: '200%', description: 'ROI on ad spend' },
        ],
        technologies: ['Next.js', 'WebRTC', 'Socket.io', 'Stripe'],
        image: '/case-studies/healthhub.jpg',
        gradient: 'from-red-600 to-orange-600',
    },
];

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 bg-gradient-to-br from-background via-secondary/20 to-background overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                            Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Results</span> for Real Businesses
                        </h1>
                        <p className="text-xl text-foreground/70 mb-8">
                            Explore how we've helped businesses like yours achieve exponential growth through digital marketing, development, and automation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-16 container px-4 md:px-6">
                <div className="space-y-24">
                    {caseStudies.map((study, index) => (
                        <div
                            key={study.id}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                        >
                            {/* Image/Visual */}
                            <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                <div className={`relative aspect-video rounded-2xl bg-gradient-to-br ${study.gradient} p-1 shadow-2xl`}>
                                    <div className="absolute inset-0 rounded-2xl bg-slate-900 opacity-90" />
                                    <div className="relative h-full flex items-center justify-center text-white text-2xl font-bold">
                                        {study.title}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                <div>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {study.services.map(service => (
                                            <span key={service} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{study.title}</h2>
                                    <p className="text-foreground/60">{study.client} • {study.industry}</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                            <Target className="w-5 h-5 text-primary" />
                                            Challenge
                                        </h3>
                                        <p className="text-foreground/70">{study.challenge}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            Solution
                                        </h3>
                                        <p className="text-foreground/70">{study.solution}</p>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    {study.results.map((result, idx) => (
                                        <div key={idx} className="text-center p-4 rounded-xl bg-secondary/50 border border-border">
                                            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${study.gradient} text-transparent bg-clip-text`}>
                                                {result.metric}
                                            </div>
                                            <div className="text-xs text-foreground/60 mt-1">{result.description}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Technologies */}
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground/60 mb-2">Technologies Used:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {study.technologies.map(tech => (
                                            <span key={tech} className="px-2 py-1 text-xs rounded bg-slate-800 text-gray-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-primary/10 to-purple-600/10">
                <div className="container px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Ready to Write Your Success Story?
                        </h2>
                        <p className="text-xl text-foreground/70 mb-8">
                            Let's discuss how we can help you achieve similar results for your business.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/">
                                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90">
                                    Start Your Project
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline" size="lg" className="rounded-full">
                                    View All Services
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
