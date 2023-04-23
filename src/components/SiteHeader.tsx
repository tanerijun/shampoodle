import { useEffect, useState } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Sun from "~/components/icons/Sun";
import Moon from "~/components/icons/Moon";
import { Avatar, Button, Navbar, Popover, Text } from "@nextui-org/react";

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
    <Text
      h1
      size={30}
      weight="bold"
      css={{ textGradient: "45deg, $primary -20%, $secondary 50%" }}
    >
      Shampoodle
    </Text>
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

  if (!user) {
    return (
      <SignInButton>
        <Button>Sign In</Button>
      </SignInButton>
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
