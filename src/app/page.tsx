import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { VerificationSection } from "@/components/verification-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <VerificationSection />
        <HowItWorksSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  )
}
