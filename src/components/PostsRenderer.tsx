import { Container } from "@nextui-org/react";
import { type RouterOutputs } from "~/utils/api";

type Posts = RouterOutputs["post"]["getAll"];

export default function PostsRenderer({ posts }: { posts: Posts }) {
  return (
    <Container fluid css={{ flex: 1 }}>
      {posts.map(({ post, author }) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </Container>
  );
}
