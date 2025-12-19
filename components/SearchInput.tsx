"use client";

import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = () => {
  const pathName = usePathname();
  const router = useRouter();
//   const searchParams = useSearchParams();
//   const query = searchParams.get("topic") || "";

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const updateUrl = (value: string) => {
      if (value.trim() === "") {
        router.push(pathName);
      } else {
        router.push(`${pathName}?topic=${encodeURIComponent(value)}`);
      }
    };

    updateUrl(debouncedQuery);
  }, [debouncedQuery, router, pathName]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input
        placeholder="Search companions...."
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
