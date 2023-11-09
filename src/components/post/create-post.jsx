import { createPostSchema } from "@/schemas/validation/post";
import { createPost } from "@/services/posts";
import { mappedErrors } from "@/utils/mapped-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Text, TextInput, Title } from "@tremor/react";
import { useState, useContext } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { AuthContext } from "../../context/auth";

export const CreatePost = () => {
  const [errors, setErrors] = useState({});

  const { state } = useContext(AuthContext);

  const [, setNavigate] = useLocation();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["post"],
    mutationFn: (postData) => createPost(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created");

      setNavigate("/posts");
    },
    onError: () => {
      toast.error("Error creating Post");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log({ data, state });

    const { success, errors } = mappedErrors(createPostSchema, data);
    if (!success) {
      setErrors(errors);
      return;
    }
    e.target.reset();
    setErrors({});
    mutate({ ...data, UserId: state.user.id });
  };
  return (
    <Card className="w-full max-w-xl m-auto">
      <Title>Create Task</Title>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-6">
          <label>
            <Text>Title:</Text>
            <TextInput
              className="w-full px-3"
              label="Title"
              name="title"
              placeholder="Insert Title"
              autoComplete="off"
              error={Boolean(errors.title)}
              errorMessage={errors.title}
            />
          </label>
          <label>
            <Text>Description:</Text>
            <TextInput
              className="w-full px-3"
              label="Description"
              name="description"
              placeholder="Insert Description"
              type="text"
              autoComplete="off"
              error={Boolean(errors.description)}
              errorMessage={errors.description}
            />
          </label>
        </div>
        <Button className="w-full px-3">Create</Button>
      </form>
    </Card>
  );
};
