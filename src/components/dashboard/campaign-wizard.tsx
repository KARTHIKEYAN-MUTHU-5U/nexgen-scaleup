'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { WhatsAppPreview } from '@/components/dashboard/whatsapp-preview';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function CampaignWizard() {
    const [step, setStep] = useState(1);
    const [content, setContent] = useState("");
    const [footer, setFooter] = useState("");
    const [headerType, setHeaderType] = useState("none");
    const [date, setDate] = useState<Date>();

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-100px)]">
            {/* Simulation / Preview Panel */}
            <div className="bg-muted/30 rounded-2xl flex items-center justify-center p-8 border">
                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Live Preview</h3>
                    <WhatsAppPreview
                        message={content}
                        mediaUrl={headerType === 'image' ? 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=60' : undefined}
                        footer={footer}
                        buttons={['Visit Website', 'Unsubscribe']}
                    />
                </div>
            </div>

            {/* Configuration Panel */}
            <div className="flex flex-col">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold">New Campaign</h1>
                        <div className="text-sm font-medium text-muted-foreground">Step {step} of 3</div>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }} />
                    </div>
                </div>

                <Card className="flex-1 flex flex-col">
                    <CardHeader>
                        <CardTitle>{step === 1 ? 'Details & Audience' : step === 2 ? 'Message Content' : 'Schedule & Review'}</CardTitle>
                        <CardDescription>
                            {step === 1 && 'Define who you are targeting for this blast.'}
                            {step === 2 && 'Craft your message. Use {{name}} variables for personalization.'}
                            {step === 3 && 'Pick a time to send and confirm details.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-6">
                        {step === 1 && (
                            <>
                                <div className="space-y-2">
                                    <Label>Campaign Name</Label>
                                    <Input placeholder="e.g. Summer Sale Promo" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Audience Segment</Label>
                                    <RadioGroup defaultValue="all">
                                        <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <RadioGroupItem value="all" id="r1" />
                                            <Label htmlFor="r1" className="cursor-pointer">All Contacts (12,384)</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <RadioGroupItem value="new" id="r2" />
                                            <Label htmlFor="r2" className="cursor-pointer">New Leads (Last 30 Days)</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <RadioGroupItem value="vip" id="r3" />
                                            <Label htmlFor="r3" className="cursor-pointer">VIP Customers</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="space-y-2">
                                    <Label>Header Type</Label>
                                    <div className="flex gap-2">
                                        <Button variant={headerType === 'none' ? 'default' : 'outline'} size="sm" onClick={() => setHeaderType('none')}>None</Button>
                                        <Button variant={headerType === 'image' ? 'default' : 'outline'} size="sm" onClick={() => setHeaderType('image')}>Image</Button>
                                        <Button variant={headerType === 'video' ? 'default' : 'outline'} size="sm" onClick={() => setHeaderType('video')}>Video</Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Message Body</Label>
                                    <Textarea
                                        placeholder="Hi {{name}}, we have a special offer for you!"
                                        className="min-h-[150px] font-mono text-sm"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                    <p className="text-xs text-muted-foreground">Type {'{{'} to insert variables.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Footer Text (Optional)</Label>
                                    <Input
                                        placeholder="Reply STOP to unsubscribe"
                                        value={footer}
                                        onChange={(e) => setFooter(e.target.value)}
                                    />
                                </div>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <Label>Schedule Send Time</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    onSelect={setDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>

                                    <Separator />

                                    <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
                                        <h4 className="font-semibold text-yellow-800 text-sm mb-2">Cost Estimation</h4>
                                        <div className="flex justify-between text-sm text-yellow-700">
                                            <span>Target Audience</span>
                                            <span>2,400 contacts</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-yellow-700">
                                            <span>Per Message Cost</span>
                                            <span>$0.015</span>
                                        </div>
                                        <div className="border-t border-yellow-200 my-2 pt-2 flex justify-between font-bold text-yellow-900">
                                            <span>Total Forecast</span>
                                            <span>$36.00</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>

                    <Separator />

                    <div className="p-6 flex justify-between">
                        <Button variant="ghost" onClick={prevStep} disabled={step === 1}>Back</Button>
                        {step < 3 ? (
                            <Button onClick={nextStep}>Next Step</Button>
                        ) : (
                            <Button className="bg-green-600 hover:bg-green-700">Launch Campaign</Button>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
