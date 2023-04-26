import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Container, Spacer, Textarea } from "@nextui-org/react";
import { useRef } from "react";
import { api } from "~/utils/api";
import Send from "./icons/Send";

export default function PostWizard() {
  const { user } = useUser();

  const { mutate } = api.post.create.useMutation();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const post = textAreaRef.current?.value;

    if (!post) {
      return;
    }

    mutate({
      post,
    });

    textAreaRef.current.value = "";
  };

  if (!user) {
    return null;
  }

  return (
    <Container
      css={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Avatar
        src={user.profileImageUrl}
        alt={user.username ?? undefined}
        size="xl"
      />
      <Spacer x={1} />
      <Textarea
        ref={textAreaRef}
        labelPlaceholder="Share your shower thoughts"
        maxRows={3}
        css={{
          flex: 1,
          resize: "none",
        }}
      />
      <Spacer x={1} />
      <Button icon={<Send />} auto onPress={handleSubmit} />
    </Container>
  );
}
