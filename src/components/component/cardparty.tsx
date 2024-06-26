"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Party, PartyType } from "@prisma/client";
import {
  Calendar,
  CircuitBoard,
  GamepadIcon,
  MapPin,
  MessageCircle,
  Mouse,
  PartyPopper,
  Ticket,
  User,
  User2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import cover from "@/../public/coverEvent.jpg";
import Date from "@/components/date";

export function CardParty({ Party }: { Party: Party }) {
  return (
    <Card key={Party.id} className="group w-full max-w-md p-2 ">
      <Link href={`/party/${Party.id}`} key={Party.id} className="z-0">
        <Image
          width={450}
          height={200}
          src={cover}
          alt="Party"
          className="rounded-md"
        />
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl group-hover:underline font-bold">
              {Party.name}
            </CardTitle>
            <div className="flex flex-col items-end gap-2">
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-sm font-medium"
              >
                {Party.isPaid ? "Payant" : "Gratuit"}
              </Badge>
              <Badge
                variant="secondary"
                className="rounded-full px-3 gap-2 py-1 text-sm font-medium"
              >
                {Party.type == PartyType["LAN"] ? (
                  <GamepadIcon className="h-5 w-5" />
                ) : Party.type == PartyType["BOARD_GAME"] ? (
                  <CircuitBoard className="h-5 w-5" />
                ) : (
                  <PartyPopper className="h-5 w-5" />
                )}
                {Party.type}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5" />
            <span>{Party?.adress?.city}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span>
              <Date dateString={Party.date} />
            </span>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User2 className="h-5 w-5" />
              <span>{Party.availableSeats} places disponibles</span>
            </div>
            {Party.isPaid ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Ticket className="h-5 w-5" />
                <span> {Party.price} € </span>
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-5 w-5" />
            <span>Organiser par {Party?.organizer?.name} </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
            {Party?.comments?.length} Comments
          </div>

          <Collapsible className="z-10">
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
                      {
                        "Excited for this game night! Can't wait to play some Catan."
                      }
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
                      {"I'll bring some snacks and drinks to share!"}
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
      </Link>
    </Card>
  );
}
export default CardParty;
