import type { AppRouter } from "~/server/api/root";
import type { inferRouterOutputs } from "@trpc/server";
import { Container } from "@nextui-org/react";

type Posts = inferRouterOutputs<AppRouter>["post"]["getAll"];

export default function PostsRenderer({ posts }: { posts: Posts }) {
  return (
    <Container fluid css={{ flex: 1 }}>
      {posts.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </Container>
  );
}
