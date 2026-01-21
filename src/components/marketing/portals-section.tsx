"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, GraduationCap, Shield } from "lucide-react";

export function PortalsSection() {
    const portals = [
        {
            title: "Business Portal",
            description: "Manage your digital presence, view analytics, and track campaigns.",
            icon: Briefcase,
            href: "/dashboard",
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-500/10 to-cyan-500/10",
        },
        {
            title: "Academy Portal",
            description: "Access AI/ML courses, track progress, and earn certifications.",
            icon: GraduationCap,
            href: "/academy",
            gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-500/10 to-pink-500/10",
        },
        {
            title: "Admin Portal",
            description: "Full platform control, user management, and system configuration.",
            icon: Shield,
            href: "/admin",
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-500/10 to-red-500/10",
        },
    ];

    return (
        <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Access Your Portals
                    </h2>
                    <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                        Choose your destination to manage your business, learn new skills, or configure the platform.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {portals.map((portal) => {
                        const Icon = portal.icon;
                        return (
                            <Link
                                key={portal.href}
                                href={portal.href}
                                className="group block"
                            >
                                <div className={`relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${portal.bgGradient} p-8 h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-transparent`}>
                                    {/* Animated gradient overlay on hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                    {/* Icon */}
                                    <div className={`relative mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br ${portal.gradient}`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative">
                                        <h3 className="text-2xl font-bold font-heading mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                            {portal.title}
                                        </h3>
                                        <p className="text-foreground/70 mb-6">
                                            {portal.description}
                                        </p>

                                        {/* CTA Button */}
                                        <Button
                                            variant="ghost"
                                            className={`group-hover:bg-gradient-to-r ${portal.gradient} group-hover:text-white transition-all duration-300`}
                                        >
                                            Enter Portal
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Button>
                                    </div>

                                    {/* Corner accent */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${portal.gradient} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity duration-300`} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
