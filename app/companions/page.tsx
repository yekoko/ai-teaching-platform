import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import CompanionInfiniteList from "@/components/CompanionInfiniteList";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  // const subject = params.subject ? params.subject : "";
  // const topic = params.topic ? params.topic : "";

  const subject = Array.isArray(params.subject)
    ? params.subject[0]
    : params.subject ?? "";

  const topic = Array.isArray(params.topic)
    ? params.topic[0]
    : params.topic ?? "";

  const companions = await getAllCompanions({
    subject,
    topic,
    page: 1,
    limit: 12,
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
      {/* <section className="companions-grid">
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
      </section> */}
      <CompanionInfiniteList
        key={`${subject}-${topic}`}
        initialCompanions={companions}
        subject={subject}
        topic={topic}
      />
    </main>
  );
};

export default CompanionsLibrary;
