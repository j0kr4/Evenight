import { Party } from "@prisma/client";

export default function PartyDetail({ data}: { data: Party}) {
  
  return (
    <div>
      <h1>{data.name}</h1>
    </div>
  );
}
