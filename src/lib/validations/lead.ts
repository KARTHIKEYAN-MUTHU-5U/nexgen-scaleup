import { z } from "zod";

export const leadSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    company: z.string().optional(),
    serviceInterest: z.enum([
        "Digital Marketing",
        "Web/App Development",
        "WhatsApp Automation",
        "AI/LLM Solutions",
        "Other"
    ]),
    budgetRange: z.enum([
        "Under $5k",
        "$5k - $10k",
        "$10k - $25k",
        "$25k+",
        "Not sure"
    ]),
    message: z.string().min(10, "Please provide more details about your project"),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
