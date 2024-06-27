"use client";
import React from "react";
import CardParty from "./cardparty";
import { Party } from "@prisma/client";
import Loader from "./loader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ListParty = () => {
  const { isLoading, data } = useQuery<Party[]>({
    queryKey: ["party"],
    queryFn: async () => await axios.get("api/party"),
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data &&
          data?.data.map((data: Party) => (
            <CardParty party={data} key={data.id} />
          ))}
      </div>
    </div>
  );
};
export default ListParty;
