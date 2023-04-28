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
  Popover,
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
        size={30}
        weight="bold"
        css={{ textGradient: "45deg, $primary -20%, $secondary 50%" }}
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
        <Button onClick={showSignInModal}>Sign In</Button>
        <Modal
          aria-labelledby="sign in"
          open={signInModalVisible}
          onClose={hideSignInModal}
          css={{ backgroundColor: "transparent", minWidth: "fit-content" }}
        >
          <Modal.Body>
            <SignIn />
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <Popover>
      <Popover.Trigger>
        <Avatar
          src={user?.profileImageUrl}
          text={user?.username ?? "👋"}
          pointer
          zoomed
          alt="User avatar"
        />
      </Popover.Trigger>
      <Popover.Content>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </Popover.Content>
    </Popover>
  );
}
