import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";

interface WhatsAppPreviewProps {
    message: string;
    mediaUrl?: string; // Optional image/video header
    footer?: string;
    buttons?: string[];
}

export function WhatsAppPreview({ message, mediaUrl, footer, buttons }: WhatsAppPreviewProps) {
    return (
        <div className="w-[300px] h-[600px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden relative mx-auto">
            {/* Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-zinc-800 z-20 flex justify-center rounded-b-xl">
                <div className="w-1/3 h-full bg-black rounded-b-lg" />
            </div>

            {/* Top Bar */}
            <div className="bg-[#075E54] h-16 flex items-end pb-2 px-4 shadow-md z-10 relative">
                <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 rounded-full bg-white flex-shrink-0" />
                    <div className="text-white text-sm font-medium flex-1">NexGen Brand</div>
                    <div className="text-white/70 text-xs">Business Account</div>
                </div>
            </div>

            {/* Chat Background */}
            <div className="absolute inset-0 top-16 bg-[#efe7dd] bg-opacity-90 overflow-y-auto p-4 flex flex-col gap-2">
                {/* Background pattern simulation */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')" }} />

                {/* Message Bubble */}
                <div className="bg-white rounded-lg p-1 shadow-sm max-w-[85%] self-start relative z-10">
                    {mediaUrl && (
                        <div className="rounded overflow-hidden mb-1">
                            <img src={mediaUrl} alt="Header" className="w-full h-auto object-cover" />
                        </div>
                    )}
                    <div className="px-2 pt-1 pb-4 text-sm text-zinc-800 whitespace-pre-wrap leading-relaxed">
                        {message || "Enter your message text..."}
                    </div>
                    {footer && (
                        <div className="px-2 pb-2 text-[10px] text-zinc-500">
                            {footer}
                        </div>
                    )}
                    <div className="absolute bottom-1 right-2 text-[10px] text-zinc-500 flex items-center gap-1">
                        <span>10:42 AM</span>
                    </div>
                </div>

                {/* Interactive Buttons (Quick Reply / CTA) */}
                {buttons && buttons.length > 0 && (
                    <div className="flex flex-col gap-2 self-start max-w-[85%] z-10 w-full">
                        {buttons.map((btn, i) => (
                            <div key={i} className="bg-white rounded-lg p-3 shadow-sm text-center text-[#00A884] text-sm font-medium cursor-pointer hover:bg-zinc-50 transition-colors">
                                {btn}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom Bar Input Mock */}
            <div className="absolute bottom-0 inset-x-0 h-16 bg-[#f0f2f5] flex items-center px-2 gap-2">
                <div className="w-8 h-8 rounded-full bg-zinc-300" />
                <div className="flex-1 h-10 bg-white rounded-2xl border-none" />
                <div className="w-10 h-10 rounded-full bg-[#00A884] flex items-center justify-center">
                    <div className="text-white">➤</div>
                </div>
            </div>
        </div>
    );
}
