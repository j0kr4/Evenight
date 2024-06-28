
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Party, User, Comment, Adress } from "@prisma/client"
import { auth } from "../../../auth"
import { Comment } from "postcss"
import { CommentForm } from "./CommentForm"

export  function PartyDetail({ party }: { party: Party & { organizer: User, comments: Comment[], adress: Adress } }) {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <header className="bg-background rounded-lg border p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="grid gap-2">
          <h1 className="text-2xl font-bold">{party.name}</h1>
          <div className="flex items-center gap-4">
            <div className="bg-muted rounded-full px-3 py-1 text-sm font-medium">{party.type}</div>
            <div className="text-muted-foreground">{new Date(party.date).toLocaleDateString()} - {new Date(party.time).toLocaleTimeString()}</div>
          </div>
        </div>
        <div className="bg-muted rounded-full px-3 py-1 text-sm font-medium">{party.isPaid ? 'Payant' : 'Gratuit'}</div>
      </header>
      <section className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="grid gap-4">
          <div className="prose max-w-none">
            <h2>Description</h2>
            <p>{party.description}</p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Places disponibles</div>
              <div className="font-medium">{party.availableSeats}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Prix</div>
              <div className="font-medium">{party.price ? `${party.price}€` : 'Gratuit'}</div>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="prose max-w-none">
            <h2>Au programme</h2>
            <ul>
              {party?.boardGames?.map(game => (
                <li key={game.id}>{game.name}</li>
              ))}
              {party?.videoGames?.map(game => (
                <li key={game.id}>{game.name} ({game.platform})</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <LocateIcon className="w-6 h-6 text-muted-foreground" />
              <div>
                <div className="font-medium">{party?.adress?.street}</div>
                <div className="text-muted-foreground">{party?.adress?.city}, {party?.adress?.zipCode}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <UserIcon className="w-6 h-6 text-muted-foreground" />
              <div>
                <Link href="#" className="font-medium hover:underline" prefetch={false}>
                  {party?.organizer?.name}
                </Link>
                <div className="text-muted-foreground">Organisateur</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">Commentaires</h2>
        <div className="grid gap-6">
          {party?.comments?.map(comment => (
            <div className="flex items-start gap-4" key={comment.id}>
              <Avatar className="border w-10 h-10">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{comment.userFrom.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <div>{comment.userFrom.name}</div>
                  <div className="text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</div>
                </div>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
          <CommentForm />
        </div>
      </section>
    </div>
  )
}

function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
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
  )
}
