import { Container } from "@nextui-org/react";

export default function MainContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      as="main"
      fluid
      css={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      {children}
    </Container>
  );
}
