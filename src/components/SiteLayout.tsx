import Head from "next/head";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { Container } from "@nextui-org/react";

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

      <Container sm>
        <SiteHeader />
        {children}
        <SiteFooter />
      </Container>
    </>
  );
}
