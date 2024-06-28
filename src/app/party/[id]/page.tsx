import { PartyDetail } from "@/components/component/partyDetail";
import { auth } from "../../../../auth";

export default async function PartyPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  return (
    <main className="">
      <PartyDetail id={params.id} user={session} />
    </main>
  );
}
