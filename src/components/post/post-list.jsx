import {
  Badge,
  Card,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";

import { UploadIcon, TrashIcon } from "@heroicons/react/outline";
import { getPosts } from "@/services/posts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../../services/posts";

export const PostList = () => {
  const [, setLocation] = useLocation();

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

  if (isError) toast.error("Error getting posts");

  const queryClient = useQueryClient();
  const [, setNavigate] = useLocation();

  const mutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: (postId) => deletePost(postId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted");
      setNavigate("/posts");
    },
    onError: () => {
      toast.error("Error deleting Post");
    },
  });

  const handleDeleteClick = (postId) => {
    {
      mutation.mutate(postId);
    }
  };

  return (
    <Card className="w-full max-w-xl m-auto">
      <Title>
        Tasks
        <Badge className="ml-2">{posts?.length}</Badge>
      </Title>

      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell className="text-center">Title</TableHeaderCell>
            <TableHeaderCell className="text-center">
              Description
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            !posts?.length && (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  No tasks
                </TableCell>
              </TableRow>
            )
          )}
          {posts?.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="text-center">{post.title}</TableCell>
              <TableCell className="text-center">{post.description}</TableCell>

              <TableCell className="text-center">
                <button
                  className="mr-1 hover:cursor-pointer hover:opacity-75"
                  onClick={() => setLocation(`/posts/${post.id}`)}
                >
                  <Icon
                    icon={UploadIcon}
                    color="blue"
                    title="Update"
                    tooltip={`Update ${post.title}`}
                  />
                </button>
                <button
                  className="hover:cursor-pointer hover:opacity-75"
                  onClick={() => handleDeleteClick(post.id)}
                >
                  <Icon
                    icon={TrashIcon}
                    color="red"
                    title="Delete"
                    tooltip={`Delete ${post.title}`}
                  />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
