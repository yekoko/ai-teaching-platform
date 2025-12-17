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
          topic="Neura the Brainy Explorer"
          duration={45}
          subject="science"
          color="#E5D0FF"
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
