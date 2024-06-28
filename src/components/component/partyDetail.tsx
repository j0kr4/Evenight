"use client";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CommentForm } from "./CommentForm";
import { LocateIcon, UserIcon } from "lucide-react";
import Loader from "./loader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export async function PartyDetail({ id, user }: { id: string; user: any }) {
  const fetchParty = async () => {
    const res = await axios.get(`http://localhost:3000/api/party/${id}`);
    return res.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["party"],
    queryFn: fetchParty,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className=" mx-auto p-4 sm:p-6 md:p-8">
      <header className="bg-background rounded-lg border p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="grid gap-2">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <div className="flex items-center gap-4">
            <div className="bg-muted rounded-full px-3 py-1 text-sm font-medium">
              {data.type}
            </div>
            <div className="text-muted-foreground">
              {new Date(data.date).toLocaleDateString()} -{" "}
              {new Date(data.time).toLocaleTimeString()}
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-full px-3 py-1 text-sm font-medium">
          {data.isPaid ? "Payant" : "Gratuit"}
        </div>
      </header>
      <section className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="grid gap-4">
          <div className="prose max-w-none">
            <h2>Description</h2>
            <p>{data.description}</p>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Places disponibles</div>
              <div className="font-medium">{data.availableSeats}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">Prix</div>
              <div className="font-medium">
                {data.price ? `${data.price}€` : "Gratuit"}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="prose max-w-none">
            <h2>Au programme</h2>
            <ul>
              {data?.boardGames?.map((game) => (
                <li key={game.id}>{game.name}</li>
              ))}
              {data?.videoGames?.map((game) => (
                <li key={game.id}>
                  {game.name} ({game.platform})
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <LocateIcon className="w-6 h-6 text-muted-foreground" />
              <div>
                <div className="font-medium">{data?.adress?.street}</div>
                <div className="text-muted-foreground">
                  {data?.adress?.city}, {data?.adress?.zipCode}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <UserIcon className="w-6 h-6 text-muted-foreground" />
              <div>
                <Link
                  href="#"
                  className="font-medium hover:underline"
                  prefetch={false}
                >
                  {data?.organizer?.name}
                </Link>
                <div className="text-muted-foreground">Organisateur</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">Commentaires</h2>
        {user && <CommentForm />}
        <div className="grid gap-6 mt-12  border-t py-12">
          {data?.comments?.map((comment) => (
            <div className="flex items-start gap-4" key={comment.id}>
              <Avatar className="border w-10 h-10">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>
                  {comment.userFrom.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {/* <div>{comment.userFrom.name}</div> */}
                  <div className="text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                    <p> {comment.userFrom.name}</p>
                  </div>
                </div>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
