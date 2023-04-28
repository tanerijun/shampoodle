import { Loading, Text } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import MainContentWrapper from "~/components/MainContentWrapper";
import PostsRenderer from "~/components/PostsRenderer";
import { api } from "~/utils/api";

export default function UserPage() {
  const router = useRouter();
  const { username } = router.query;

  if (typeof username !== "string") {
    return null;
  }

  const { data: userInfo, isLoading: isLoadingUserInfo } =
    api.user.getByUsername.useQuery({
      username,
    });

  const { data: userPosts, isLoading: isLoadingUserPosts } =
    api.post.getByUser.useQuery(
      {
        userId: userInfo?.id as string,
      },
      {
        enabled: !!userInfo?.id,
      }
    );

  const postData = userPosts?.map((userPost) => ({
    post: userPost,
    author: userInfo,
  }));

  if (isLoadingUserInfo) {
    return (
      <MainContentWrapper>
        <Loading size="lg">
          <Text>Finding user...</Text>
        </Loading>
      </MainContentWrapper>
    );
  }

  if (!userInfo) {
    typeof window !== "undefined" && void router.push("/user/"); // 404
    return;
  }

  if (isLoadingUserPosts) {
    return (
      <MainContentWrapper>
        <Loading size="lg">
          <Text>Finding all posts by {userInfo.name}...</Text>
        </Loading>
      </MainContentWrapper>
    );
  }

  return (
    <>
      <Head>
        <title>{userInfo.username} | Shampoodle</title>
      </Head>
      <MainContentWrapper>
        <Text h2>Shower thoughts by {userInfo.name}</Text>
        {postData && <PostsRenderer posts={postData} />}
      </MainContentWrapper>
    </>
  );
}
