import { prisma } from "@/lib/db/prisma";
import { LeadsKanban } from "@/components/admin/leads-kanban";

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
    // If DB connection fails (e.g. no docker), we handle it gracefully or let standard error boundary catch it.
    // For demo, we might want to return mock data if DB is empty, but let's assume DB works or will work.

    let leads = [];
    try {
        leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' },
        });
    } catch (e) {
        console.error("DB Error:", e);
        // Return empty or mock if needed
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 px-6 pt-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Lead Pipeline</h1>
                    <p className="text-muted-foreground">Manage and track incoming project requests.</p>
                </div>
                <div className="text-sm text-muted-foreground">
                    Total Leads: {leads.length}
                </div>
            </div>

            <div className="flex-1 overflow-hidden px-6 pb-6">
                <LeadsKanban initialLeads={leads} />
            </div>
        </div>
    );
}
