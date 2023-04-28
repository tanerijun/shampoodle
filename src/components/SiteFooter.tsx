import { Container, Link, Text } from "@nextui-org/react";

export default function SiteFooter() {
  return (
    <footer>
      <Container
        css={{ display: "flex", justifyContent: "space-between", my: "$10" }}
      >
        <Text>
          © 2023 Shampoodle -{" "}
          <Link
            href="https://vitaneri.com"
            target="_blank"
            css={{ "&:hover": { color: "$secondary" } }}
          >
            Vitaneri
          </Link>
        </Text>
        <Link
          href="https://github.com/tanerijun/shampoodle"
          css={{ "&:hover": { color: "$secondary" } }}
          target="_blank"
        >
          View Source
        </Link>
      </Container>
    </footer>
  );
}
