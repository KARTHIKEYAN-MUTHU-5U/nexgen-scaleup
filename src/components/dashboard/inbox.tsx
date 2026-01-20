'use client';

import * as React from "react"
import {
    Archive,
    ArchiveX,
    Clock,
    File,
    Inbox as InboxIcon,
    MessagesSquare,
    MoreVertical,
    Phone,
    Search,
    Send,
    Trash2,
    User,
    Video,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"

const mails = [
    {
        id: "1",
        name: "Alice Smith",
        email: "alice@example.com",
        subject: "Re: Project Update",
        text: "Hi, I wanted to check in on the progress of the project. Can we schedule a call?",
        date: "10:42 AM",
        read: false,
        labels: ["work", "important"],
    },
    {
        id: "2",
        name: "Bob Johnson",
        email: "bob@example.com",
        text: "The new designs look great! I have a few comments attached.",
        date: "Yesterday",
        read: true,
        labels: ["personal"],
    },
    {
        id: "3",
        name: "Charlie Davis",
        email: "charlie@example.com",
        text: "Are we still on for lunch tomorrow?",
        date: "Yesterday",
        read: true,
        labels: ["personal"],
    },
]

export function Inbox() {
    const [selectedMail, setSelectedMail] = React.useState(mails[0].id)
    const [inputText, setInputText] = React.useState("")

    return (
        <TooltipProvider delayDuration={0}>
            <div className="flex h-[calc(100vh-120px)] flex-col rounded-xl border bg-background shadow-sm md:flex-row overflow-hidden">

                {/* Sidebar: Conversation List */}
                <div className="w-full md:w-[320px] lg:w-[380px] flex flex-col border-r">
                    <div className="flex items-center p-4 border-b h-[60px]">
                        <div className="relative w-full">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search messages..." className="pl-8 bg-muted/50 border-none" />
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="flex flex-col gap-2 p-4 pt-0 mt-4">
                            {mails.map((item) => (
                                <button
                                    key={item.id}
                                    className={cn(
                                        "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                                        selectedMail === item.id && "bg-accent"
                                    )}
                                    onClick={() => setSelectedMail(item.id)}
                                >
                                    <div className="flex w-full flex-col gap-1">
                                        <div className="flex items-center">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="font-semibold">{item.name}</div>
                                            </div>
                                            <div
                                                className={cn(
                                                    "ml-auto text-xs",
                                                    selectedMail === item.id
                                                        ? "text-foreground"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                {item.date}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="line-clamp-2 text-xs text-muted-foreground pl-10">
                                        {item.text.substring(0, 300)}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Main Chat Area */}
                <div className="flex flex-col flex-1 min-w-0">
                    {/* Chat Header */}
                    <div className="flex items-center justify-between p-4 border-b h-[60px]">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback>AS</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold text-sm">Alice Smith</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500" /> Online
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                            <Separator orientation="vertical" className="h-6" />
                            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                        </div>
                    </div>

                    {/* Messages Scroll Area */}
                    <ScrollArea className="flex-1 p-4 bg-muted/30">
                        <div className="space-y-4">
                            <div className="flex justify-center my-4">
                                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">Today</span>
                            </div>

                            {/* Received Bubble */}
                            <div className="flex gap-3 max-w-[80%]">
                                <Avatar className="h-8 w-8 mt-1">
                                    <AvatarFallback>AS</AvatarFallback>
                                </Avatar>
                                <div className="bg-white border rounded-2xl rounded-tl-none p-3 shadow-sm text-sm">
                                    <p>Hi, I wanted to check in on the progress of the project.</p>
                                    <p className="mt-1">Can we schedule a call?</p>
                                    <span className="text-[10px] text-muted-foreground block text-right mt-1">10:42 AM</span>
                                </div>
                            </div>

                            {/* Sent Bubble */}
                            <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                                <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-3 shadow-sm text-sm">
                                    <p>Hey Alice! Sure thing.</p>
                                    <p className="mt-1">I have some updates ready. How does 2 PM work?</p>
                                    <span className="text-[10px] text-primary-foreground/70 block text-right mt-1">10:45 AM</span>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 border-t bg-background">
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="shrink-0">
                                <File className="h-4 w-4" />
                            </Button>
                            <Input
                                placeholder="Type a message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="flex-1"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        // Send logic
                                        setInputText("")
                                    }
                                }}
                            />
                            <Button className="shrink-0 gap-2">
                                <Send className="h-4 w-4" /> Send
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
