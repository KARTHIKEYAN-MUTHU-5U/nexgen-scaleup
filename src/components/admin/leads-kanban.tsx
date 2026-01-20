'use client';

import { useState } from 'react';
import { updateLeadStatus } from '@/app/actions/lead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from 'lucide-react';
// Note: lucide-react doesn't export Badge, we need shadcn Badge. 
// I'll use a simple div for badge if shadcn badge is missing, or I'll quickly implement it.
// I'll implement a local Badge component here or inline styles.
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// We'll shim a simple Badge since we didn't install it manually yet and shadcn failed.
function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        NEW: 'bg-blue-100 text-blue-800',
        CONTACTED: 'bg-yellow-100 text-yellow-800',
        PROPOSAL_SENT: 'bg-purple-100 text-purple-800',
        WON: 'bg-green-100 text-green-800',
        LOST: 'bg-red-100 text-red-800',
    };
    return (
        <span className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", colors[status] || 'bg-gray-100')}>
            {status.replace('_', ' ')}
        </span>
    );
}

type Lead = {
    id: string;
    name: string;
    email: string;
    serviceInterest: string | null;
    budgetRange: string | null;
    status: string;
    createdAt: Date;
};

const COLUMNS = [
    { id: 'NEW', label: 'New Leads' },
    { id: 'CONTACTED', label: 'Contacted' },
    { id: 'PROPOSAL_SENT', label: 'Proposal Sent' },
    { id: 'WON', label: 'Won' },
    { id: 'LOST', label: 'Lost' },
];

export function LeadsKanban({ initialLeads }: { initialLeads: Lead[] }) {
    const router = useRouter();
    const [leads, setLeads] = useState(initialLeads);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const handleStatusChange = async (leadId: string, newStatus: string) => {
        // Optimistic update
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
        setIsUpdating(leadId);

        const result = await updateLeadStatus(leadId, newStatus);
        if (!result.success) {
            // Revert if failed
            router.refresh(); // simplistic revert
        }
        setIsUpdating(null);
    };

    return (
        <div className="flex h-full gap-4 overflow-x-auto pb-4">
            {COLUMNS.map(col => (
                <div key={col.id} className="w-80 shrink-0 flex flex-col gap-4">
                    <div className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg">
                        <span className="font-semibold text-sm">{col.label}</span>
                        <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full border">
                            {leads.filter(l => l.status === col.id).length}
                        </span>
                    </div>

                    <div className="flex flex-col gap-3 h-full rounded-xl bg-secondary/20 p-2 min-h-[500px]">
                        {leads.filter(l => l.status === col.id).map(lead => (
                            <Card key={lead.id} className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow relative">
                                {isUpdating === lead.id && (
                                    <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                    </div>
                                )}
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-sm font-bold">{lead.name}</CardTitle>
                                        {/* Move Actions (Simple dropdown alternative) */}
                                        <select
                                            className="text-[10px] p-1 border rounded bg-transparent"
                                            value={lead.status}
                                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                                </CardHeader>
                                <CardContent className="p-4 pt-2 space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Budget</span>
                                        <span className="font-medium text-foreground">{lead.budgetRange}</span>
                                    </div>
                                    <div className="flex justify-between text-xs items-center">
                                        <span className="text-muted-foreground">Interest</span>
                                        <span className="inline-block px-1.5 py-0.5 bg-primary/10 text-primary rounded truncate max-w-[100px]">
                                            {lead.serviceInterest}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
