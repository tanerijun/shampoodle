import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button, Text } from "@nextui-org/react";
import { type NextPage } from "next";
import Head from "next/head";
import Navbar from "~/components/Navbar";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data: posts } = api.post.getAll.useQuery();

  console.log(posts); // DEBUG

  const { isLoaded, isSignedIn, user } = useUser();
  const noUserData = !isLoaded || !isSignedIn;

  return (
    <>
      <Head>
        <title>Shampoodle</title>
        <meta
          name="description"
          content="A platform to share your shower thoughts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Navbar />
      </header>

      <main>
        <h1 className="text-4xl font-bold text-white">
          Hello, {noUserData ? "Stranger" : user?.firstName}
        </h1>

        <div>
          {noUserData ? (
            <SignInButton mode="modal">
              <button className="bg-red-400 p-4">Sign In</button>
            </SignInButton>
          ) : (
            <SignOutButton>
              <button className="bg-red-400 p-4">Sign Out</button>
            </SignOutButton>
          )}
        </div>

        <div>
          {posts?.map((post) => (
            <div key={post.id}>{post.content}</div>
          ))}
        </div>

        <button className="btn-error btn">Error</button>
        <Button color="primary">Auto</Button>
        <Text h1>Next UI</Text>
      </main>
    </>
  );
};

export default Home;
