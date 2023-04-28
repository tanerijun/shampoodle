import { useEffect, useState } from "react";
import { SignIn, SignOutButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Sun from "~/components/icons/Sun";
import Moon from "~/components/icons/Moon";
import {
  Avatar,
  Button,
  Modal,
  Navbar,
  Dropdown,
  Text,
} from "@nextui-org/react";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header>
      <Navbar>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>

        <Navbar.Content>
          <ThemeSwitcher />
          <UserInfo />
        </Navbar.Content>
      </Navbar>
    </header>
  );
}

function Logo() {
  return (
    <Link href="/">
      <Text
        h1
        weight="bold"
        css={{
          textGradient: "45deg, $secondary 0%, $primary 90%",
          fontSize: "$3xl",
          "@sm": {
            fontSize: "$4xl",
          },
        }}
      >
        Shampoodle
      </Text>
    </Link>
  );
}

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      auto
      icon={!mounted ? <Sun /> : theme === "dark" ? <Moon /> : <Sun />}
      onClick={toggleTheme}
      color="gradient"
    />
  );
}

function UserInfo() {
  const { user } = useUser();
  const [signInModalVisible, setSignInModalVisible] = useState(false);

  const showSignInModal = () => {
    setSignInModalVisible(true);
  };

  const hideSignInModal = () => {
    setSignInModalVisible(false);
  };

  if (!user) {
    return (
      <>
        <Button color="gradient" auto onClick={showSignInModal}>
          Sign In
        </Button>
        <Modal
          aria-labelledby="sign in"
          open={signInModalVisible}
          onClose={hideSignInModal}
          css={{
            backgroundColor: "transparent",
            minWidth: "fit-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          }}
        >
          <Modal.Body>
            <SignIn />
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Avatar
          src={user?.profileImageUrl}
          text={user?.username ?? "👋"}
          pointer
          zoomed
          alt="User avatar"
        />
      </Dropdown.Trigger>
      <Dropdown.Menu
        aria-label="user actions"
        color="secondary"
        disabledKeys={["signed-in-as"]}
      >
        <Dropdown.Item key="signed-in-as">
          <Text>Signed in as: {user.username}</Text>
        </Dropdown.Item>
        <Dropdown.Item key="all-posts" withDivider>
          <Link href={`/user/${user.username ?? ""}`}>
            <Text>All Posts</Text>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item key="sign-out">
          <SignOutButton>
            <Text>Sign Out</Text>
          </SignOutButton>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
