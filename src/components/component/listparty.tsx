"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardParty from "./cardparty";
import { Party } from "@prisma/client";
import Loader from "./loader";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ListParty = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  

  useEffect(() => {
    // Ensure the router is ready before attempting to read URL parameters
    if (router) {
      const searchParams = new URLSearchParams(location.search);
      const page = parseInt(searchParams.get("page") || "1", 10);
      setCurrentPage(page);
    }
  }, [router]);

  const { isLoading, data } = useQuery<Party[]>({
    queryKey: ["party"],
    queryFn: async () => await axios.get("api/party"),
  });

  if (isLoading) {
    return <Loader />;
  }

  const itemsPerPage = 3;
  const totalItems = data?.data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let startPage = Math.max(currentPage - 2, 0);
  let endPage = Math.min(startPage + 3, totalPages);
  if (currentPage === totalPages) {
    startPage = Math.max(totalPages - 2, 1);
    endPage = totalPages;
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.data.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (event: React.MouseEvent, pageNumber: number) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
    router.push(`/?page=${pageNumber}`); // Added to update the URL with the current page
  };
  const handleNext = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      router.push(`/?page=${nextPage}`); // Added to update the URL with the next page
    }
  };
  const handlePrevious = (event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      router.push(`/?page=${prevPage}`); // Added to update the URL with the previous page
    }
  };

  return (
    <div>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((data: Party) => (
            <CardParty party={data} key={data.id} />
          ))}
      </div>
      <Pagination className="mb-3 mt-3">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePrevious} />
          </PaginationItem>
          {startPage > 0 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(event) => handleClick(event, 1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}
          {startPage > 1 && <PaginationEllipsis />}

          {Array.from(
            { length: endPage - startPage },
            (_, i) => startPage + i,
          ).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(event) => handleClick(event, page + 1)}
                className={
                  page + 1 === currentPage ? "bg-blue-500 text-white" : ""
                }
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {endPage < totalPages - 1 && <PaginationEllipsis />}
          {endPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(event) => handleClick(event, totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext href="#" onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default ListParty;
