'use server';

import { leadSchema, LeadFormValues } from "@/lib/validations/lead";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function submitLead(data: LeadFormValues) {
    const result = leadSchema.safeParse(data);

    if (!result.success) {
        return { error: "Invalid form data" };
    }

    try {
        await prisma.lead.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                phone: result.data.phone || "",
                serviceInterest: result.data.serviceInterest,
                budgetRange: result.data.budgetRange,
                message: result.data.message,
                status: "NEW", // Default status
            },
        });

        // In a real app, send email notification here via Resend/SendGrid

        revalidatePath("/admin/leads");
        return { success: true };
    } catch (error) {
        console.error("Failed to submit lead:", error);
        return { error: "Something went wrong. Please try again." };
    }
}
