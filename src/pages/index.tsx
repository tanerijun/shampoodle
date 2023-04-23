import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";
import { Container } from "@nextui-org/react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: posts } = api.post.getAll.useQuery();

  console.log(posts); // DEBUG

  const { isLoaded, isSignedIn, user } = useUser();
  const noUserData = !isLoaded || !isSignedIn;

  return (
    <>
      <Container fluid as="main">
        <h1>Hello, {noUserData ? "Stranger" : user?.firstName}</h1>
        <div>
          {posts?.map((post) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
