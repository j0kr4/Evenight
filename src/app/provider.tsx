"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { ReactNode } from "react";

const queryClient = new QueryClient();

type props = {
  children: ReactNode;
};

export default function Provider({ children }: props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
