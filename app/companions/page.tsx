import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const subject = params.subject ? params.subject : "";
  const topic = params.topic ? params.topic : "";

  const companions = await getAllCompanions({
    subject,
    topic,
  });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companion-grid">
        {companions && companions.length > 0 ? (
          companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))
        ) : (
          <p>No companions found.</p>
        )}
      </section>
    </main>
  );
};

export default CompanionsLibrary;
