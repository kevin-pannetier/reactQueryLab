import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../types/Post";

const POSTS_PER_PAGE = 20;

const fetchPosts = async (
  page: number
): Promise<{ data: Post[]; total: number }> => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`,
    {
      params: { _page: page, _limit: POSTS_PER_PAGE },
    }
  );

  const total = parseInt(response.headers["x-total-count"], 10); // Extract total count from headers

  return {
    data: response.data,
    total,
  };
};

export const useGetPosts = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
  });

  const totalPosts = data?.total || 0;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Function to go to the next page
  const handleNextPage = () =>
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));

  // Function to go to the previous page
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1));

  // Function to set a specific page
  const handleSetPage = (pageNumber: number) =>
    setPage(() => Math.min(Math.max(1, pageNumber), totalPages));

  return {
    posts: data?.data || [],
    isLoading,
    error,
    page,
    totalPages,
    handleNextPage,
    handlePreviousPage,
    handleSetPage, // Now included
    hasMore: page < totalPages,
  };
};
