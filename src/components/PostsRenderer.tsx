import { Card, Grid, Text, Avatar, Container } from "@nextui-org/react";
import { type RouterOutputs } from "~/utils/api";
import ThumbsUp from "~/components/icons/ThumbsUp";
import ThumbsDown from "~/components/icons/ThumbsDown";
import { formatDate } from "~/utils/date";
import Link from "next/link";

type Posts = RouterOutputs["post"]["getAll"];
type Post = Posts[0];

export default function PostsRenderer({ posts }: { posts: Posts }) {
  return (
    <Grid.Container>
      {posts.map((postData) => (
        <PostView key={postData.post.id} {...postData} />
      ))}
    </Grid.Container>
  );
}

function PostView({ post, author }: Post) {
  if (!author) return null;

  return (
    <Grid
      sm={6}
      css={{
        width: "100%",
        p: "$6",
      }}
    >
      <Card
        css={{
          p: "$6",
        }}
      >
        <Card.Header
          css={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link href={`/user/${author.username || ""}`}>
            <Avatar
              src={author.profilePicture}
              text={author.name}
              alt={author.name}
              size="lg"
              zoomed
              css={{ cursor: "pointer" }}
            />
          </Link>
          <Container>
            <Link href={`/user/${author.username || ""}`}>
              <Text
                h4
                css={{
                  lineHeight: "$xs",
                  "&:hover": { color: "$secondary" },
                  transition: "color 0.2s ease",
                  width: "fit-content",
                }}
              >
                {author.name}
              </Text>
            </Link>
            <Text size="$xs" css={{ lineHeight: "$xs", userSelect: "none" }}>
              {formatDate(post.createdAt)}
            </Text>
          </Container>
        </Card.Header>
        <Card.Body css={{ py: "$4" }}>
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
