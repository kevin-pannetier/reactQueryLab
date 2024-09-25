import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../types/Post";

const createPost = async (newPost: {
  title: string;
  body: string;
}): Promise<Post> => {
  const { data } = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    newPost
  );
  return data;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle(""); // Clear form inputs after successful submission
      setBody("");
    },
  });

  return {
    title,
    setTitle,
    body,
    setBody,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    handleSubmit: () => mutation.mutate({ title, body }),
  };
};
