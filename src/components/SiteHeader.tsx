import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Sun from "~/components/icons/Sun";
import Moon from "~/components/icons/Moon";
import { Avatar, Button, Navbar, Text } from "@nextui-org/react";

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

  return (
    <Avatar src={user?.profileImageUrl} text={user?.username ?? undefined} />
  );
}
