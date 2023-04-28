import { useUser } from "@clerk/nextjs";
import { Button, Container, Spacer, Textarea } from "@nextui-org/react";
import { useRef } from "react";
import { api } from "~/utils/api";
import Send from "./icons/Send";
import Toast from "./ui/Toast";

export default function PostWizard() {
  const { user } = useUser();

  const reactQueryCtx = api.useContext();
  const { mutate, isLoading, isError, error } = api.post.create.useMutation();

  // Get the error message
  let errorMessage = error?.message;
  if (error?.data?.zodError?.fieldErrors.post?.length) {
    errorMessage = error.data.zodError.fieldErrors.post[0];
  }

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const clearTextBox = () => {
    if (textAreaRef.current) {
      textAreaRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    const post = textAreaRef.current?.value;

    if (!post) {
      return;
    }

    mutate(
      {
        post,
      },
      {
        onSuccess: () => {
          void reactQueryCtx.post.getAll.invalidate();
          clearTextBox();
        },
        onError: () => {
          if (errorMessage) {
            Toast(errorMessage);
          }
        },
      }
    );
  };

  if (!user) {
    return null;
  }

  return (
    <Container
      fluid
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "$6",
      }}
    >
      <Spacer x={1} />
      <Textarea
        ref={textAreaRef}
        labelPlaceholder="Share your shower thoughts"
        maxRows={3}
        css={{
          flex: 1,
          resize: "none",
          width: "100%",
        }}
        disabled={isLoading}
        helperText={
          isError
            ? errorMessage
            : isLoading
            ? "Sharing with everyone..."
            : undefined
        }
        helperColor={isError ? "error" : undefined}
      />
      <Spacer x={1} />
      <Button icon={<Send />} auto color="gradient" onPress={handleSubmit}>
        Share your thought
      </Button>
    </Container>
  );
}
