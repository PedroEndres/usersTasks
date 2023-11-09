import { Loader } from "@/components/loader";
import { updatePostSchema } from "@/schemas/validation/post";
import { getPost, updatePost } from "@/services/posts";
import { mappedErrors } from "@/utils/mapped-errors";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Text, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation, useParams } from "wouter";

export const UpdatePost = () => {
  const { id } = useParams();
  const [, setNavigate] = useLocation();

  const [errors, setErrors] = useState({});

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["updatePost", id],
    mutationFn: (postData) => updatePost(id, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated");
      setTimeout(() => {
        setNavigate("/posts");
      }, 1000);
    },
    onError: () => {
      toast.error("Error updating post");
    },
  });

  if (isError) toast.error("Error getting posts");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { success, errors } = mappedErrors(updatePostSchema, data);
    if (!success) {
      setErrors(errors);
      return;
    }
    e.target.reset();
    setErrors({});
    mutate(data);
  };
  return (
    <>
      {isLoading || isPending ? (
        <Loader />
      ) : (
        <Card className="w-full max-w-xl m-auto mt-10">
          <Title>Update post</Title>
          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-6">
              <label>
                <Text>Title:</Text>
                <TextInput
                  className="w-full px-3"
                  label="title"
                  name="title"
                  placeholder="Task"
                  autoComplete="off"
                  defaultValue={data?.title}
                  error={Boolean(errors.title)}
                  errorMessage={errors.title}
                />
              </label>
              <label>
                <Text>Description:</Text>
                <TextInput
                  className="w-full px-3"
                  label="description"
                  name="description"
                  placeholder="description"
                  autoComplete="off"
                  defaultValue={data?.description}
                  error={Boolean(errors.description)}
                  errorMessage={errors.description}
                />
              </label>
            </div>
            <Button className="w-full px-3">Update</Button>
            <Button
              onClick={() => setNavigate("/posts")}
              icon={ArrowLeftIcon}
              type="button"
              variant="secondary"
              className="w-full px-3 mt-5"
            >
              Volver
            </Button>
          </form>
        </Card>
      )}
    </>
  );
};
