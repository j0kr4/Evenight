import { CardParty } from "@/components/component/card-party";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { Hero } from "@/components/component/hero";
import AddEvent from "@/components/form/AddEvent";

export default function Home() {
  return (
    <main className="min-h-screen  ">
      <Hero />
      <div className="flex justify-end p-4">
        <AddEvent />
      </div>
      <div className="flex-col items-center flex">
        <CardParty />
      </div>
    </main>
  );
}
