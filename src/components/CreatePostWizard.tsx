import { useUser } from "@clerk/nextjs";
import { Avatar, Container, Spacer, Textarea } from "@nextui-org/react";

export default function PostWizard() {
  const { user } = useUser();

  if (!user) {
    return <div>Not logged in</div>;
  }

  return (
    <Container
      css={{
        display: "flex",
      }}
    >
      <Avatar
        src={user.profileImageUrl}
        alt={user.username ?? undefined}
        size="xl"
      />
      <Spacer x={1} />
      <Textarea
        labelPlaceholder="Share your shower thoughts"
        maxRows={3}
        css={{
          flex: 1,
          resize: "none",
        }}
      />
    </Container>
  );
}
