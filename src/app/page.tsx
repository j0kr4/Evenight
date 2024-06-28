"use client";
import ListParty from "@/components/component/listparty";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Hero } from "@/components/component/hero";
import { useRouter } from "next/navigation";
import FilterSearch from "@/components/component/filterSearch";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <Hero />
      <div className="flex items-center pt-8 justify-between">
        <FilterSearch />
        <div className="">
          <Button
            variant={"secondary"}
            className="gap-2"
            onClick={() => {
              router.push("/party/new");
            }}
          >
            <Plus width={16} />
            Create Party
          </Button>
        </div>
      </div>
      <div className="flex-col py-8 items-center flex">
        <ListParty />
      </div>
    </main>
  );
}
