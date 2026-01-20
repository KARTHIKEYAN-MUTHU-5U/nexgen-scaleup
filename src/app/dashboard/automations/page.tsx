import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, MessageSquare, Plus, Zap } from "lucide-react";

export default function AutomationsPage() {
    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Automations</h1>
                    <p className="text-muted-foreground">Create automated workflows for your customers.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Workflow
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-dashed flex flex-col items-center justify-center p-8 bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer min-h-[200px]">
                    <Plus className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="font-semibold text-lg">Create from Scratch</h3>
                </Card>

                <WorkflowCard
                    title="Welcome Series"
                    description="Send a welcome message when a new contact is added."
                    icon={<Zap className="text-yellow-500" />}
                    active
                />

                <WorkflowCard
                    title="Away Message"
                    description="Auto-reply outside of business hours."
                    icon={<ClockIcon className="text-blue-500" />}
                    active={false}
                />
            </div>
        </div>
    )
}

function WorkflowCard({ title, description, icon, active }: any) {
    return (
        <Card className="relative hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 text-sm">
                <div className="p-2 bg-primary/10 rounded-lg">
                    {icon}
                </div>
                <Badge variant={active ? "default" : "secondary"}>
                    {active ? "Active" : "Paused"}
                </Badge>
            </CardHeader>
            <CardContent className="mt-4">
                <CardTitle className="text-lg mb-2">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>

                <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3" /> Trigger: Contact Created
                    </div>
                    <ArrowRight className="h-3 w-3" />
                    <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> Send Message
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function Badge({ children, variant }: any) {
    const bg = variant === 'default' ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500";
    return <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${bg}`}>{children}</span>
}

function ClockIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
