import { type NextPage } from "next";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: posts } = api.post.getAll.useQuery();

  console.log(posts); // DEBUG

  const { isLoaded, isSignedIn, user } = useUser();
  const noUserData = !isLoaded || !isSignedIn;

  return (
    <>
      <main>
        <h1>Hello, {noUserData ? "Stranger" : user?.firstName}</h1>

        <div>
          {noUserData ? (
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          ) : (
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          )}
        </div>

        <div>
          {posts?.map((post) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
