import Head from "next/head";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { Container } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

      <Toaster position="bottom-center" />

      <Container
        sm
        css={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          border: "1px solid red",
        }}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </Container>
    </>
  );
}
