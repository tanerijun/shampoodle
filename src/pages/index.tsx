import { type NextPage } from "next";
import { Loading, Text, Spacer } from "@nextui-org/react";
import { api } from "~/utils/api";
import { SignedIn } from "@clerk/nextjs";
import CreatePostWizard from "~/components/CreatePostWizard";
import PostsRenderer from "~/components/PostsRenderer";
import Divider from "~/components/ui/Divider";
import MainContentWrapper from "~/components/MainContentWrapper";

const Home: NextPage = () => {
  const { data: posts, isLoading } = api.post.getAll.useQuery();

  console.log(posts); // DEBUG

  if (isLoading) {
    return (
      <MainContentWrapper>
        <Loading size="lg">
          <Text>Finding shower thoughts from all over the world...</Text>
        </Loading>
      </MainContentWrapper>
    );
  }

  if (!posts) {
    return (
      <MainContentWrapper>
        <Text>
          There&apos;re no shower thoughts here. Maybe you can add one?
        </Text>
      </MainContentWrapper>
    );
  }

  return (
    <MainContentWrapper>
      <SignedIn>
        <Spacer y={2} />
        <CreatePostWizard />
        <Spacer y={2} />
        <Divider />
      </SignedIn>
      <Spacer y={1} />
      <PostsRenderer posts={posts} />
    </MainContentWrapper>
  );
};

export default Home;
