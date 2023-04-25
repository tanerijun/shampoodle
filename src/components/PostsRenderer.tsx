import { Container, Card, Grid, Text, Avatar } from "@nextui-org/react";
import { type RouterOutputs } from "~/utils/api";
import ThumbsUp from "~/components/icons/ThumbsUp";
import ThumbsDown from "~/components/icons/ThumbsDown";

type Posts = RouterOutputs["post"]["getAll"];
type Post = Posts[0];

export default function PostsRenderer({ posts }: { posts: Posts }) {
  return (
    <Container fluid css={{ flex: 1 }}>
      {posts.map((postData) => (
        <PostView key={postData.post.id} {...postData} />
      ))}
    </Container>
  );
}

function PostView({ post, author }: Post) {
  const name =
    author?.firstName + (author?.lastName ? " " + author.lastName : "") ||
    author?.username ||
    "A kind stranger";

  return (
    <Card css={{ p: "$6", mw: "400px" }}>
      <Card.Header
        css={{
          display: "flex",
          gap: "$6",
          alignItems: "end",
        }}
      >
        <Avatar src={author?.profilePicture} text={name} alt={name} />
        <Text h4 css={{ lineHeight: "$xs" }}>
          {name}
        </Text>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>{post.content}</Text>
      </Card.Body>
      <Card.Footer css={{ display: "flex", gap: "$6" }}>
        <ThumbsUp />
        <ThumbsDown />
      </Card.Footer>
    </Card>
  );
}
