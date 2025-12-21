"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SubjectFilter = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const currentSubject = searchParams.get("subject") || "";
  const [subject, setSubject] = useState(currentSubject);

  useEffect(() => {
    if (
      (subject === "all" && !searchParams.has("subject")) ||
      subject === currentSubject
    ) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    if (subject === "all" || subject === "") {
      params.delete("subject");
    } else {
      params.set("subject", subject);
    }
    const queryString = params.toString();
    const url = queryString ? `${pathName}?${queryString}` : pathName;

    router.push(url, { scroll: false });
  }, [subject, router, pathName, searchParams, currentSubject]);

  return (
    <div>
      <Select onValueChange={setSubject} value={subject}>
        <SelectTrigger className="input capitalize">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All subjects</SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject} className="capitalize">
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectFilter;
