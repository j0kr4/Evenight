/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/R5B4tLjOVoF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import axios from "axios";
import { Party } from "@prisma/client";

export async function CardParty() {
  const parties = await axios
    .get("http://localhost:3000/api/party")
    .then((response) => {
      return response.data;
    });

  return (
    <>
      {parties.map((party: Party) => (
        <Card key={party.id} className="w-full max-w-md m-4">
          <CardHeader className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">{party.name}</CardTitle>
              <Badge
                variant="outline"
                className="rounded-full px-3 py-1 text-sm font-medium"
              >
                {party.isPaid ? "Payant" : "Gratuit"}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPinIcon className="h-5 w-5" />
              <span>{party.city}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="h-5 w-5" />
              <span>{party.date}</span>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <UsersIcon className="h-5 w-5" />
                <span>20 available seats</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <TicketIcon className="h-5 w-5" />
                <span>Free event</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <UserIcon className="h-5 w-5" />
              <span>Hosted by Jane Doe</span>
            </div>
            <Collapsible>
              <CollapsibleTrigger className="font-semibold flex items-center gap-1 [&[data-state=open]>svg]:-rotate-90">
                <GamepadIcon className="h-5 w-5" />
                Games
                <ChevronRightIcon className="h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Dice1Icon className="h-5 w-5" />
                    <span>Catan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GamepadIcon className="h-5 w-5" />
                    <span>Super Smash Bros.</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible>
              <CollapsibleTrigger className="font-semibold flex items-center gap-1 [&[data-state=open]>svg]:-rotate-90">
                <UsersIcon className="h-5 w-5" />
                Attendees
                <ChevronRightIcon className="h-5 w-5 transition-all" />
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
            <Collapsible>
              <CollapsibleTrigger className="font-semibold flex items-center gap-1 [&[data-state=open]>svg]:-rotate-90">
                <MessageCircleIcon className="h-5 w-5" />
                Comments
                <ChevronRightIcon className="h-5 w-5 transition-all" />
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
              <MouseIcon className="h-5 w-5" />
              <span>Attendees can bring snacks and drinks</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function Dice1Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <path d="M12 12h.01" />
    </svg>
  );
}

function GamepadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="2" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MouseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="7" />
      <path d="M12 6v4" />
    </svg>
  );
}

function TicketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}