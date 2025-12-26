"use client";

import { useState, useRef, useTransition, useEffect, useCallback } from "react";
import CompanionCard from "./CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import { getAllCompanions } from "@/lib/actions/companion.actions";

interface CompanionInfiniteListProps {
  initialCompanions: Companion;
  subject: string;
  topic: string;
}

const CompanionInfiniteList = ({
  initialCompanions,
  subject,
  topic,
}: CompanionInfiniteListProps) => {
  const [companions, setCompanions] = useState<Companion[]>(initialCompanions);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(initialCompanions.length === 12);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  const loadMore = useCallback(() => {
    startTransition(async () => {
      try {
        const newCompanions = await getAllCompanions({
          subject,
          topic,
          page,
          limit: 12,
        });
        if (newCompanions.length > 0) {
          setCompanions((prev) => [...prev, ...newCompanions]);
          setPage((prev) => prev + 1);
          setHasMore(newCompanions.length === 12);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log("Error loading more companions", error);
        setHasMore(false);
      }
    });
  }, [subject, topic, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isPending) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer.disconnect();
  }, [hasMore, isPending, loadMore]);

  return (
    <>
      <section className="companions-grid">
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
      {isPending && (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      )}

      {hasMore && <div ref={observerTarget} className="h-10" />}

      {!hasMore && companions.length > 0 && (
        <p className="text-center py-8 text-muted-foreground">
          No more companions to load.
        </p>
      )}
    </>
  );
};

export default CompanionInfiniteList;
