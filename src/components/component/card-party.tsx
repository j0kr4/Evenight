"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Party } from "@prisma/client";
import {
  Calendar,
  ChevronRight,
  ChevronRightIcon,
  Dice1Icon,
  Gamepad,
  GamepadIcon,
  MapPin,
  MessageCircle,
  Mouse,
  Ticket,
  User,
  User2,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import Loader from "./loader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import cover from "@/../public/coverEvent.jpg";

export function CardParty() {
  const fetchParty = async () => {
    const res = await axios.get("api/party");
    const result = res.data;
    return result;
  };
  const { isLoading, data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchParty,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data.map((party: Party) => (
        <Card key={party.id} className="w-full max-w-md m-4">
          <Link href={`/party/${party.id}`} key={party.id} className="z-0">
            <Image width={450} height={200} src={cover} alt="Party" />
            <CardHeader className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  {party.name}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="rounded-full px-3 py-1 text-sm font-medium"
                >
                  {party.isPaid ? "Payant" : "Gratuit"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>{party.date.toString()}</span>
              </div>
            </CardHeader>
          </Link>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User2 className="h-5 w-5" />
                <span>{party.availableSeats} places disponibles</span>
              </div>
              {party.isPaid ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Ticket className="h-5 w-5" />
                  <span> {party.price} € </span>
                </div>
              ) : null}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-5 w-5" />
              <span>Organiser par {party.organizer.name} </span>
            </div>
            <Collapsible className="z-50">
              <CollapsibleTrigger className="font-semibold flex items-center gap-1 [&[data-state=open]>svg]:-rotate-90">
                <GamepadIcon className="h-5 w-5" />
                {party.type}
                <ChevronRightIcon className="h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Dice1Icon className="h-5 w-5" />
                    <span>Catan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gamepad className="h-5 w-5" />
                    <span>Super Smash Bros.</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="z-10">
              <CollapsibleTrigger className="font-semibold flex items-center gap-1 [&[data-state=open]>svg]:-rotate-90">
                <User2Icon className="h-5 w-5" />
                Attendees
                <ChevronRight className="h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span>John Doe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JA</AvatarFallback>
                    </Avatar>
                    <span>Jane Appleseed</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="z-10">
              <CollapsibleTrigger className="font-semibold flex items-center gap-1 [&[data-state=open]>svg]:-rotate-90">
                <MessageCircle className="h-5 w-5" />
                Comments
                <ChevronRight className="h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid gap-4">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">John Doe</div>
                      <div className="text-muted-foreground">
                        Excited for this game night! Can't wait to play some
                        Catan.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JA</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">Jane Appleseed</div>
                      <div className="text-muted-foreground">
                        I'll bring some snacks and drinks to share!
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mouse className="h-5 w-5" />
              <span>Attendees can bring snacks and drinks</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
export default CardParty;
