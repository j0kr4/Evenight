"use client";
import { CardParty } from "@/components/component/card-party";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Hero } from "@/components/component/hero";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <Hero />
      <div className="flex justify-end p-4">
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
      <div className="flex-col py-8 items-center flex">
        <CardParty />
      </div>
    </main>
  );
}
