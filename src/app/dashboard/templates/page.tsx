import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Clock, Copy, Plus, Search, XCircle } from "lucide-react";
import Link from "next/link";

const templates = [
    {
        id: "promo_summer_24",
        name: "promo_summer_24",
        language: "en_US",
        category: "MARKETING",
        status: "APPROVED",
        preview: "Hi {{1}}, our Summer Sale is now live! Get {{2}}% off on all items.",
    },
    {
        id: "order_confirm_v2",
        name: "order_confirm_v2",
        language: "en_US",
        category: "UTILITY",
        status: "APPROVED",
        preview: "Your order {{1}} has been confirmed and will ship shortly.",
    },
    {
        id: "account_alert_otp",
        name: "account_alert_otp",
        language: "en_US",
        category: "AUTHENTICATION",
        status: "REJECTED",
        preview: "Your OTP code is {{1}}. Do not share this with anyone.",
    },
    {
        id: "abandoned_cart",
        name: "abandoned_cart",
        language: "es_MX",
        category: "MARKETING",
        status: "PENDING",
        preview: "Hola {{1}}, notamos que dejaste items en tu carrito...",
    },
];

export default function TemplatesPage() {
    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Message Templates</h1>
                    <p className="text-muted-foreground">Manage templates approved by Meta for starting conversations.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Create Template
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search templates..."
                        className="pl-8"
                    />
                </div>
                {/* Add Filters here if needed */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {templates.map(tpl => (
                    <TemplateCard key={tpl.id} template={tpl} />
                ))}
            </div>
        </div>
    );
}

function TemplateCard({ template }: { template: any }) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex flex-col gap-1">
                    <CardTitle className="text-base font-mono">{template.name}</CardTitle>
                    <CardDescription className="text-xs">{template.language} • {template.category}</CardDescription>
                </div>
                <StatusBadge status={template.status} />
            </CardHeader>
            <CardContent className="mt-4 flex-1">
                <div className="bg-muted/50 p-3 rounded-md text-sm text-muted-foreground font-mono leading-relaxed min-h-[80px]">
                    {template.preview}
                </div>
            </CardContent>
            <CardFooter className="pt-2 border-t">
                <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-primary">
                    <Copy className="mr-2 h-3 w-3" /> Copy Snippet
                </Button>
            </CardFooter>
        </Card>
    )
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'APPROVED') {
        return (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
                <CheckCircle2 className="w-3 h-3" /> Approved
            </Badge>
        )
    }
    if (status === 'PENDING') {
        return (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
                <Clock className="w-3 h-3" /> Pending
            </Badge>
        )
    }
    return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
            <XCircle className="w-3 h-3" /> Rejected
        </Badge>
    )
}
