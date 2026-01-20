'use server';

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(leadId: string, newStatus: string) {
    try {
        await prisma.lead.update({
            where: { id: leadId },
            data: { status: newStatus as any },
        });
        revalidatePath("/admin/leads");
        return { success: true };
    } catch (error) {
        console.error("Failed to update lead status:", error);
        return { error: "Failed to update status" };
    }
}
