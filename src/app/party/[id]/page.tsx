"use client";
import { PartyDetail } from "@/components/component/PartyDetail";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "lucide-react";

export default function PartyPage({ params }: { params: { id: string } }) {
  console.log(params.id);
  const fetchParty = async () => {
    const res = await axios.get(`http://localhost:3000/api/party/${params.id}`);
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PartyDetail party={data} />
    </main>
  );
}
