import { Card, Grid, Text, Avatar, Container } from "@nextui-org/react";
import { type RouterOutputs } from "~/utils/api";
import ThumbsUp from "~/components/icons/ThumbsUp";
import ThumbsDown from "~/components/icons/ThumbsDown";
import { formatDate } from "~/utils/date";

type Posts = RouterOutputs["post"]["getAll"];
type Post = Posts[0];

export default function PostsRenderer({ posts }: { posts: Posts }) {
  return (
    <Grid.Container gap={3}>
      {posts.map((postData) => (
        <PostView key={postData.post.id} {...postData} />
      ))}
    </Grid.Container>
  );
}

function PostView({ post, author }: Post) {
  if (!author) return null;

  return (
    <Grid xs={12} sm={6}>
      <Card css={{ p: "$6", mw: "400px" }}>
        <Card.Header
          css={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <Avatar
            src={author.profilePicture}
            text={author.name}
            alt={author.name}
          />
          <Container>
            <Text h4 css={{ lineHeight: "$xs" }}>
              {author.name}
            </Text>
            <Text>{formatDate(post.createdAt)}</Text>
          </Container>
        </Card.Header>
        <Card.Body css={{ py: "$2" }}>
          <Text>{post.content}</Text>
        </Card.Body>
        <Card.Footer css={{ display: "flex", gap: "$6" }}>
          <ThumbsUp />
          <ThumbsDown />
        </Card.Footer>
      </Card>
    </Grid>
  );
}
