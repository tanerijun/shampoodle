import { Loading, Text } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import MainContentWrapper from "~/components/MainContentWrapper";
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
      <MainContentWrapper>
        <Loading size="lg">
          <Text>Finding user...</Text>
        </Loading>
      </MainContentWrapper>
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
      <MainContentWrapper>
        <h1>{user.name}</h1>
      </MainContentWrapper>
    </>
  );
}
