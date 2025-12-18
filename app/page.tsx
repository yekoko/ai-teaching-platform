import CompanionCard from "@/components/CompanionCard";
import CompanionList from "@/components/CompanionList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";

export default function Home() {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="23423"
          name="Neura the Brainy Explorer"
          topic="Neural Network of the Brain"
          duration={45}
          subject="science"
          color="#E5D0FF"
        />
        <CompanionCard
          id="234"
          name="Countsy the Number Wizard"
          topic="Derivatives & Integrals"
          duration={40}
          subject="maths"
          color="#FFDA6E"
        />
        <CompanionCard
          id="223"
          name="Verba the Vocabulary Builder"
          topic="English Literature"
          duration={50}
          subject="language"
          color="#BDE7FF"
        />
      </section>
      <section className="home-section">
        <CompanionList
          title="Reccent completed sessions"
          classNames="w-2/3 max-lg:w-full"
          companions={recentSessions}
        />
        <CTA />
      </section>
    </main>
  );
}
