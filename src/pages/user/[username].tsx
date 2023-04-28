import { Container, Loading, Text } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function UserPage() {
  const router = useRouter();
  const { username } = router.query;

  if (typeof username !== "string") {
    typeof window !== "undefined" && void router.push("/user/"); // 404
    return;
  }

  const { data: user, isLoading } = api.user.getByUsername.useQuery({
    username,
  });

  if (isLoading) {
    return (
      <Container
        fluid
        css={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loading size="lg">
          <Text>Finding shower thoughts from all over the world...</Text>
        </Loading>
      </Container>
    );
  }

  if (!user) {
    typeof window !== "undefined" && void router.push("/user/"); // 404
    return;
  }

  return (
    <>
      <Head>
        <title>{user.username} | Shampoodle</title>
      </Head>
      <main>
        <h1>{user.name}</h1>
      </main>
    </>
  );
}
