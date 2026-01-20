'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h3 className="text-lg font-medium">Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your account settings and WhatsApp API credentials.
                </p>
            </div>
            <Separator />

            <Card>
                <CardHeader>
                    <CardTitle>WhatsApp Configuration</CardTitle>
                    <CardDescription>
                        Connect your Meta Business Account. You can find these details in the Meta Developer Portal.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="token">Permanent Access Token</Label>
                        <Input id="token" type="password" placeholder="EAAG..." />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="biz-id">Phone Number ID</Label>
                        <Input id="biz-id" placeholder="1029384..." />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="waba-id">WhatsApp Business Account ID</Label>
                        <Input id="waba-id" placeholder="1029384..." />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Save Configuration</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Webhook Setup</CardTitle>
                    <CardDescription>
                        Configure your webhook URL in Meta to receive messages.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 p-2 bg-muted rounded border font-mono text-sm break-all">
                            https://nexgen-scaleup.vercel.app/api/webhooks/whatsapp
                        </div>
                        <Button variant="outline" size="sm">Copy</Button>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2">Verify Token: `nexgen_verify_token`</p>
                </CardContent>
            </Card>
        </div>
    )
}
