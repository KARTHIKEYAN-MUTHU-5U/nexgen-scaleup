'use client';

import { HeroSection } from "@/components/marketing/hero-section";
import { ServicesGrid } from "@/components/marketing/services-grid";
import { CaseStudiesStrip } from "@/components/marketing/case-studies-strip";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { AcademySpotlight } from "@/components/marketing/academy-spotlight";
import { Testimonials } from "@/components/marketing/testimonials";
import { PortalsSection } from "@/components/marketing/portals-section";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useContactModal } from "@/contexts/contact-modal-context";

export default function Home() {
  const { openContactModal } = useContactModal();

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <HeroSection />
      <ServicesGrid />
      <CaseStudiesStrip />
      <ProcessTimeline />
      <AcademySpotlight />
      <Testimonials />
      <PortalsSection />

      {/* Final CTA */}
      <section className="py-32 bg-primary text-primary-foreground text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="relative z-10 container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
            Ready to scale your vision?
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-10">
            Join the forward-thinking companies automating their growth with NexGen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => openContactModal('New Project')}
              className="h-14 px-8 text-lg rounded-full w-full sm:w-auto"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => openContactModal('Sales Inquiry')}
              className="h-14 px-8 text-lg rounded-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
