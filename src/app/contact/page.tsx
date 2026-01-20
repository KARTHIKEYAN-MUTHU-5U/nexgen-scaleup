import { ContactForm } from "@/components/marketing/contact-form";

export const metadata = {
    title: "Contact Us | NexGen Scaleup",
    description: "Book a strategy call to discuss your AI or automation project.",
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Let's Build Something Great</h1>
                    <p className="text-xl text-muted-foreground">
                        Whether you need a custom AI agent, a WhatsApp bot, or a complete digital overhaul, we're ready to help.
                    </p>
                </div>

                <ContactForm />
            </div>
        </div>
    );
}
