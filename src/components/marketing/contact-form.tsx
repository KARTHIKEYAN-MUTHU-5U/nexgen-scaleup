'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { leadSchema, LeadFormValues } from "@/lib/validations/lead";
import { submitLead } from "@/app/actions/contact";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // We need to create these
import { Textarea } from "@/components/ui/textarea"; // We need to create these
import { Card } from "@/components/ui/card"; // We need to create these
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";

export function ContactForm() {
    const [isPending, startTransition] = useTransition();
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            company: "",
            serviceInterest: "Digital Marketing",
            budgetRange: "$5k - $10k",
            message: "",
        },
    });

    function onSubmit(data: LeadFormValues) {
        setError(null);
        startTransition(async () => {
            const result = await submitLead(data);
            if (result.error) {
                setError(result.error);
            } else {
                setIsSuccess(true);
                form.reset();
            }
        });
    }

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 bg-green-50/50 border border-green-200 rounded-xl"
            >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message Received!</h3>
                <p className="text-green-700">
                    Thanks for reaching out. We'll be in touch within 24 hours to schedule your strategy call.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => setIsSuccess(false)}>
                    Send another message
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-card border border-border rounded-2xl shadow-lg">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="John Doe" {...form.register("name")} />
                        {form.formState.errors.name && (
                            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@company.com" {...form.register("email")} />
                        {form.formState.errors.email && (
                            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone (Optional)</Label>
                        <Input id="phone" placeholder="+1 (555) 000-0000" {...form.register("phone")} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input id="company" placeholder="Acme Inc." {...form.register("company")} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Service Interest</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                            "Digital Marketing",
                            "Web/App Development",
                            "WhatsApp Automation",
                            "AI/LLM Solutions",
                            "Other"
                        ].map((service) => (
                            <div key={service} className="flex items-center">
                                <input
                                    type="radio"
                                    id={service}
                                    value={service}
                                    className="peer sr-only"
                                    {...form.register("serviceInterest")}
                                />
                                <Label
                                    htmlFor={service}
                                    className="flex flex-1 items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary peer-checked:border-primary peer-checked:bg-primary/5 cursor-pointer transition-all"
                                >
                                    {service}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Budget Range</Label>
                    <select
                        {...form.register("budgetRange")}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {[
                            "Under $5k",
                            "$5k - $10k",
                            "$10k - $25k",
                            "$25k+",
                            "Not sure"
                        ].map((range) => (
                            <option key={range} value={range}>{range}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Project Details</Label>
                    <Textarea
                        id="message"
                        placeholder="Tell us about your goals, timeline, and current challenges..."
                        className="min-h-[120px]"
                        {...form.register("message")}
                    />
                    {form.formState.errors.message && (
                        <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                    )}
                </div>

                {error && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
                        {error}
                    </div>
                )}

                <Button size="lg" className="w-full" disabled={isPending}>
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Book Strategy Call"
                    )}
                </Button>
            </form>
        </div>
    );
}
